import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
  });

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}

export async function fetchGames() {
  return client.fetch(`
    *[_type == "game"] | order(scheduleDay asc) {
      _id,
      title,
      slug,
      coverImage,
      description,
      scheduleDay,
      scheduleTime,
      playerCount,
      maxPlayers,
      gameLink
    }
  `);
}

export async function fetchRecentPosts(limit = 3) {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt
    }
  `);
}

export async function fetchFeaturedApps() {
  return client.fetch(`
    *[_type == "appPage" && featured == true] | order(title asc) {
      _id,
      title,
      slug,
      description,
      icon
    }
  `);
}