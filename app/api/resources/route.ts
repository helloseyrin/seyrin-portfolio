import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const body = await req.json();
  const { items } = body as { items: unknown[] };

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "items must be an array" }, { status: 400 });
  }

  const fs = await import("fs/promises");
  const nodePath = await import("path");

  const filePath = nodePath.join(process.cwd(), "data", "resources.json");
  await fs.writeFile(filePath, JSON.stringify({ items }, null, 2), "utf-8");

  return NextResponse.json({ ok: true });
}
