import { NextRequest, NextResponse } from "next/server";

const ALLOWED_FILES = ["hero", "about", "experience", "resources"] as const;
type AllowedFile = (typeof ALLOWED_FILES)[number];

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const body = await req.json();
  const { file, path, value } = body as { file: string; path: string; value: string };

  if (!ALLOWED_FILES.includes(file as AllowedFile)) {
    return NextResponse.json({ error: "Unknown file" }, { status: 400 });
  }

  const fs = await import("fs/promises");
  const nodePath = await import("path");
  const { setByPath } = await import("@/lib/pathResolver");

  const filePath = nodePath.join(process.cwd(), "data", `${file}.json`);
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);
  const updated = setByPath(data, path, value);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");

  return NextResponse.json({ ok: true });
}
