// ============================================================
// lib/security.ts  — Sri Lankan TripTip
//
// Shared security utilities used by ALL API routes.
// Covers:
//   1. Input sanitisation  — strip HTML / dangerous chars
//   2. Field length limits — hard caps per field type
//   3. Rate limiting       — per-IP with sliding window
//   4. Origin validation   — reject requests from unknown origins
//   5. Payload size guard  — reject oversized bodies
// ============================================================

import { NextRequest } from 'next/server';

// ── 1. SANITISATION ───────────────────────────────────────────

/**
 * Strip HTML tags, null bytes, and control characters from a string.
 * Does NOT strip safe punctuation needed for travel notes.
 */
export function sanitiseString(input: unknown, maxLength = 500): string {
  if (input === null || input === undefined) return '';
  const raw = String(input);

  return raw
    // Remove null bytes
    .replace(/\0/g, '')
    // Strip HTML tags entirely
    .replace(/<[^>]*>/g, '')
    // Strip script/event handler patterns (belt and suspenders)
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Strip control characters except newline (\n) and tab (\t)
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Trim whitespace
    .trim()
    // Enforce max length AFTER cleaning
    .slice(0, maxLength);
}

/**
 * Sanitise and validate an email address.
 * Returns cleaned email string or null if invalid.
 */
export function sanitiseEmail(input: unknown): string | null {
  const cleaned = sanitiseString(input, 254);
  // RFC 5321 practical regex — not exhaustive but catches 99.9% of bad input
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleaned)) return null;
  return cleaned.toLowerCase();
}

/**
 * Sanitise a phone number — keep digits, spaces, +, -, (, )
 */
export function sanitisePhone(input: unknown): string {
  const cleaned = sanitiseString(input, 30);
  // Allow only characters valid in international phone numbers
  return cleaned.replace(/[^0-9+\-\s().]/g, '').trim();
}

/**
 * Sanitise a date string — only allow YYYY-MM-DD format
 */
export function sanitiseDate(input: unknown): string | null {
  const cleaned = sanitiseString(input, 10);
  // Strict ISO date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return null;
  // Basic range sanity check
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) return null;
  // Must be a future date (within 5 years)
  const now   = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);
  if (d < now || d > maxDate) return null;
  return cleaned;
}

/**
 * Sanitise an integer — returns default if invalid or out of range.
 */
export function sanitiseInt(
  input:    unknown,
  min:      number,
  max:      number,
  fallback: number
): number {
  const n = Number(input);
  if (!Number.isInteger(n) || isNaN(n)) return fallback;
  if (n < min || n > max) return fallback;
  return n;
}

// ── Field length constants ─────────────────────────────────────
export const FIELD_LIMITS = {
  SALUTATION:       10,
  NAME:             80,
  EMAIL:            254,
  PHONE:            30,
  SHORT_TEXT:       200,   // pickup, destination, accommodation
  MEDIUM_TEXT:      500,   // activities, day notes
  LONG_TEXT:        2000,  // additional notes
  MAX_DAYS:         30,
} as const;

// ── 2. DAY PLAN SANITISATION ──────────────────────────────────

export interface DayPlanInput {
  day:           unknown;
  destination:   unknown;
  activities:    unknown;
  accommodation: unknown;
  notes:         unknown;
}

export interface SanitisedDayPlan {
  day:           number;
  destination:   string;
  activities:    string;
  accommodation: string;
  notes:         string;
}

export function sanitiseDayPlans(rawDays: unknown): SanitisedDayPlan[] {
  if (!Array.isArray(rawDays)) return [];

  // Hard cap: never process more than MAX_DAYS
  const capped = rawDays.slice(0, FIELD_LIMITS.MAX_DAYS);

  return capped
    .map((d, idx) => {
      if (typeof d !== 'object' || d === null) return null;
      const raw = d as DayPlanInput;
      return {
        day:           sanitiseInt(raw.day, 1, FIELD_LIMITS.MAX_DAYS, idx + 1),
        destination:   sanitiseString(raw.destination,   FIELD_LIMITS.SHORT_TEXT),
        activities:    sanitiseString(raw.activities,    FIELD_LIMITS.MEDIUM_TEXT),
        accommodation: sanitiseString(raw.accommodation, FIELD_LIMITS.SHORT_TEXT),
        notes:         sanitiseString(raw.notes,         FIELD_LIMITS.MEDIUM_TEXT),
      };
    })
    .filter((d): d is SanitisedDayPlan => d !== null);
}

// ── 3. RATE LIMITING ──────────────────────────────────────────

interface RateLimitEntry {
  count:     number;
  resetTime: number;
}

// In-memory store — resets on each cold start (fine for Vercel serverless).
// For persistent rate limiting across instances, use Redis/Upstash.
const rateLimitStore = new Map<string, RateLimitEntry>();

// Purge old entries periodically (prevents unbounded memory growth)
function purgeExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) rateLimitStore.delete(key);
  }
}

/**
 * Check rate limit for an IP.
 * Default: 5 submissions per 15 minutes per IP.
 * Returns { allowed: boolean, remaining: number, resetIn: number }
 */
export function checkRateLimit(
  ip:           string,
  maxRequests:  number = 5,
  windowMs:     number = 15 * 60 * 1000  // 15 minutes
): { allowed: boolean; remaining: number; resetIn: number } {
  // Purge stale entries every ~50 checks to keep memory clean
  if (Math.random() < 0.02) purgeExpiredEntries();

  const now  = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed:   false,
      remaining: 0,
      resetIn:   entry.resetTime - now,
    };
  }

  entry.count += 1;
  return {
    allowed:   true,
    remaining: maxRequests - entry.count,
    resetIn:   entry.resetTime - now,
  };
}

/**
 * Extract real client IP from Next.js request.
 * Handles Vercel's X-Forwarded-For header correctly.
 */
export function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for as "client, proxy1, proxy2"
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return firstIp;
  }
  // Fallback
  return req.headers.get('x-real-ip') ?? 'unknown';
}

// ── 4. ORIGIN VALIDATION ──────────────────────────────────────

/**
 * Validate that the request comes from an allowed origin.
 * Blocks direct API calls from unknown sources.
 */
export function validateOrigin(req: NextRequest): boolean {
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const origin    = req.headers.get('origin')  ?? '';
  const referer   = req.headers.get('referer') ?? '';

  // In development, always allow (localhost)
  if (
    origin.includes('localhost') ||
    referer.includes('localhost')
  ) {
    return true;
  }

  // Allow configured site URL
  if (siteUrl && (origin.startsWith(siteUrl) || referer.startsWith(siteUrl))) {
    return true;
  }

  // Allow production domains explicitly
  const allowed = [
    'https://srilankantriptip.com',
    'https://www.srilankantriptip.com',
  ];

  for (const domain of allowed) {
    if (origin.startsWith(domain) || referer.startsWith(domain)) {
      return true;
    }
  }

  return false;
}

// ── 5. PAYLOAD SIZE GUARD ─────────────────────────────────────

const MAX_PAYLOAD_BYTES = 64 * 1024; // 64 KB — more than enough for 30 days

/**
 * Check Content-Length header. Returns false if oversized.
 * Note: actual body parsing is done by Next.js — this is an early
 * rejection based on the declared content-length header.
 */
export function isPayloadAcceptable(req: NextRequest): boolean {
  const contentLength = req.headers.get('content-length');
  if (!contentLength) return true; // Header absent — allow (streaming)
  const size = parseInt(contentLength, 10);
  if (isNaN(size)) return true;
  return size <= MAX_PAYLOAD_BYTES;
}