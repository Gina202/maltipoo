import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maltipoo-three.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient();

  const [{ data: puppies }, { data: parents }] = await Promise.all([
    supabase.from("puppies").select("slug, updated_at"),
    supabase.from("parents").select("slug, updated_at"),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/puppies`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/parents`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/testimonials`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const puppyPages: MetadataRoute.Sitemap = (puppies ?? []).map((puppy) => ({
    url: `${BASE_URL}/puppies/${puppy.slug}`,
    lastModified: puppy.updated_at ?? undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const parentPages: MetadataRoute.Sitemap = (parents ?? []).map((parent) => ({
    url: `${BASE_URL}/parents/${parent.slug}`,
    lastModified: parent.updated_at ?? undefined,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...puppyPages, ...parentPages];
}