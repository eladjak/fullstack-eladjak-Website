import {
  Cpu,
  Download,
  Zap,
  HardDrive,
  Layers,
  Gauge,
  DollarSign,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Brain,
  Terminal,
  Server,
  Shield,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ollamaGuideEn: AgentGuideData = {
  slug: "ollama",
  agentName: "Ollama",
  agentNameHe: "Ollama — Free Local LLMs on Your Machine",
  category: "infra",
  logoImage: "/images/guide-logos/ollama-logo.png",
  tagline:
    "Smart language models (like ChatGPT) running directly on your own machine — no cloud required",
  heroDescription:
    "Ollama is an open-source platform that lets you run powerful AI language models — LLMs (Large Language Models, the engines behind ChatGPT, Claude, and friends) — directly on your own machine. No internet connection required, no data shipped off to OpenAI or Google, everything stays with you in full privacy. The platform is written in Go and knows how to run dozens of well-known models including Google's Gemma, Meta's Llama, Alibaba's Qwen, and DeepSeek — all completely free. For me (Elad), Ollama mostly serves as a safety net: when cloud models get too expensive or hit rate limits, my agents (like [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), and [CrewAI](/en/guide/crewai)) automatically fall back to a local model — saving a lot of money on routine tasks. For you it can be much more than that: a full AI environment that works offline, a solution for organizations with strict privacy requirements (healthcare, legal, security), or simply a way to explore the world of open language models without spending a dollar.",
  badgeText: "2026 · Local LLM Runtime · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/ollama",
  heroBgImage: "/images/guides/guide-ollama-hero.jpg",
  videoUrl: "/videos/guides/ollama.mp4",
  stats: [
    { label: "Cost", value: "Free" },
    { label: "Install time", value: "5 minutes" },
    { label: "Popular models", value: "50+" },
    { label: "Privacy", value: "100% local" },
  ],
  paradigmTitle: "When AI runs on your machine — everything changes",
  paradigmSub:
    "No request limits, no API keys to manage, no privacy worries. Just your computer, the model, and the conversation between them.",
  paradigmShifts: [
    {
      before: "$40/month on OpenAI/Anthropic APIs",
      after: "Gemma 2B running on a MacBook, $0",
      icon: DollarSign,
    },
    {
      before: "Every query goes to the cloud and sits with a vendor",
      after: "Sensitive data stays home. Small model, 200ms response",
      icon: Shield,
    },
    {
      before: "Rate limits throttle batch processing",
      after: "1000 classifications in a row, no limits",
      icon: Zap,
    },
    {
      before: "AI tasks depend on stable internet",
      after: "LLM works offline — on a plane, in a basement, anywhere",
      icon: Server,
    },
  ],
  whoIsThisFor: [
    {
      title: "Developers on a budget",
      description:
        "Before paying $20/month for ChatGPT Plus — Gemma 2B handles 70% of the tasks for free.",
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Privacy-sensitive industries",
      description:
        "Healthcare, legal, finance — an air-gapped LLM is sometimes the only way to adopt AI at all.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Local automation",
      description:
        "Classify thousands of messages, OCR post-processing, log summaries — without paying for every API call.",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "LLM learners",
      description:
        "Understand how GGUF, quantization, and context windows actually work — Ollama reduces all of it to a single command.",
      icon: BookOpen,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "install", label: "Install" },
    { id: "models", label: "Picking a model" },
    { id: "api", label: "Using the API" },
    { id: "performance", label: "Performance" },
    { id: "integration", label: "Integration" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cpu,
      title: "So what actually is Ollama?",
      subtitle: "The simplest way into the world of local AI",
      description:
        "Ollama was born as a project that challenges one assumption: that using advanced AI means connecting to some giant cloud vendor and paying them. It provides a single simple tool that downloads a model, loads it into memory, and opens it up for conversation — just like ChatGPT, but without OpenAI ever knowing anything about you.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Think of Ollama like Spotify for language models: there's a big library of 'tracks' (models), you pick one to download, and it plays on your machine. The big difference is that this player needs a reasonably strong processor — and what plays isn't music, it's intelligent conversation.",
      content: [
        "One simple installer, no deep technical knowledge required — a package that works on Mac, Windows, and Linux",
        "A library of over 200 leading open models, including: Google's Gemma family (including the new Gemma 3), Meta's Llama family (Llama 3.1, 3.2, and 3.3), Alibaba's Qwen family (Qwen 2.5 and Qwen 3), the DeepSeek series (DeepSeek-V3 and DeepSeek-R1 with reasoning capabilities), France's Mistral models (Mistral Small, Mixtral), Microsoft's Phi-4, HuggingFace's SmolLM2 series, and dedicated specialist models (OpenAI's GPT-OSS open release, Cohere's Command-R, IBM's Granite) — all completely free for local use",
        "An API that's fully compatible with OpenAI's — so any software that already talks to ChatGPT can talk to Ollama instead, with a single URL change",
        "Runs as a background service on port 11434, available to every other app on your machine — which makes it easy to wire into agents, tools, and sites you build",
        "Automatic GPU support — an NVIDIA card, Apple Silicon chip, or AMD GPU accelerates things 5-10x compared to CPU alone",
        "Models ship in a compact format called GGUF, which compresses the weights without materially hurting quality — so even a home machine with 8GB of RAM can run a respectable model",
      ],
      tips: [
        "Start with Gemma 3 at 4B: an excellent default that runs smoothly even on a regular MacBook Air and is considered the strongest model in its weight class as of 2026. Great quality, fast, and only needs about 3.3GB of memory.",
        "If you have a strong GPU (16GB VRAM or more) — try Qwen 3 at 14B or 32B. Their quality now rivals Claude Haiku and GPT-4o-mini, and they include a thinking mode for complex problem-solving.",
        "For code work — Qwen 3 Coder (30B size) and DeepSeek-Coder-V2 beat generic chat models significantly. They were trained on billions of lines of real code and return far more accurate output.",
      ],
      codeExample: {
        label: "Two commands and you have local AI",
        code: "# Mac/Linux — install\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# Download a model and chat with it\nollama pull gemma3:2b\nollama run gemma3:2b \"Hello, how are you?\"",
      },
    },
    {
      id: "install",
      icon: Download,
      title: "Installation — every platform",
      subtitle: "Mac, Linux, Windows, Docker",
      description:
        "Installing Ollama is a very simple operation that's supported on every major OS. My recommendation: install directly on your machine (Mac and Linux) — that gives you immediate access to your GPU and accelerates performance significantly. [Docker](/en/guide/docker) — the system that runs software inside isolated 'boxes' — is reserved for people who truly need separation between servers or work in a production environment.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "If you have a modern Mac (M1/M2/M3 chip) or a Linux box with an NVIDIA card — installation is a single script in your terminal, and within a few minutes everything is ready. On Windows the easy path is to download Ollama Desktop (a visual app with a taskbar icon), and for professional servers Docker is the way to go.",
      content: [
        "On Mac: either one command in the terminal (curl | sh) or download the official app from ollama.com — you get a nice icon in the menu bar",
        "On Linux: the same command automatically creates a background service (systemd) that starts on every boot — just like any other system service",
        "On Windows: you can download Ollama Desktop (still in early preview) or use WSL2 (the Linux subsystem built into Windows) together with nvidia-container-toolkit",
        "On [Docker](/en/guide/docker): there's an official image (ollama/ollama:latest) that runs with the --gpus=all flag if you have NVIDIA, or without it for CPU-only",
        "A fast SSD matters a lot: when you fire up a model it streams from disk into memory, and a modern NVMe drive cuts that first-load wait in half",
        "RAM rule of thumb: you need about 1.2x the model size at standard compression (Q4). So Gemma 3 4B needs about 3.3GB, Llama 3.1 8B wants around 6GB, and Qwen 3 32B requires about 22GB",
      ],
      tips: [
        "Set the OLLAMA_MODELS environment variable to point at a large drive — models can easily take up 50GB or more, and they don't belong on a small system disk",
        "On Linux, the clean way to add configuration is via sudo systemctl edit ollama — this lets you add environment variables without breaking future upgrades",
        "In Docker it's mandatory to mount a volume at /root/.ollama — otherwise every time the container stops you lose all the models you downloaded and have to re-download them",
      ],
      codeExample: {
        label: "Docker with GPU",
        code: "docker run -d \\\n  --gpus=all \\\n  -v ollama:/root/.ollama \\\n  -p 11434:11434 \\\n  --name ollama \\\n  ollama/ollama",
      },
    },
    {
      id: "models",
      icon: Layers,
      title: "Which model should you pick?",
      subtitle: "Breakdown by use case — small vs large, chat vs code",
      description:
        "Picking a model can feel complicated — the Ollama library has hundreds of models with names packed full of technical acronyms. The simple truth is that for each kind of task only five or six models actually matter, and in practice most people get by with two or three. Here's the practical guide to making a smart choice based on your task and your hardware.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "Think of two simple dimensions: (1) how much memory you have — both regular RAM and on the GPU (VRAM, the dedicated GPU memory); (2) what's your main task — regular conversation, writing code, text classification, or creating embeddings (turning text into a numeric representation that enables semantic comparison). The intersection of those two dimensions gives you the right model.",
      content: [
        "For general tasks (chat, summarization, translation, creative writing): Gemma 3 at 4B is fast and cheap for daily work / Llama 3.1 at 8B is an excellent alternative with a 128k-token context / Qwen 3 at 14B hits the sweet spot between quality and hardware demands / Llama 3.3 at 70B and Qwen 3 at 32B deliver cloud-tier quality but require strong hardware (32–48GB VRAM)",
        "For complex reasoning (math, logic, multi-step analysis): DeepSeek-R1 (available in sizes from 1.5B to 70B), Qwen 3 in thinking mode, or OpenAI's gpt-oss (the open-source GPT release). These newer models perform internal 'thinking' before returning an answer",
        "For code work (writing, review, refactoring): Qwen 3 Coder (30B) — the best as of 2026 / DeepSeek-Coder-V2 (16B) is a great, more affordable alternative / StarCoder2 (15B) from HuggingFace is strong for Python work / CodeLlama (34B) is still relevant if you work in less common languages",
        "For lightweight models (weak machines or edge devices): HuggingFace's SmolLM3 at 3B / Microsoft's Phi-4-mini (3.8B) / Gemma 3 1B — all run comfortably even on GPU-less machines",
        "For classification with structured JSON output: Gemma 3 at 4B or Phi-4 with format: 'json' — they return consistent, fast answers",
        "For embeddings (numeric representation for semantic search): nomic-embed-text version 1.5 (768 dimensions), mxbai-embed-large (1024 dimensions, higher quality), or snowflake-arctic-embed-l — all pair beautifully with [Qdrant](/en/guide/qdrant)",
        "For Hebrew: Qwen 3 and Qwen 2.5 are the uncontested leaders among local models. Gemma 3 is reasonable and efficient. Mistral Small 3.1 is surprisingly decent. DeepSeek and Llama remain relatively weak in Hebrew — they were trained primarily on English",
        "For computer vision (image analysis): LLaVA (7B), MiniCPM-V (8B), Qwen2-VL (7B) or Gemma 3's Vision variant — all do OCR (reading text in images), produce descriptive captions, and even answer questions about charts and screenshots",
      ],
      tips: [
        "The recommended default quantization (smart model compression that shrinks the file without a material quality drop) is Q4_K_M. Q8_0 gives slightly higher quality but doubles the memory footprint — usually not worth it for day-to-day use",
        "The gap between llama3.1:latest (the default, Q4_K_M) and llama3.1:8b-instruct-q8_0 is about 3–5 percent in answer quality but roughly 2x the memory. So the compressed version almost always wins — download the larger variant only if you have plenty of VRAM and maximum quality is critical",
        "Before downloading a heavy 30GB+ model, peek at its page on the official site (ollama.com/library/NAME) — you'll find comparison tables, up-to-date benchmarks, and the full range of quantization levels with size/quality details",
        "Important 2026 update: the new models (Gemma 3, Qwen 3, DeepSeek-V3, Llama 3.3) all support 128k context tokens — so you can feed entire documents or large codebases into a single conversation",
      ],
      codeExample: {
        label: "Searching and inspecting a model",
        code: "ollama list           # what is installed\nollama pull qwen3-coder:7b\nollama show qwen3-coder:7b  # config, context, params\nollama rm MODEL       # delete (models are heavy)",
      },
    },
    {
      id: "api",
      icon: Terminal,
      title: "Using the REST API",
      subtitle: "OpenAI-compatible — easy swap for existing integrations",
      description:
        "The API is how software talks to Ollama from code. The default is port 11434 (the number the service listens on locally), and the API supports a range of paths: /api/generate for simple text generation, /api/chat for conversations with history, /api/embeddings to turn text into numbers, and /v1/chat/completions — a path that's fully compatible with OpenAI's API. That last one is the magic — any software that already knows how to talk to ChatGPT can switch to Ollama without changing almost anything.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Streaming (a response that unfolds word-by-word like in ChatGPT): add 'stream': true to the request body and you get the output as a continuous stream of tokens (the small units of text the model produces)",
        "Transparent OpenAI swap: change the API URL to http://localhost:11434/v1, provide a dummy API key (any string identifier) — and it works immediately with LangChain, LlamaIndex, Vercel AI SDK, and any other client",
        "Context management: unlike ChatGPT, the conversation isn't automatically retained between calls. You have to send the full messages array on every request",
        "System prompt: messages: [{role: 'system', content: '...'}, {role: 'user', ...}] — this is how you tell the model who it is and how it should behave",
        "Parameters like temperature (creativity level), top_p (how many options to consider), and num_ctx (context window size — how much text the model can 'remember' at once) — all go inside an options object and are tuned per request",
        "Function calling: Qwen 2.5 and Llama 3.1+ support this — the ability for the model to call external tools. Less stable than GPT-4, but good enough for most cases",
      ],
      tips: [
        "Always set num_ctx explicitly: the default is 2048 tokens — less than a single page of text, and usually too small. Bump it up to 4096 or 8192 as needed",
        "The keep_alive: '5m' option keeps the model loaded in memory between requests — saves two to three seconds of loading time on every follow-up call",
        "For tasks that need structured output (like filling a form): response_format: 'json' forces Gemma 3 to return valid JSON — great for automations in [CrewAI](/en/guide/crewai) or [n8n](/en/guide/n8n)",
      ],
      codeExample: {
        label: "Calling from Node/TypeScript",
        code: "const res = await fetch('http://localhost:11434/api/chat', {\n  method: 'POST',\n  body: JSON.stringify({\n    model: 'gemma3:2b',\n    messages: [{ role: 'user', content: 'What is a container?' }],\n    stream: false,\n    options: { num_ctx: 4096, temperature: 0.7 },\n  }),\n});\nconst { message } = await res.json();",
      },
    },
    {
      id: "performance",
      icon: Gauge,
      title: "Performance — what to expect and how to improve it",
      subtitle: "tokens/sec, latency, and throughput",
      description:
        "Performance is the first question every Ollama newcomer asks: how fast will this be on my machine? The answer depends on three main factors — the size of the model (how 'smart' it is), your hardware (CPU alone, or a GPU that accelerates the compute), and the quantization level (compression). Here are the typical numbers in 2026, so you know what to expect up front — and how to improve things if the numbers don't satisfy you.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "A MacBook with an M3 Pro chip and 36GB of RAM runs Gemma 3 at 2B at around fifty tokens per second (units of generated text in real time). Qwen 2.5 at 7B lands around twenty, while Llama 3.3 at 70B with Q4 quantization crawls at about four tokens per second",
        "NVIDIA 4090 (top-tier GPU with 24GB of VRAM — dedicated GPU memory) + Qwen 2.5 at 14B = about sixty tokens per second. To run a 70B model you'd need a card with 32GB of VRAM or more",
        "CPU-only (say a regular Intel i7): Gemma 3 at 2B gives you about ten tokens per second, and 7B models drop to about three — not usable for real-time conversation, but fine for background batch processing (handling groups of tasks asynchronously)",
        "First-token latency depends mostly on the time to load the model into memory. Setting keep_alive='10m' prevents reloading between requests and shortens response time significantly",
        "On concurrency: Ollama runs a limited number of parallel requests. For high-throughput needs you should use vLLM or TGI — more professional inference servers built for heavy loads",
        "Flash Attention (a clever optimization of the attention mechanism at the heart of the model) is enabled automatically on supported GPUs — saves 30-40% of memory usage with no quality loss",
      ],
      tips: [
        "Before going to production, it's worth running a load test with a tool like hey or bombardier: Ollama handles two to four concurrent requests well, beyond that it chokes and slows down dramatically",
        "If the model is too big and splits between CPU and GPU (hybrid mode) — performance plummets by 60-80%. In that case it's better to drop to a smaller model that fits entirely in GPU memory",
        "For professional benchmark comparisons there's a tool called llama-bench (included in Ollama's repo) — much more accurate than running manual queries with a stopwatch",
      ],
    },
    {
      id: "integration",
      icon: Brain,
      title: "Integrating with the agent network",
      subtitle: "How Ollama fits with Kami, CrewAI, Delegator",
      description:
        "Integration is the point where Ollama goes from being a nice local tool to becoming a beating part of a larger system. In my agent network, Ollama plays the role of a safety net (fallback — a backup plan) as well as a background worker for routine tasks that don't justify paying the cloud. Thanks to the OpenAI-compatible endpoint, every model in the network can swap from Claude or Gemini to Ollama with just a URL change. This is especially useful for classification tasks inside [Adopter](/en/guide/adopter) and for triaging intakes in [Box](/en/guide/box).",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "LangChain and LlamaIndex (popular libraries for building AI apps): OllamaLLM(model='qwen2.5', base_url='http://localhost:11434') — transparent swap in one line",
        "[CrewAI](/en/guide/crewai): Agent(llm=LLM(model='ollama/qwen2.5:7b')) — native built-in support, no adapters or wrappers",
        "Fallback in [Kami](/en/guide/kami): if Claude returns an error (429 is a quota exceeded, 500 is a server fault) — the code catches the exception and switches to Ollama automatically, the conversation continues without the user noticing",
        "[Adopter](/en/guide/adopter) classifies about 500 messages per day — instead of burning expensive Gemini quota, it all runs through local Ollama for free",
        "Embeddings: the nomic-embed-text model runs on Ollama at about 150 tokens per second and is an excellent alternative to Gemini embeddings (which are free but have per-minute rate limits)",
        "In the cost tracker (/costs/llm), these calls are marked as 'local' — meaning effectively zero cost, you're only paying for the electricity your computer uses",
      ],
      tips: [
        "Always benchmark the model on your real data. A model that scores well on standard benchmarks (like MT-Bench) isn't necessarily the best on Hebrew or on your specific domain",
        "Hybrid approach: [Claude](/en/claude-code) for complex reasoning and critical cases, Ollama for massive background data classification. This is the most cost-effective and stable combination I've found",
        "Critical security warning: never expose port 11434 to the internet! It's a fully open API with no auth. If you need remote access — put a reverse proxy with a token in front of it",
      ],
      codeExample: {
        label: "Fallback chain from Claude to Ollama",
        code: "async function llm(prompt: string) {\n  try {\n    return await anthropicClient.messages.create({ ... });\n  } catch (e) {\n    if (e.status === 429 || e.status >= 500) {\n      return await ollamaClient.chat({\n        model: 'qwen2.5:7b',\n        messages: [{ role: 'user', content: prompt }],\n      });\n    }\n    throw e;\n  }\n}",
      },
    },
  ],
  resources: [
    {
      title: "Ollama",
      description: "The official site, installer, and model library",
      href: "https://ollama.com",
      icon: ExternalLink,
    },
    {
      title: "Ollama GitHub",
      description: "The open-source code plus issues and release notes",
      href: "https://github.com/ollama/ollama",
      icon: Github,
    },
    {
      title: "llama.cpp",
      description: "The engine underneath. Useful for understanding GGUF and quantization",
      href: "https://github.com/ggerganov/llama.cpp",
      icon: Github,
    },
    {
      title: "HuggingFace GGUF Collection",
      description: "GGUF-format models not available in the Ollama registry",
      href: "https://huggingface.co/models?library=gguf",
      icon: ExternalLink,
    },
    {
      title: "Open WebUI",
      description: "A graphical web UI for Ollama (similar to ChatGPT)",
      href: "https://github.com/open-webui/open-webui",
      icon: Github,
    },
    {
      title: "The CrewAI Guide",
      description: "How to wire Ollama into a crew of agents",
      href: "/en/guide/crewai",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Stop paying for APIs and move part of the load local",
  ctaSub:
    "5 minutes to install, and an LLM is running on your machine. Depending on the task — a 20-80% saving on cloud costs.",
  primaryCta: {
    label: "Ollama official site",
    href: "https://ollama.com",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "Talk to me about setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "Ollama is a complementary layer in the network — the free fallback when cloud APIs are down or too pricey, and the default for batch tasks that don't justify paying. This guide lays out the practical split: which models are worth running local, when to go hybrid, and how to integrate with LangChain/CrewAI without breaking existing workflows.",
};
