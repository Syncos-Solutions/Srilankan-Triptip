// lib/supabase-client.ts — Sri Lankan TripTip
// Public (anon-key) Supabase client.
// Uses @supabase/supabase-js — NOT @supabase/ssr.

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  _client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  return _client;
}

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export interface ContentBlock {
  type:
    | 'lead_paragraph' | 'paragraph' | 'heading' | 'subheading'
    | 'pull_quote' | 'image' | 'image_gallery' | 'tips_list' | 'divider';
  text?:    string;
  src?:     string;
  alt?:     string;
  caption?: string;
  images?:  { src: string; alt: string; caption?: string }[];
  heading?: string;
  items?:   string[];
}

export interface GalleryImage {
  src:      string;
  alt:      string;
  caption?: string;
}

export interface BlogPost {
  id:               string;
  created_at:       string;
  updated_at:       string;
  published_at:     string | null;
  status:           'draft' | 'published' | 'archived';
  featured:         boolean;
  slug:             string;
  meta_title:       string | null;
  meta_description: string | null;
  category:         string;
  title:            string;
  subtitle:         string | null;
  excerpt:          string;
  read_time:        string;
  hero_image:       string;
  hero_image_alt:   string | null;
  author:           string;
  author_role:      string | null;
  author_bio:       string | null;
  author_initials:  string | null;
  tags:             string[];
  body_content:     ContentBlock[];
  gallery_images:   GalleryImage[];
  related_slugs:    string[];
  view_count:       number;
}

export type BlogPostCard = Pick<
  BlogPost,
  | 'id' | 'slug' | 'category' | 'title' | 'subtitle' | 'excerpt'
  | 'hero_image' | 'hero_image_alt' | 'author' | 'author_role'
  | 'author_initials' | 'read_time' | 'published_at' | 'featured' | 'tags'
>;

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Normalise a raw DB row into a BlogPost.
 * Handles the case where body_content / gallery_images come back
 * as a JSON string (TEXT column) instead of a parsed array.
 */
function normalisePost(raw: Record<string, unknown>): BlogPost {
  const parseJsonField = (val: unknown): unknown[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.length > 0) {
      try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; }
      catch { return []; }
    }
    return [];
  };

  return {
    ...raw,
    body_content:   parseJsonField(raw.body_content)  as ContentBlock[],
    gallery_images: parseJsonField(raw.gallery_images) as GalleryImage[],
    tags:           Array.isArray(raw.tags)  ? (raw.tags as string[]) : [],
    related_slugs:  Array.isArray(raw.related_slugs) ? (raw.related_slugs as string[]) : [],
  } as BlogPost;
}

// ─────────────────────────────────────────────────────────────
// QUERIES
// ─────────────────────────────────────────────────────────────

export async function getPublishedPosts(): Promise<BlogPostCard[]> {
  const sb = createPublicClient();
  const { data, error } = await sb
    .from('blog_posts')
    .select('id,slug,category,title,subtitle,excerpt,hero_image,hero_image_alt,author,author_role,author_initials,read_time,published_at,featured,tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) { console.error('[Blog] getPublishedPosts:', error.message); return []; }
  return (data ?? []) as BlogPostCard[];
}

/**
 * Fetch by SLUG — used by public blog view page.
 * No status filter here — preview works for drafts too.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;
  const sb = createPublicClient();

  // ── Try slug match first ───────────────────────────────────
  const { data: bySlug, error: slugErr } = await sb
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (slugErr && slugErr.code !== 'PGRST116') {
    console.error('[Blog] getPostBySlug (slug):', slugErr.message);
  }

  if (bySlug) return normalisePost(bySlug as Record<string, unknown>);

  // ── Fallback: try matching the slug as a UUID (id field) ───
  // This handles the case where the admin panel redirects to /blog/{id}
  // instead of /blog/{slug} after creating a post.
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(slug)) {
    const { data: byId, error: idErr } = await sb
      .from('blog_posts')
      .select('*')
      .eq('id', slug)
      .maybeSingle();

    if (idErr && idErr.code !== 'PGRST116') {
      console.error('[Blog] getPostBySlug (id):', idErr.message);
    }

    if (byId) return normalisePost(byId as Record<string, unknown>);
  }

  return null;
}

export async function getRelatedPosts(slugs: string[]): Promise<BlogPostCard[]> {
  if (!slugs?.length) return [];
  const sb = createPublicClient();
  const { data, error } = await sb
    .from('blog_posts')
    .select('id,slug,category,title,subtitle,excerpt,hero_image,hero_image_alt,author,author_role,author_initials,read_time,published_at,featured,tags')
    .in('slug', slugs)
    .eq('status', 'published')
    .limit(3);
  if (error) { console.error('[Blog] getRelatedPosts:', error.message); return []; }
  return (data ?? []) as BlogPostCard[];
}

export async function incrementViewCount(slug: string): Promise<void> {
  if (!slug) return;
  const sb = createPublicClient();
  sb.rpc('increment_blog_view_count', { post_slug: slug }).then(() => {});
}

export function formatBlogDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
}