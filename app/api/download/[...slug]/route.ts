import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { slug: string[] } }) {
  const filename = (params.slug || ["file.txt"]).slice(-1)[0] || "file.txt";
  const content = `Dummy content for ${filename}\nReplace this with the real file later.`;
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": filename.toLowerCase().endsWith(".pdf") ? "application/pdf" : "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`
    },
  });
}

