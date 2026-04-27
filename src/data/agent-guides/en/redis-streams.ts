import {
  Database,
  GitBranch,
  Zap,
  Activity,
  Network,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Layers,
  Server,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const redisStreamsGuideEn: AgentGuideData = {
  slug: "redis-streams",
  agentName: "Redis Streams",
  agentNameHe: "Redis Streams — The Heart Of Inter-Agent Communication",
  category: "infra",
  brandIconSlug: "redis",
  brandIconColor: "DC382D",
  heroBgImage: "/images/guides/guide-redis-streams-hero.jpg",
  tagline: "lightweight message bus connecting 13 agents without Kafka, RabbitMQ, or SQS",
  heroDescription:
    "Redis Streams is a Redis feature (since version 5.0, 2018) that turns it into a lightweight message broker — async communication between services, without the complexity of Kafka or RabbitMQ. Redis itself is an in-memory key-value store running on hundreds of thousands of VPSes around the world — extremely fast (microsecond operations), easy to set up, and minimal resource usage. Streams added to it the ability to hold persistent message queues with consumer groups (groups of consumers that share work), acknowledgments (confirming a message was handled), and replay (the ability to go back to old messages). For me (Elad), Redis Streams is the 'central nervous system' of my 13-agent network on Hetzner: when a WhatsApp message hits Kami, it doesn't process it alone — it pushes a message to a stream, and various consumers (Box for nutrition, Adopter for content, Hermes for scheduling) read and react. If one agent goes down, messages wait in the stream until it returns. If we want a new agent listening to those events — we add it to a consumer group in 30 seconds. Since moving to Redis Streams (two years ago, Q2 2024), my system has been much more stable: each agent works independently, and the 'who listens to what' logic is managed in Redis instead of through direct API calls.",
  badgeText: "2026 · Message Bus · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/redis-streams",
  stats: [
    { label: "consumer groups I run", value: "8" },
    { label: "messages / day", value: "~50k" },
    { label: "latency", value: "<5ms" },
    { label: "RAM", value: "~100 MB" },
  ],
  paradigmTitle: "From direct API calls to event-driven",
  paradigmSub:
    "When Kami gets a message, it doesn't call Box. It pushes to a stream. Whoever's interested — reads.",
  paradigmShifts: [
    {
      before: "Kami → HTTP POST → Box (if Box is up)",
      after: "Kami → XADD → stream → Box when free",
      icon: Network,
    },
    {
      before: "Adding a new agent = updating every caller",
      after: "Add a consumer to the group, no changes anywhere else",
      icon: GitBranch,
    },
    {
      before: "Agent crashes = lost messages",
      after: "Stream holds them until ack",
      icon: Database,
    },
    {
      before: "Kafka = 4 GB RAM + Zookeeper + maintenance",
      after: "Redis = 100 MB, one command",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "Anyone building a microservice network",
      description:
        "Whenever you have 'A needs to notify B when something happens', Redis Streams is the simplest answer.",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Teams that grew beyond direct API calls",
      description:
        "Once you have 5+ services that need to talk to each other, direct HTTP becomes chaos. A message bus solves it.",
      icon: Network,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Anyone who needs a simple job queue",
      description:
        "Instead of BullMQ/Sidekiq, Redis Streams can be a lightweight gantry — XADD = enqueue, consumer group = workers.",
      icon: Activity,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone reluctant to jump to Kafka",
      description:
        "Kafka is great for billions of messages. But for most needs, Redis Streams does the same job at 1% of the complexity.",
      icon: Server,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "basics", label: "XADD/XREAD" },
    { id: "consumer-groups", label: "Consumer groups" },
    { id: "patterns", label: "Patterns" },
    { id: "production", label: "Production" },
    { id: "alternatives", label: "Alternatives" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "What is Redis Streams: append-only log",
      subtitle: "Like Kafka, but in Redis without Zookeeper",
      description:
        "A Redis Stream is an 'append-only log' data structure — a list of messages you can only append to the end, never edit in the middle. Each message gets a unique ID (millisecond timestamp + sequence), you can read a range of messages, and you can 'follow' (XREAD) new appends in real time. Conceptually it resembles a Kafka topic, but it is much simpler to operate: Redis itself is a single process, no Zookeeper, no partitions, no broker cluster. You just run Redis and you have Streams.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of a stream like a chain of messages in a group chat: every message gets pinned at the end, and you can't edit old ones. But unlike WhatsApp, here every message gets a sequence number, you can search by range, and you can 'prefer' to read only new messages you haven't seen.",
      content: [
        "Stream — a single value in Redis. Identified by a regular key. For example `kami:incoming-messages`",
        "Entry (message) — every message in the stream. Gets an ID of `<timestamp>-<sequence>` (e.g. `1730000000000-0`)",
        "Fields — every message is a collection of key-value pairs. Fully flexible — any structure works",
        "XADD — adds a new message. `XADD stream * key1 value1 key2 value2` — the `*` means 'give me an automatic ID'",
        "XREAD — read. Either 'from ID X onwards' or 'new messages only' (`$`)",
        "XRANGE / XREVRANGE — range read. Like pagination over historical streams",
        "Streams aren't auto-deleted — you have to manage message age (XTRIM, MAXLEN)",
      ],
      tips: [
        "Redis 7+ is recommended — Streams have been significantly improved. Version 6 and below isn't recommended",
        "Persistence — make sure you have AOF or RDB persistence. Otherwise if Redis crashes, the streams are gone. I use AOF every-second",
      ],
      codeExample: {
        label: "Basic ops in redis-cli",
        code: "# Add a message\n127.0.0.1:6379> XADD agent:tasks * type 'whatsapp_msg' from 'kami' user '+972...'\n'1730000000000-0'\n\n# Read the latest messages\n127.0.0.1:6379> XREAD COUNT 10 STREAMS agent:tasks 0\n1) 1) 'agent:tasks'\n   2) 1) 1) '1730000000000-0'\n         2) 1) 'type'\n            2) 'whatsapp_msg'\n            3) 'from'\n            4) 'kami'\n\n# Blocking read of new messages\n127.0.0.1:6379> XREAD BLOCK 5000 STREAMS agent:tasks $\n# Will wait up to 5 seconds for a new message\n\n# Trim to the last 1000 messages (save space)\n127.0.0.1:6379> XTRIM agent:tasks MAXLEN ~ 1000",
      },
    },
    {
      id: "basics",
      icon: Terminal,
      title: "XADD and XREAD: the two basic operations",
      subtitle: "All you need for simple pub/sub",
      description:
        "If you only want simple pub/sub — agent A pushes, agent B listens — you only need XADD and XREAD. No consumer groups, no acknowledgments. The Python code below shows both sides.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "XADD — sends a message. The pushing agent doesn't need to know who's reading. All messages are kept until you XTRIM",
        "XREAD ID `$` — read 'only new messages from this moment'. Useful for a fresh consumer",
        "XREAD BLOCK 0 — wait forever for a message to arrive. No polling — Redis notifies as soon as something appears",
        "XREAD COUNT N — at most N messages per read. Useful for batch processing",
        "What's the difference from classic Redis Pub/Sub? — Pub/Sub fires and forgets. If the consumer isn't connected at that moment — they miss it. Streams persist until you delete",
        "MULTI/EXEC — if you push several messages together, wrap in MULTI/EXEC for atomicity. Or XADD in a loop in a pipeline",
      ],
      tips: [
        "Python with `redis-py` provides a comfortable API. `redis.xadd()` and `redis.xread()` handle the ID juggling automatically",
        "On Node.js — `ioredis` is the standard library. For Go there's `go-redis`",
      ],
      codeExample: {
        label: "publisher + subscriber in Python",
        code: "# publisher.py — Kami agent pushing messages\nimport redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\ndef on_whatsapp_message(user, text):\n    msg_id = r.xadd('agent:incoming', {\n        'source': 'whatsapp',\n        'user': user,\n        'text': text,\n        'received_at': str(int(time.time())),\n    })\n    print(f'Pushed message {msg_id}')\n\n# ====================================\n\n# subscriber.py — Box agent listening\nimport redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\nlast_id = '$'  # Start from new messages only\nwhile True:\n    # blocking read, up to 5 seconds\n    response = r.xread({'agent:incoming': last_id}, count=10, block=5000)\n    if not response:\n        continue\n    for stream_name, messages in response:\n        for msg_id, fields in messages:\n            print(f'Got: {fields}')\n            handle_message(fields)\n            last_id = msg_id  # update for next iteration",
      },
    },
    {
      id: "consumer-groups",
      icon: Users,
      title: "Consumer Groups: when multiple consumers share work",
      subtitle: "Each message is handled by exactly one consumer in the group",
      description:
        "Consumer groups are the feature that makes Redis Streams a serious message broker. Instead of every consumer seeing every message (like pub/sub), consumers in the same group share the work — each message reaches exactly one consumer in the group. For redundancy, you spin up multiple consumers; if one falls over, the rest keep going. Plus there's the acknowledgment mechanism: a consumer says 'I handled message X', and Redis remembers. If the consumer dies before acking, the message is re-claimed by another consumer.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "XGROUP CREATE — creates a consumer group. `XGROUP CREATE agent:tasks workers $` creates a 'workers' group starting from new messages",
        "XREADGROUP — read as a member of a group. `XREADGROUP GROUP workers consumer-1 COUNT 10 BLOCK 5000 STREAMS agent:tasks >` — receives un-handled messages",
        "XACK — acknowledge handling. `XACK agent:tasks workers <message-id>` tells Redis 'remove it from the pending list'",
        "XPENDING — shows messages still awaiting ack. Useful to spot a stuck consumer",
        "XCLAIM — take a message from another consumer (if it's stuck). 'If message X hasn't been handled in 30 seconds, I'll take it'",
        "XAUTOCLAIM (Redis 6.2+) — automatically take messages that timed out. Avoids manual claims",
        "Consumer count in a group is unlimited — you can scale horizontally without configuration. Balancing is automatic",
      ],
      tips: [
        "Always XACK only after work has succeeded. If you crash mid-way, the message will be re-claimed — and that's what you want",
        "For 'exactly once' semantics (each message handled exactly once) — store msg_id in the DB along with the work result. If you receive again, check whether you already have a result",
      ],
      codeExample: {
        label: "consumer group in Python (multi-process worker)",
        code: "import redis\nimport socket\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\nSTREAM = 'agent:tasks'\nGROUP = 'workers'\nCONSUMER = f'worker-{socket.gethostname()}-{os.getpid()}'\n\n# Create the group (safe if already exists)\ntry:\n    r.xgroup_create(STREAM, GROUP, id='0', mkstream=True)\nexcept redis.ResponseError as e:\n    if 'BUSYGROUP' not in str(e):\n        raise\n\nwhile True:\n    # Get new messages (>) or my pending (0-0)\n    response = r.xreadgroup(\n        GROUP, CONSUMER, {STREAM: '>'},\n        count=10, block=5000\n    )\n    if not response:\n        # Periodically check for old pending from others\n        claimed = r.xautoclaim(STREAM, GROUP, CONSUMER,\n                                min_idle_time=30000, count=10)\n        # ... handle claimed\n        continue\n\n    for stream_name, messages in response:\n        for msg_id, fields in messages:\n            try:\n                process_message(fields)\n                r.xack(STREAM, GROUP, msg_id)  # only after success!\n            except Exception as e:\n                logger.error(f'Failed {msg_id}: {e}')\n                # Don't ack — it'll be re-claimed",
      },
    },
    {
      id: "patterns",
      icon: GitBranch,
      title: "Patterns: fan-out, work-queue, event-sourcing",
      subtitle: "The common Streams use cases",
      description:
        "Once you know the basics, there are several common patterns that help architect things.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Fan-out — one message handled by multiple different consumers. Each with its own group. For example: a WhatsApp message goes to Box (nutrition), Adopter (content), and the Dashboard (logging). Three groups, three independent reads of the same stream",
        "Work queue — messages handled exactly once. Single consumer group with multiple consumers. For example: image-processing tasks, 5 workers sharing the load",
        "Event sourcing — store every event in a stream and rebuild current state by reading history from the start. Useful for full audit trails",
        "Saga / orchestration — a complex workflow flowing through services. Each step writes to a stream, the next listens",
        "Dead letter queue — messages that failed N times move to another stream. Handled by humans or manually",
        "Backpressure — if a consumer can't keep up, the stream grows. Track with XLEN, trim with XTRIM MAXLEN",
        "Sharding — if a single stream is too large, split into several (`agent:tasks:shard-0`, `agent:tasks:shard-1`) by user_id hash",
      ],
      tips: [
        "Fan-out + work-queue together = the typical agent network architecture. Every agent pushes to events, every agent listens with its own group",
        "If messages are large (>1 MB), don't store them in the stream — store in DB/S3 and pass only the ID",
      ],
    },
    {
      id: "production",
      icon: Activity,
      title: "Production: memory, persistence, monitoring",
      subtitle: "What to know before release",
      description:
        "Redis in production needs three things: persistence (so you don't lose data when Redis crashes), size management (so the stream doesn't eat all memory), and monitoring.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Persistence — two types: AOF (append-only file, safer) and RDB (snapshot every N minutes). Recommended default: AOF every-second",
        "MAXLEN — always add `XADD ... MAXLEN ~ 10000` to auto-trim. The `~` means 'approximately', more efficient",
        "MINID — trim by age instead of count. `XADD ... MINID ~ 1730000000000` deletes anything older than that timestamp",
        "Monitoring: XLEN — message count. If it grows nonstop, you're producing faster than the consumer can handle",
        "Monitoring: XPENDING — un-acked messages. If the count grows, a consumer is stuck",
        "redis-cli --bigkeys — shows the largest streams. Useful to spot what's taking space",
        "INFO memory — shows RAM usage. If you're approaching the limit, trim streams or add RAM",
        "Redis Sentinel — high availability. Required for serious production",
        "Redis Cluster — horizontal sharding. For most needs, single instance is enough",
      ],
      tips: [
        "My Redis runs in Docker with volume persistence and AOF. The reveal: 100 MB RAM serves all 13 agents, latency under 5ms",
        "Always make sure you have backups of the RDB/AOF. If Redis crashes mid-operation, you may lose the last second of data",
      ],
      codeExample: {
        label: "Production docker-compose with persistence",
        code: "services:\n  redis:\n    image: redis:7-alpine\n    restart: unless-stopped\n    command: >\n      redis-server\n      --appendonly yes\n      --appendfsync everysec\n      --maxmemory 512mb\n      --maxmemory-policy noeviction\n    volumes:\n      - redis_data:/data\n    ports:\n      - '127.0.0.1:6379:6379'\n    healthcheck:\n      test: ['CMD', 'redis-cli', 'ping']\n      interval: 10s\n\nvolumes:\n  redis_data:",
      },
    },
    {
      id: "alternatives",
      icon: Network,
      title: "Alternatives: Kafka, RabbitMQ, NATS",
      subtitle: "When to pick which",
      description:
        "Redis Streams is lightweight, but not for every case. Here's a comparison to other solutions.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      content: [
        "Apache Kafka — if you have billions of messages per day, or need months of retention. Requires Java, Zookeeper, partitions, brokers — significant overhead. For most cases it's overkill",
        "RabbitMQ — the traditional message broker. More routing options than Redis (exchanges, bindings). Less popular in 2026, but still solid",
        "NATS — Streams' conceptual competitor. Open source, in Go, very fast. Their JetStream is similar to Streams with some nuance differences",
        "AWS SQS — managed queue. No server to maintain, pay per use. But vendor lock to AWS, and higher latency than local Redis",
        "Cloudflare Queues — new (2024-2025). Free for small workloads, excellent for Cloudflare Workers. But less mature",
        "Postgres LISTEN/NOTIFY — if you already have Postgres, it's a simple pub/sub option. No persistence and no consumer groups, but zero added dependency",
        "Comparison: for personal/small agent network → Redis Streams. For enterprise with compliance needs → Kafka or RabbitMQ. For full-on serverless → SQS or Cloudflare Queues",
      ],
      tips: [
        "I picked Redis Streams because: I already had Redis for cache, RAM is small, and the API is simple. Kafka would have been overkill for a 13-agent network handling ~50k messages/day",
        "Don't jump to Kafka just because 'it's the standard'. Most products never reach a scale that justifies the complexity. Start simple and only level up when you actually need to",
      ],
    },
  ],
  resources: [
    {
      title: "Redis Streams Documentation",
      description: "The official docs — comprehensive, with examples for every operation",
      href: "https://redis.io/docs/data-types/streams/",
      icon: BookOpen,
    },
    {
      title: "Redis Streams Tutorial",
      description: "The official intro guide — easy to follow",
      href: "https://redis.io/docs/data-types/streams-tutorial/",
      icon: BookOpen,
    },
    {
      title: "redis-py",
      description: "The official Python client — full Streams support",
      href: "https://github.com/redis/redis-py",
      icon: Github,
    },
    {
      title: "ioredis",
      description: "The standard Node.js library",
      href: "https://github.com/luin/ioredis",
      icon: Github,
    },
    {
      title: "Redis Insight",
      description: "Official GUI — shows streams visually",
      href: "https://redis.com/redis-enterprise/redis-insight/",
      icon: ExternalLink,
    },
    {
      title: "The Docker guide",
      description: "Run Redis in a container with persistence",
      href: "/en/guide/docker",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need a message bus architecture?",
  ctaSub:
    "I have 13 agents coordinated through Redis Streams without Kafka, without overhead. I can help you design yours.",
  primaryCta: {
    label: "Redis Streams Quick Start",
    href: "https://redis.io/docs/data-types/streams-tutorial/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a message bus design session",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "On my Hetzner, Redis Streams connects 13 agents handling ~50k messages a day. RAM use: ~100 MB. Average latency: under 5ms. I moved to Streams two years ago after deciding Kafka had exceeded my tolerance for ops complexity. The migration was a success — the system has been much more stable and easier to maintain ever since.",
};
