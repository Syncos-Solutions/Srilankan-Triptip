// ============================================================
// lib/supabase-client.ts — Sri Lankan TripTip
//
// Public (anon-key) Supabase client for website-side reads.
// Safe to use client-side — only exposes what RLS allows.
//
// Rules enforced by RLS on blog_posts:
//   - Anon users: can only SELECT where status = 'published'
//   - Anon users: cannot INSERT, UPDATE, or DELETE
//   - Only the admin panel (authenticated) can write
//
// This client is used by:
//   - app/blog/page.tsx          (list all published posts)
//   - app/blog/[slug]/page.tsx   (fetch single post by slug)
//   - increment_blog_view_count  (RPC call on post view)
// ============================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ── Singleton pattern — reuse one client instance ─────────────
let _client: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase public environment variables. ' +
      'Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  _client = createClient(url, key, {
    auth: {
      // No auth needed for public reads — suppress session persistence
      autoRefreshToken: false,
      persistSession:   false,
    },
  });

  return _client;
}

// ── Type Definitions ──────────────────────────────────────────

export interface ContentBlock {
  type:
    | 'lead_paragraph'
    | 'paragraph'
    | 'heading'
    | 'subheading'
    | 'pull_quote'
    | 'image'
    | 'image_gallery'
    | 'tips_list'
    | 'divider';
  // For text blocks
  text?:    string;
  // For image block
  src?:     string;
  alt?:     string;
  caption?: string;
  // For image_gallery block
  images?:  { src: string; alt: string; caption?: string }[];
  // For tips_list block
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

// ── Convenience type for blog listing cards ───────────────────
export type BlogPostCard = Pick<
  BlogPost,
  | 'id'
  | 'slug'
  | 'category'
  | 'title'
  | 'excerpt'
  | 'hero_image'
  | 'hero_image_alt'
  | 'author'
  | 'author_role'
  | 'author_initials'
  | 'read_time'
  | 'published_at'
  | 'featured'
  | 'tags'
>;

// ── Query helpers ─────────────────────────────────────────────

/**
 * Fetch all published posts for the blog listing page.
 * Returns lightweight card data only — no body_content (saves bandwidth).
 */
export async function getPublishedPosts(): Promise<BlogPostCard[]> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id, slug, category, title, excerpt,
      hero_image, hero_image_alt,
      author, author_role, author_initials,
      read_time, published_at, featured, tags
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[Blog] Failed to fetch posts:', error.message);
    return [];
  }

  return (data ?? []) as BlogPostCard[];
}

/**
 * Fetch a single published post by slug for the view page.
 * Returns full post including body_content and gallery_images.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // PGRST116 = row not found
      console.error('[Blog] Failed to fetch post:', error.message);
    }
    return null;
  }

  return data as BlogPost;
}

/**
 * Fetch related posts by their slugs.
 * Used at the bottom of the blog view page.
 */
export async function getRelatedPosts(slugs: string[]): Promise<BlogPostCard[]> {
  if (!slugs || slugs.length === 0) return [];

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id, slug, category, title, excerpt,
      hero_image, hero_image_alt,
      author, author_role, author_initials,
      read_time, published_at, featured, tags
    `)
    .in('slug', slugs)
    .eq('status', 'published')
    .limit(3);

  if (error) {
    console.error('[Blog] Failed to fetch related posts:', error.message);
    return [];
  }

  return (data ?? []) as BlogPostCard[];
}

/**
 * Increment view count for a post.
 * Uses a Supabase RPC function (defined in blog_posts.sql)
 * so anon users cannot arbitrarily UPDATE the table.
 */
export async function incrementViewCount(slug: string): Promise<void> {
  const supabase = createPublicClient();
  // Fire-and-forget — don't await, don't block the page
  supabase.rpc('increment_blog_view_count', { post_slug: slug }).then(() => {});
}

/**
 * Format published_at date for display.
 * e.g. "Mar 18, 2025"
 */
export function formatBlogDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  });
}