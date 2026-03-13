export interface Project {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  status: string;
  cover: string;
  coverPosition: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Anima Mundi // Obsidian PKM",
    desc: "Self-organising Personal Knowledge Management System. Semantic search across clipped articles, videos, PDFs, GitHub repos, and links. Private repo — going public soon.",
    tags: ["Python", "ChromaDB", "NLP", "embeddings", "fastembed"],
    href: "#",
    status: "Active",
    cover: "/project-anima-mundi.jpg",
    coverPosition: "center 40%",
    featured: true,
  },
  {
    title: "Recall // Document Q&A",
    desc: "Queryable knowledge base over personal document collections. Natural language Q&A across PDFs, notes, and clipped sources via RAG and vector retrieval.",
    tags: ["Python", "ChromaDB", "RAG", "NLP", "embeddings"],
    href: "#",
    status: "Planning",
    cover: "/cover-spheres.jpg",
    coverPosition: "center 50%",
    featured: true,
  },
  {
    title: "Lexis // Text Classifier",
    desc: "Fine-tuned transformer pipeline for multi-label document classification. Built for low-resource domain adaptation.",
    tags: ["HuggingFace", "spaCy", "PyTorch", "NLP"],
    href: "#",
    status: "In progress",
    cover: "/cover-aero.jpg",
    coverPosition: "center 60%",
    featured: true,
  },
  {
    title: "Strata // Data Pipeline",
    desc: "Modular ELT pipeline with schema inference, lineage tracking, and incremental loading. Designed for reproducibility.",
    tags: ["Python", "Docker", "PostgreSQL", "dbt"],
    href: "#",
    status: "In progress",
    cover: "/cover-flow.jpg",
    coverPosition: "center 40%",
  },
  {
    title: "Meridian // Embedding Explorer",
    desc: "Interactive visualisation of high-dimensional embedding spaces. Dimensionality reduction with UMAP and clustering overlays.",
    tags: ["Python", "UMAP", "ChromaDB", "fastembed"],
    href: "#",
    status: "Planning",
    cover: "/cover-wave.jpg",
    coverPosition: "center 50%",
  },
  {
    title: "Aqua // Marine Bioremediation",
    desc: "Queryable sensor data infrastructure for marine restoration and bioremediation monitoring. Ingesting environmental sensor streams into a searchable time-series database for reef and coastal ecosystem tracking.",
    tags: ["Python", "PostgreSQL", "IoT", "time-series", "RAG"],
    href: "#",
    status: "Planning",
    cover: "/cover-deep.jpg",
    coverPosition: "center 30%",
  },
];

export const featuredProjects = projects.filter(p => p.featured);
