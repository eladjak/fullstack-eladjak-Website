import {
  Database,
  Search,
  Brain,
  Layers,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Sparkles,
  Users,
  Mail,
  Cpu,
  Package,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const qdrantGuideEn: AgentGuideData = {
  slug: "qdrant",
  agentName: "Qdrant",
  agentNameHe: "Qdrant — Semantic Memory for Agents",
  logoImage: "/images/guide-logos/qdrant-logo.png",
  tagline: "The foundation for remembering by meaning, not by keywords",
  heroDescription:
    "Qdrant is an open-source vector database written in Rust (v1.14+ as of late 2025), running inside a Docker container with both HTTP (6333) and gRPC (6334) APIs. Its capabilities: storing embeddings (up to 4096 dimensions per dense vector, plus sparse vectors for hybrid search), HNSW indexing, scalar and product quantization, semantic search, rich filters, arbitrary JSON payloads, sharding and replication. In my setup there are 10 collections ([kami_memory](/en/guide/kami), [box_coach](/en/guide/box), [network_memory](/en/guide/adopter) and more) holding thousands of vectors. In your product, Qdrant can serve as memory for a chatbot, power semantic search over a document corpus, drive a recommendation engine, or deduplicate content by meaning — anywhere you need to 'remember meaning' rather than just keywords.",
  badgeText: "2026 · Vector Memory · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/qdrant",
  heroBgImage: "/images/guides/guide-qdrant-hero.jpg",
  videoUrl: "/videos/guides/qdrant.mp4",
  stats: [
    { label: "my collections", value: "10" },
    { label: "total embeddings", value: "10k+" },
    { label: "search latency", value: "<50ms" },
    { label: "cost", value: "free" },
  ],
  paradigmTitle: "Resetting what 'remember' means",
  paradigmSub:
    "A regular database searches by words. Qdrant searches by ideas. That's the whole difference.",
  paradigmShifts: [
    {
      before: "SELECT * WHERE text LIKE '%diet%'",
      after: "SEARCH similar to 'healthy nutrition' → also finds food-sport-mood",
      icon: Search,
    },
    {
      before: "Hundreds of lines of code to figure out 'what the user asked'",
      after: "One semantic query, 5 relevant answers, 40ms",
      icon: Brain,
    },
    {
      before: "ChatGPT memory — simple and limited",
      after: "Millions of vectors, filtering, metadata — all yours",
      icon: Database,
    },
    {
      before: "Pinecone serverless ~$70+/mo for a comparable workload (Weaviate Cloud similar)",
      after: "Qdrant docker locally — $0, 100k+ embeddings easily (or Qdrant Cloud free 1GB tier / ~$0.04/hr on the smallest cluster)",
      icon: Package,
    },
  ],
  whoIsThisFor: [
    {
      title: "Builders of agents with memory",
      description:
        "Long-term memory, short-term memory, conversation history — all in Qdrant.",
      icon: Brain,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Semantic search for your product",
      description:
        "FAQ, documentation search, product recommendations — Qdrant replaces Elasticsearch where relevance really matters.",
      icon: Search,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "RAG developers",
      description:
        "Retrieval-Augmented Generation — the foundation of chatbots with a knowledge base.",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Data engineers",
      description:
        "Dedupe, clustering, anomaly detection — powered by embeddings of your data.",
      icon: Code2,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "embeddings", label: "Embeddings" },
    { id: "collections", label: "Collections" },
    { id: "search", label: "Search" },
    { id: "real-use", label: "Real use" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "What is Qdrant? A database that understands meaning",
      subtitle: "Open source, written in Rust, runs semantic search faster than any competitor",
      description:
        "Qdrant belongs to a relatively new family of databases called vector databases. Unlike Postgres or MySQL, which look for exact keyword matches (e.g. 'find me all customers named David'), Qdrant searches for matches of *meaning* — and that's why, over the past few years, it has become one of the most important components in any serious AI system that needs to 'remember' things. It's written in Rust (one of the fastest languages in software), and it's fully open source.",
      color: "from-red-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "Think of it like this: in a regular library, to find a book you need to know the exact title or author. In a vector database like Qdrant, you can walk in and say 'I'm looking for something about vegetarian cooking with a Mediterranean flavour' — and it will find relevant books, even if none of the exact words in your query ever appear on the cover. That is precisely the ability that lets AI agents like [Kami](/en/guide/kami) and [Box](/en/guide/box) 'remember' your conversations by what was actually said, rather than by literal keywords.",
      content: [
        "A vector database stores 'points' in a high-dimensional space (typically 768 or 1536 dimensions). Each point represents a sentence, an image, a code snippet — anything that can be turned into an embedding (a numeric fingerprint of meaning)",
        "Nearest-neighbour search — an algorithm called HNSW (Hierarchical Navigable Small Worlds) that finds the 10 points most similar to your query in under 50 milliseconds, even across millions of points",
        "Smart filtering: you can combine vector search with classic filters (e.g. 'find similar conversations, but only from the last month, and only for a specific user') — a winning combination that few competitors offer",
        "Flexible payload: alongside each vector you can store a free-form JSON blob of metadata — user id, date, tags, or any other field you want to filter by",
        "Multiple collections: organise by topic or use case (I have a separate collection per agent — kami_memory, box_coach, network_memory and others). Each collection can use a different embedding model",
        "Simple deployment: an official 150MB Docker image that runs comfortably even on a 256MB VPS, and ships with a beautiful visual dashboard for exploring your data at localhost:6333/dashboard",
      ],
      tips: [
        "Install it via docker-compose — see the [Docker guide](/en/guide/docker) for details on networks, volumes, and making it persistent",
        "If you're using [CrewAI](/en/guide/crewai) or your own agent with [Claude](/en/claude-code), connecting to Qdrant via LangChain or directly is a one-liner; the qdrant-client Python library is excellent",
      ],
      codeExample: {
        label: "Instant install in 30 seconds",
        code: "docker run -d -p 6333:6333 -p 6334:6334 \\\n  -v $(pwd)/qdrant_storage:/qdrant/storage \\\n  qdrant/qdrant\n\n# Now you have a UI at http://localhost:6333/dashboard\n# And a REST API at http://localhost:6333",
      },
    },
    {
      id: "embeddings",
      icon: Cpu,
      title: "Embeddings — how text becomes numbers",
      subtitle: "Sentence → 768 numbers → a location in space",
      description:
        "An embedding is a numeric fingerprint of a sentence, a paragraph, or even an image — a sequence of several hundred numbers (usually 768 or 1536) that encode the *meaning* of the content inside a 'map of meanings'. Before [Qdrant](/en/guide/qdrant) can help us find anything, the text has to be turned into such an embedding, and that job is done by dedicated models (such as Google's gemini-embedding-001, or OpenAI's text-embedding-3). In my setup, every message that reaches [Kami](/en/guide/kami) first passes through Gemini, which converts it into a fingerprint, and only then is it stored in Qdrant.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "Imagine every sentence in the world has a unique coordinate on a 3D 'map' (or in our case, a 768-dimensional one). Sentences with similar meaning — 'I ate a salad' and 'I had a healthy lunch' — land at nearby coordinates on that map. Sentences that are far apart in meaning — 'I ate a salad' and 'I fixed my car' — land far apart. That's the whole trick: when you search for something, you're really asking 'which coordinates on the map are closest to mine?'",
      content: [
        "Google's gemini-embedding-001 — completely free, returns a 768-number vector, and works remarkably well even in Hebrew (this is what I use)",
        "OpenAI text-embedding-3-small — about $0.02 per million tokens, 1536 dimensions (a good fit if you already pay OpenAI). Its bigger sibling text-embedding-3-large gives 3072 dimensions at higher cost",
        "Voyage voyage-3 — 1024 dimensions, considered the highest-quality English embedding model in the RAG world today, but paid",
        "nomic-embed-text-v1.5 — open-source, 768 dimensions, runs locally via Ollama; Cohere embed-multilingual-v3 covers 100+ languages including solid Hebrew",
        "Every service returns an array of floating-point numbers — that's exactly the vector you store in Qdrant alongside your metadata",
        "Important: you cannot search across one collection with vectors from a different model or a different dimension — each model's map is essentially a different language",
      ],
      tips: [
        "For Hebrew, gemini-embedding-001 with outputDimensionality=768 gives amazing results for free, and there's no reason to start anywhere else unless you have a specific requirement",
        "Never swap your embedding model after you already have data in a collection — you'll need to re-index (rebuild every vector from scratch), because each model speaks a different 'language' of numbers; see the [Adopter guide](/en/guide/adopter) for an example of managing embeddings in one place",
      ],
      codeExample: {
        label: "Creating an embedding",
        code: "import requests\n\nresp = requests.post(\n    f'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key={KEY}',\n    json={'content': {'parts': [{'text': 'I ate a Greek salad'}]}, 'outputDimensionality': 768}\n)\nembedding = resp.json()['embedding']['values']  # list of 768 floats",
      },
    },
    {
      id: "collections",
      icon: Layers,
      title: "Collections — the shape of the data",
      subtitle: "Each collection = a 'table' with a fixed dimension",
      description:
        "A collection is an independent 'library of meanings' inside Qdrant — a bucket of vectors that all live on the same map (that is, produced by the same embedding model, with the same number of dimensions). Every point inside the collection is made of an id (a unique identifier), the vector itself (the numeric fingerprint), and a payload (a JSON metadata package — user name, date, tags for filtering, and so on). In my network, I run 10 such collections — one per purpose.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "You can picture a collection like a bookshelf: each shelf is dedicated to one topic (conversations, recipes, service statuses) and all the books on it are sorted by the same indexing scheme. Changing the scheme mid-way means you have to pull everything off and re-shelve it (that's re-indexing), so it's important to pick the right setup at the start.",
      content: [
        "A collection is the equivalent of a 'table' in a classical database — defined once with a name, a vector size (dimension) and a distance metric",
        "A point is the equivalent of a 'row' — made of an id, a vector (the numeric fingerprint), and a payload (free-form JSON with whatever metadata you want)",
        "Distance metric (how 'similar' is measured): Cosine similarity (angle between vectors — recommended for text), Euclidean (straight-line distance), or Dot product (inner product)",
        "Indexing: Qdrant uses an algorithm called HNSW (Hierarchical Navigable Small Worlds), which automatically builds a multi-layer map for fast nearest-neighbour search, with no need to scan every vector",
        "In my network: kami_memory (1000 WhatsApp messages from [Kami](/en/guide/kami)), kaylee_memory (memory for [Kaylee](/en/guide/kaylee)), agents_registry (who-does-what), healing_history (what [Hermes](/en/guide/hermes) has fixed in the past), network_memory, telegram_news and more",
        "Creating a collection is a one-time API call: PUT /collections/<name> with the vector configuration — from then on you only add or search",
      ],
      codeExample: {
        label: "Creating a collection",
        code: "PUT /collections/kami_memory\n{\n  \"vectors\": {\n    \"size\": 768,\n    \"distance\": \"Cosine\"\n  }\n}",
      },
    },
    {
      id: "search",
      icon: Search,
      title: "Semantic search — the power of Qdrant",
      subtitle: "k-NN with filtering — simple and fast",
      description:
        "Semantic search is how Qdrant finds the vectors whose meaning is closest to your query — the technique is called k-NN (k-Nearest Neighbours, i.e. 'the k closest neighbours'). The logic is simple: you send a query vector (produced by the same embedding model as the collection), and Qdrant returns the top-k points closest to it, with an optional filter — a classic metadata predicate like 'only from the last month' or 'only for a specific user'. In my network this happens thousands of times a day across the agent network.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "It's a bit like the game 'hot and cold': you tell Qdrant 'I'm looking for something that feels like this' (the vector of your question), and it replies with 'here are the 10 items most similar in your store, each with a similarity score'. A score of 1.0 means identical, 0.7 is highly relevant, 0.5 is already barely related.",
      content: [
        "Search entry point: POST /collections/<name>/points/search — always sends the vector together with parameters",
        "The body includes: vector (the array itself), limit (how many results to return), filter (optional filtering predicate), and with_payload (whether to return the JSON metadata)",
        "Filter syntax uses must (required), should (preferred), and must_not (forbidden) — very similar to MongoDB's syntax if you know it",
        "Similarity score ranges from 0 to 1 with Cosine: 1.0 = identical sentences, 0.85 = very close, 0.5 = no meaningful relation",
        "For RAG usage (Retrieval-Augmented Generation — where [Claude](/en/claude-code) is given extra context from memory before answering), it's recommended to set a threshold of 0.7 or higher — below that you'll get more noise than useful answers",
        "Batch search lets you send multiple queries in a single call — useful when looking for similarity across several sentences at once (my [Adopter](/en/guide/adopter) agent uses this for deduplication)",
      ],
      codeExample: {
        label: "Search with a filter",
        code: 'POST /collections/kami_memory/points/search\n{\n  "vector": [0.12, -0.03, 0.87, ...],  // 768 floats\n  "limit": 10,\n  "with_payload": true,\n  "filter": {\n    "must": [\n      {"key": "year", "match": {"value": 2026}}\n    ]\n  }\n}',
      },
    },
    {
      id: "real-use",
      icon: Sparkles,
      title: "6 real use cases from my network",
      subtitle: "What actually gets stored in Qdrant",
      description:
        "To make the concepts feel concrete, here are 6 real use cases for collections I run in production every day across the agent network. Each solves a different problem, and together they form the network's collective memory system.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "kami_memory — stores [Kami](/en/guide/kami)'s most recent WhatsApp messages. Before replying to me, Kami searches this collection to see whether we've already talked about something similar, so conversations flow and don't repeat themselves",
        "agents_registry — a live registry of every agent in the network with a description of what each one does. When I ask something like 'what does [Hermes](/en/guide/hermes) do?' I get a full description in under a second",
        "agent_status — heartbeat of every service, updated every 5 minutes by the [Dashboard](/en/guide/dashboard). A semantic query like 'which services didn't respond today?' gets an instant answer",
        "healing_history — the log of every automatic fix [Hermes](/en/guide/hermes) has performed. When a new container goes down, he asks 'what similar state have I seen before, and what fixed it?' and gets a first idea from past experience",
        "network_memory — a shared memory that agents write to when they want to share an insight. Whatever [CrewAI](/en/guide/crewai) produced yesterday, whatever [Adopter](/en/guide/adopter) discovered — it's accessible to everyone",
        "telegram_news — articles and AI tools pulled from Telegram channels. [Adopter](/en/guide/adopter) compares every new item against what's already in the collection to avoid semantic duplicates (even when phrased differently)",
      ],
      tips: [
        "Start with one small, simple collection (conversations or documents, say) — once you understand the flow, split it later into topic-specific collections",
        "Store the same ID inside the payload as the ID of the source record in your primary database (Postgres, [n8n](/en/guide/n8n) and so on) — that way it's easy to jump back to the full record without duplicating data",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "Advanced tips",
      subtitle: "What I learned in a year with Qdrant",
      description:
        "This section is the small details that make the difference between 'I have Qdrant' and 'my Qdrant flies, saves money, and lasts for years.' These are the things I learned over a year of running it in production, with a whole agent network leaning on this memory every second.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Payload indexing — if you filter heavily on a specific JSON field (say 'year' or 'user_id'), define a dedicated index on it in Qdrant. This speeds filtering up by orders of magnitude and cuts scan time",
        "Snapshot backup — GET /collections/<name>/snapshots creates a full compressed backup of a collection in a single file. In my setup it runs on a nightly cron via [Docker](/en/guide/docker) and gets uploaded to external storage",
        "Sparse vectors — alongside dense vectors (the usual embeddings) you can also store sparse vectors (BM25-style — keyword-driven). Combining both gives you a particularly strong hybrid search",
        "Quantization — a vector compression technique (scalar quantization) that shrinks memory usage by 4x with minimal impact on result quality. Critical once you reach millions of vectors",
        "Replication and sharding — the latest versions of Qdrant support cluster mode with automatic replication and sharding across servers. I don't run this yet because a single server is enough, but it's there for when I scale",
        "Metrics — GET /metrics returns metrics in Prometheus format (search latency, queue sizes, memory). Easy to wire up to Grafana or to the [Dashboard](/en/guide/dashboard) for real-time performance visibility",
      ],
      tips: [
        "Don't store the full original text inside the payload if it's long — store only an ID that points to the full record in another database (Postgres, a file). A large payload hurts search speed",
        "Security is critical: recent Qdrant versions require an API key by default. Never expose port 6333 to the open internet without an API key and a firewall — that's the equivalent of leaving your Postgres naked on the network",
      ],
    },
  ],
  resources: [
    {
      title: "Qdrant Docs",
      description: "Official docs — clear and comprehensive",
      href: "https://qdrant.tech/documentation",
      icon: ExternalLink,
    },
    {
      title: "Qdrant GitHub",
      description: "Open source in Rust, 20k+ stars",
      href: "https://github.com/qdrant/qdrant",
      icon: Github,
    },
    {
      title: "Gemini Embeddings",
      description: "Free embedding model — good at Hebrew",
      href: "https://ai.google.dev/gemini-api/docs/embeddings",
      icon: ExternalLink,
    },
    {
      title: "Kami guide",
      description: "How Kami uses Qdrant for memory",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "Hermes guide",
      description: "The healing_history collection in action",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "Book a consultation",
      description: "Want RAG in your product?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Your agents' memory is the real differentiator",
  ctaSub:
    "Qdrant is free, 30 seconds to install, and you're remembering meaning.",
  primaryCta: {
    label: "Install Qdrant",
    href: "https://qdrant.tech/documentation/guides/installation",
    icon: Package,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "Qdrant is the vector database every agent in my network uses for semantic memory. 10 collections in production, thousands of vectors, zero cost. This guide lays out the patterns that have worked for me: how to pick dimensions, when to re-index, how to manage payload, and how to integrate with open-source embedding models — so you can build semantic memory for your own agent in about an hour.",
};
