type BaseDownloadConfig = {
  /** Optional name shown to the browser in the Content-Disposition header */
  downloadName?: string;
  /** Override detected content type */
  contentType?: string;
  /** Force attachment/inline behavior */
  disposition?: "inline" | "attachment";
  /** Cache duration in seconds */
  cacheSeconds?: number;
};

type LocalDownloadConfig = BaseDownloadConfig & {
  type: "local";
  /** Relative path under the public directory */
  relativePath: string;
};

type RemoteDownloadConfig = BaseDownloadConfig & {
  type: "remote";
  /** Fully-qualified URL that hosts the file */
  url: string | null;
  /** Optional SHA hash string (hex) used to verify file integrity */
  integrityHash?: string;
  /** Hash algorithm used for integrityHash (defaults to sha256) */
  hashAlgorithm?: "sha256" | "sha384" | "sha512";
};

export type DownloadConfig = LocalDownloadConfig | RemoteDownloadConfig;

type Manifest = Record<string, DownloadConfig>;

function env(name: string) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length ? value.trim() : null;
}

export const downloadManifest: Manifest = {
  "Nivesh_Resume_MSBA2026.pdf": {
    type: "remote",
    url: env("REMOTE_RESUME_URL"),
    contentType: "application/pdf",
    disposition: "inline",
    cacheSeconds: 300,
  },
  "Liquidity_Forecasting_OnePager.pdf": {
    type: "remote",
    url: env("REMOTE_LIQUIDITY_ONE_PAGER_URL"),
    contentType: "application/pdf",
    disposition: "inline",
    cacheSeconds: 300,
  },
  "cx-driver-deck.pptx": {
    type: "remote",
    url: env("REMOTE_CX_DRIVER_DECK_URL"),
    downloadName: "Flipkart - CX Driver Deck.pptx",
    contentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    disposition: "attachment",
    cacheSeconds: 300,
  },
};

export function getDownloadConfig(slugSegments: string[]) {
  if (!slugSegments.length) return null;
  const key = slugSegments.join("/");
  const config = downloadManifest[key];
  return config
    ? {
        config,
        key,
        fileName: config.downloadName ?? slugSegments[slugSegments.length - 1] ?? key,
      }
    : null;
}
