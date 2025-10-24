// Stub for pinned GitHub highlights (server-side fetch + cache recommended)
export async function getPinnedRepos() {
  return [] as Array<{ name: string; description?: string; url: string; topics?: string[] }>;
}

