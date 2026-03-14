import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ENTRIES_DIR = path.join(process.cwd(), "content", "entries");

export type EntryMeta = {
  slug: string;
  title: string;
  subheading: string;
  date: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
  cover?: string;
  coverWord?: string;
};

export type Entry = EntryMeta & {
  content: string;
};

export function getAllEntries(): EntryMeta[] {
  if (!fs.existsSync(ENTRIES_DIR)) return [];

  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        subheading: data.subheading ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
        readingTime: data.readingTime ?? 5,
        draft: data.draft ?? false,
        cover: data.cover ?? undefined,
        coverWord: data.coverWord ?? undefined,
      } satisfies EntryMeta;
    })
    .filter((e) => !e.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEntry(slug: string): Entry | null {
  const filePath = path.join(ENTRIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    subheading: data.subheading ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    readingTime: data.readingTime ?? 5,
    draft: data.draft ?? false,
    cover: data.cover ?? undefined,
    coverWord: data.coverWord ?? undefined,
    content,
  };
}
