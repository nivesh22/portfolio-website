import type { MetadataRoute } from "next";
import { allProjects } from "contentlayer/generated";
import { siteMetadata } from "@/lib/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.url;
  const now = new Date();

  const staticRoutes = ["/", "/about", "/projects/personal", "/projects/professional", "/skills", "/publications", "/resume", "/downloads"].map(
    (path) => ({
      url: path === "/" ? baseUrl : `${baseUrl}${path}`,
      lastModified: now,
    })
  );

  const projectRoutes = allProjects.map((project) => ({
    url: `${baseUrl}${project.url}`,
    lastModified: project.year ? new Date(project.year, 0, 1) : now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
