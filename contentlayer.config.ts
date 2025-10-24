import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.md`,
  contentType: "markdown",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    role: { type: "list", of: { type: "string" } },
    domain: { type: "string" },
    stack: { type: "list", of: { type: "string" } },
    year: { type: "number" },
    impact: { type: "json" },
    summary: { type: "string" },
    cover: { type: "string" },
    downloads: { type: "json" },
    repo: { type: "string" },
    demo: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/projects/${doc.slug}`,
    },
    kind: {
      type: "string",
      resolve: (doc) => (doc._raw.sourceFilePath.includes("professional") ? "professional" : "personal"),
    }
  }
}));

export const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: `about.md`,
  contentType: "markdown",
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, About],
  disableImportAliasWarning: true,
});
