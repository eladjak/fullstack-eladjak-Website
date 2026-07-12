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

export const redisStreamsGuide: AgentGuideData = {
  slug: "redis-streams",
  agentName: "Redis Streams",
  agentNameHe: "Redis Streams — לב התקשורת בין סוכנים",
  category: "infra",
  brandIconSlug: "redis",
  brandIconColor: "DC382D",
  heroBgImage: "/images/guides/guide-redis-streams-hero.jpg",
  tagline: "message bus קל-משקל שמחבר רשת סוכנים שלמה בלי Kafka, RabbitMQ או SQS",
  heroDescription:
    "Redis Streams היא תכונה של Redis (החל מגרסה 5.0, 2018) שהופכת אותו ל-message broker קליל מאוד — תקשורת אסינכרונית בין שירותים, בלי הסיבוך של Kafka או RabbitMQ. Redis עצמו הוא מאגר key-value בזיכרון שרץ במאות אלפי VPS ברחבי העולם — מהיר במיוחד (פעולות במיקרו-שניות), פשוט להגדרה, וצורך מינימום משאבים. Streams הוסיפו לו את היכולת להחזיק תורים מתמשכים של הודעות עם consumer groups (קבוצות צרכנים שמתחלקות בעבודה), acknowledgments (אישור שהודעה טופלה), ו-replay (יכולת לחזור להודעות ישנות). אצלי (אלעד) Redis Streams הוא 'העצב המרכזי' של רשת הסוכנים שלי על שרת ה-Contabo: כשמסר WhatsApp מגיע ל-Kami, הוא לא מטפל בו לבד — הוא דוחף הודעה ל-stream, וצרכנים שונים (Box לבריאות, Adopter לתוכן, Hermes למשימות) קוראים ומגיבים. אם סוכן אחד נופל, ההודעות מחכות ב-stream עד שהוא חוזר. אם רוצים סוכן חדש שמאזין לאותם events — מוסיפים אותו ל-consumer group ב-30 שניות. מאז שהרשת עברה ל-Redis Streams, המערכת שלי יציבה הרבה יותר: כל סוכן עובד לבד, וההיגיון 'מי מקשיב למה' מנוהל ב-Redis במקום ב-API calls ישירים.",
  badgeText: "2026 · Message Bus · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/redis-streams",
  stats: [
    { label: "consumer groups אצלי", value: "17" },
    { label: "הודעות / יום", value: "~5k" },
    { label: "latency", value: "<5ms" },
    { label: "RAM", value: "~10MB" },
  ],
  paradigmTitle: "מ-API calls ישירים ל-event-driven",
  paradigmSub:
    "כש-Kami מקבל הודעה, הוא לא מתקשר ל-Box. הוא דוחף ל-stream. כל מי שמעוניין — קורא.",
  paradigmShifts: [
    {
      before: "Kami → HTTP POST → Box (אם Box למעלה)",
      after: "Kami → XADD → stream → Box כשהוא פנוי",
      icon: Network,
    },
    {
      before: "להוסיף סוכן חדש = לעדכן את כל מי שצריך לקרוא לו",
      after: "להוסיף consumer ל-group, אפס שינויים אצל אחרים",
      icon: GitBranch,
    },
    {
      before: "סוכן נופל = הודעות אבודות",
      after: "Stream שומר עד אישור (ack)",
      icon: Database,
    },
    {
      before: "Kafka = 4GB RAM + Zookeeper + תחזוקה",
      after: "Redis = 100MB, פקודה אחת",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "מי שבונה רשת מיקרו-שירותים",
      description:
        "בכל פעם שיש לכם 'A צריך להודיע ל-B כשמשהו קורה', Redis Streams הוא הפתרון הפשוט ביותר.",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "צוותים שגדלו מעבר ל-API calls",
      description:
        "ברגע שיש 5+ שירותים שצריכים לדבר זה עם זה, HTTP ישיר הופך לכאוס. message bus פותר את זה.",
      icon: Network,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מי שצריך job queue פשוט",
      description:
        "במקום BullMQ/Sidekiq, Redis Streams יכול לשמש כתור קל — XADD = enqueue, consumer group = workers.",
      icon: Activity,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מי שלא רוצה לקפוץ ל-Kafka",
      description:
        "Kafka נהדר לעומסים של מיליארדי הודעות, אבל לרוב הצרכים, Redis Streams עושה את אותה עבודה באחוז אחד מהסיבוך.",
      icon: Server,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "basics", label: "XADD/XREAD" },
    { id: "consumer-groups", label: "consumer groups" },
    { id: "patterns", label: "patterns" },
    { id: "production", label: "production" },
    { id: "alternatives", label: "אלטרנטיבות" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "מה זה Redis Streams: append-only log",
      subtitle: "כמו Kafka, רק ב-Redis ובלי Zookeeper",
      description:
        "Redis Stream הוא מבנה נתונים מסוג 'append-only log' — רשימה של הודעות שאפשר רק להוסיף לסוף, אף פעם לא לערוך באמצע. כל הודעה מקבלת ID ייחודי (timestamp במילישנייה + sequence), אפשר לקרוא טווח של הודעות, ואפשר 'לעקוב' (XREAD) על הוספות חדשות בזמן אמת. זה דומה במהותו ל-Kafka topic, אבל הרבה יותר פשוט להפעיל: Redis עצמו הוא תהליך אחד, אין Zookeeper, אין partitions, אין broker cluster. אתם פשוט מריצים Redis ויש לכם Streams.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על stream כמו על שרשרת הודעות בקבוצה: כל הודעה מתווספת לסוף, ואי אפשר לערוך הודעות ישנות. אבל בניגוד ל-WhatsApp, כאן כל הודעה מקבלת מספר רץ, אפשר לחפש לפי טווח, ואפשר לבחור לקרוא רק את ההודעות החדשות שעוד לא ראיתם.",
      content: [
        "Stream — מבנה נתונים בודד ב-Redis. מזוהה לפי מפתח רגיל. למשל `kami:incoming-messages`",
        "Entry (הודעה) — כל הודעה ב-stream. מקבלת ID בפורמט `<timestamp>-<sequence>` (למשל `1730000000000-0`)",
        "Fields — כל הודעה היא אוסף key-value. גמיש לחלוטין — אפשר להכניס כל מבנה",
        "XADD — הוספת הודעה חדשה. `XADD stream * key1 value1 key2 value2` — ה-`*` אומר 'תן לי ID אוטומטי'",
        "XREAD — קריאה. אפשר 'מ-ID X ואילך' או 'הודעות חדשות בלבד' (`$`)",
        "XRANGE / XREVRANGE — קריאת טווח. כמו pagination על stream היסטורי",
        "Streams לא נמחקים אוטומטית — צריך לטפל בגיל ההודעות (XTRIM, MAXLEN)",
      ],
      tips: [
        "מומלץ Redis 7+ — Streams עברו שיפור משמעותי. גרסה 6 ומטה לא מומלצת",
        "Persistence — ודאו שיש AOF או RDB persistence. אחרת, אם Redis קורס, ה-Streams נעלמים. אצלי AOF every-second",
      ],
      codeExample: {
        label: "פעולות בסיסיות ב-redis-cli",
        code: "# הוספת הודעה\n127.0.0.1:6379> XADD agent:tasks * type 'whatsapp_msg' from 'kami' user '+972...'\n'1730000000000-0'\n\n# קריאה של ההודעות האחרונות\n127.0.0.1:6379> XREAD COUNT 10 STREAMS agent:tasks 0\n1) 1) 'agent:tasks'\n   2) 1) 1) '1730000000000-0'\n         2) 1) 'type'\n            2) 'whatsapp_msg'\n            3) 'from'\n            4) 'kami'\n\n# קריאה blocking של הודעות חדשות\n127.0.0.1:6379> XREAD BLOCK 5000 STREAMS agent:tasks $\n# ימתין עד 5 שניות להודעה חדשה\n\n# חיתוך ל-1000 הודעות אחרונות (לחסוך מקום)\n127.0.0.1:6379> XTRIM agent:tasks MAXLEN ~ 1000",
      },
    },
    {
      id: "basics",
      icon: Terminal,
      title: "XADD ו-XREAD: שתי הפעולות הבסיסיות",
      subtitle: "כל מה שצריך ל-pub/sub פשוט",
      description:
        "אם אתם רק רוצים pub/sub פשוט — סוכן A דוחף, סוכן B מקשיב — אתם צריכים רק את XADD ו-XREAD. בלי consumer groups, בלי acknowledgments. הקוד למטה הוא דוגמה ב-Python שמראה את שני הצדדים.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "כל המנגנון מסתכם בשתי פעולות, וזה כל היופי. אחת ששמה הודעה בתיבת הדואר (XADD), ואחת שבודקת אם הגיע משהו חדש (XREAD). זהו. אם סוכן אחד רוצה להגיד משהו לסוכן אחר — הראשון 'משאיר פתק' בלי לדעת מי יקרא אותו, והשני בא בקצב שלו ואוסף את הפתקים שעוד לא ראה. בלי שהשניים צריכים לרוץ באותו רגע, ובלי שאחד מחכה לשני. הקוד למטה מראה בדיוק את שני הצדדים.",
      content: [
        "XADD — שולח הודעה. הסוכן הדוחף לא צריך לדעת מי קורא. כל ההודעות נשמרות עד שתעשו XTRIM",
        "XREAD ID `$` — קריאה של 'הודעות חדשות בלבד מהרגע הזה'. שימושי ל-consumer חדש",
        "XREAD BLOCK 0 — חכה לנצח עד שמגיעה הודעה. בלי polling — Redis מודיע מיד כשיש משהו",
        "XREAD COUNT N — מקסימום N הודעות בכל קריאה. שימושי לעיבוד באצוות (batches)",
        "מה ההבדל ל-PubSub הקלאסי של Redis? — Pub/Sub זורק הודעה ושוכח. אם הצרכן לא מחובר באותו רגע — הוא מפסיד. Streams שומרים עד שתמחקו",
        "MULTI/EXEC — אם אתם דוחפים כמה הודעות יחד, עטפו ב-MULTI/EXEC לאטומיות. או XADD בלולאה ב-pipeline",
      ],
      tips: [
        "Python עם `redis-py` מספק API נוח. `redis.xadd()` ו-`redis.xread()` מטפלים בכל הסידור של ה-ID-ים אוטומטית",
        "אם אתם ב-Node.js — `ioredis` היא הספרייה הסטנדרטית. ל-Go יש `go-redis`",
      ],
      codeExample: {
        label: "publisher + subscriber ב-Python",
        code: "# publisher.py — סוכן Kami שדוחף הודעות\nimport redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\ndef on_whatsapp_message(user, text):\n    msg_id = r.xadd('agent:incoming', {\n        'source': 'whatsapp',\n        'user': user,\n        'text': text,\n        'received_at': str(int(time.time())),\n    })\n    print(f'Pushed message {msg_id}')\n\n# ====================================\n\n# subscriber.py — סוכן Box שמקשיב\nimport redis\nimport json\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\n\nlast_id = '$'  # התחל מההודעות החדשות בלבד\nwhile True:\n    # blocking read, עד 5 שניות\n    response = r.xread({'agent:incoming': last_id}, count=10, block=5000)\n    if not response:\n        continue\n    for stream_name, messages in response:\n        for msg_id, fields in messages:\n            print(f'Got: {fields}')\n            handle_message(fields)\n            last_id = msg_id  # עדכן לפעם הבאה",
      },
    },
    {
      id: "consumer-groups",
      icon: Users,
      title: "Consumer Groups: כשיש כמה צרכנים שמתחלקים בעבודה",
      subtitle: "כל הודעה מטופלת בדיוק על ידי consumer אחד בקבוצה",
      description:
        "Consumer groups הם הפיצ'ר שעושה את Redis Streams ל-message broker רציני. במקום שכל הצרכנים יראו את כל ההודעות (כמו pub/sub), צרכנים בתוך אותה group מתחלקים בעבודה — כל הודעה מגיעה ל-consumer אחד בלבד בקבוצה. אם רוצים יתירות, מקימים כמה consumers; אם אחד נופל, השאר ממשיכים. בנוסף, יש מנגנון acknowledgment: צרכן מאשר 'טיפלתי בהודעה X', ו-Redis זוכר. אם הצרכן נופל לפני שאישר, ההודעה תיתפס שוב על ידי צרכן אחר.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "דמיינו דלפק בבנק עם תור אחד וכמה פקידים. בלי ניהול, כל פקיד היה קורא לאותו לקוח — בלגן. עם consumer group, כל לקוח (הודעה) מטופל בדיוק על ידי פקיד אחד, ואם פקיד קם לשירותים באמצע — לקוח שלא טופל חוזר לתור ופקיד אחר לוקח אותו. זה בדיוק מה שהופך את Redis Streams ממנגנון 'תכריז לכולם' למנגנון רציני של חלוקת עבודה, עם אישור מסודר על כל משימה שהושלמה. בלי זה, שני workers היו עושים את אותה עבודה פעמיים.",
      content: [
        "XGROUP CREATE — יוצר consumer group. `XGROUP CREATE agent:tasks workers $` יוצר group בשם 'workers' שמתחיל מהודעות חדשות",
        "XREADGROUP — קריאה כחבר ב-group. `XREADGROUP GROUP workers consumer-1 COUNT 10 BLOCK 5000 STREAMS agent:tasks >` — מקבל הודעות לא-מטופלות",
        "XACK — אישור טיפול. `XACK agent:tasks workers <message-id>` אומר ל-Redis 'הסר אותה מה-pending list'",
        "XPENDING — מציג הודעות שעדיין מחכות לאישור. שימושי לזיהוי consumer שתקוע",
        "XCLAIM — לקיחת הודעה מ-consumer אחר (אם הוא תקוע). 'אם הודעה X לא טופלה ב-30 שניות, אני לוקח אותה'",
        "XAUTOCLAIM (Redis 6.2+) — לוקח אוטומטית הודעות שעבר זמן ולא טופלו. מונע קליעות ידניות",
        "מספר ה-consumers ב-group לא מוגבל — אפשר לסקלל אופקית בלי הגדרה. ההקבלה אוטומטית",
      ],
      tips: [
        "תמיד עשו XACK רק אחרי שהעבודה הושלמה בהצלחה. אם נפלתם באמצע, ה-message ייתפס שוב — וזה מה שאתם רוצים",
        "למימוש 'exactly once' (כל הודעה מטופלת בדיוק פעם אחת) — שמרו את msg_id ב-DB יחד עם תוצאת העבודה. אם אתם מקבלים שוב, בדקו אם יש לכם כבר תוצאה",
      ],
      codeExample: {
        label: "consumer group ב-Python (רב-process worker)",
        code: "import redis\nimport socket\n\nr = redis.Redis(host='localhost', port=6379, decode_responses=True)\nSTREAM = 'agent:tasks'\nGROUP = 'workers'\nCONSUMER = f'worker-{socket.gethostname()}-{os.getpid()}'\n\n# צור group (בטוח אם כבר קיים)\ntry:\n    r.xgroup_create(STREAM, GROUP, id='0', mkstream=True)\nexcept redis.ResponseError as e:\n    if 'BUSYGROUP' not in str(e):\n        raise\n\nwhile True:\n    # קבל הודעות חדשות (>) או הודעות pending שלי (0-0)\n    response = r.xreadgroup(\n        GROUP, CONSUMER, {STREAM: '>'},\n        count=10, block=5000\n    )\n    if not response:\n        # תקופתית, בדוק אם יש pending ישנים מאחרים\n        claimed = r.xautoclaim(STREAM, GROUP, CONSUMER,\n                                min_idle_time=30000, count=10)\n        # ... לטפל ב-claimed\n        continue\n\n    for stream_name, messages in response:\n        for msg_id, fields in messages:\n            try:\n                process_message(fields)\n                r.xack(STREAM, GROUP, msg_id)  # רק אחרי הצלחה!\n            except Exception as e:\n                logger.error(f'Failed {msg_id}: {e}')\n                # אל תעשה ack — תיתפס שוב",
      },
    },
    {
      id: "patterns",
      icon: GitBranch,
      title: "Patterns: fan-out, work-queue, event-sourcing",
      subtitle: "השימושים הנפוצים של Streams",
      description:
        "אחרי שמכירים את הבסיס, יש כמה patterns מקובלים שעוזרים לתכנן את הארכיטקטורה.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "Pattern זה פשוט מתכון מוכן — דרך ידועה לסדר את החלקים שכבר עובדת אצל הרבה אנשים, אז אתם לא צריכים להמציא אותה מחדש. למשל: 'fan-out' זה כמו רשימת תפוצה — הודעה אחת מגיעה לכמה גורמים בו-זמנית. 'work queue' זה כמו תור במשרד — הודעה אחת, ומי שפנוי לוקח אותה. אצלי (אלעד) שני המתכונים האלה ביחד הם בעצם כל עמוד השדרה של רשת הסוכנים: כל סוכן משאיר אירועים, וכל סוכן מקשיב לעצמו.",
      content: [
        "Fan-out — הודעה אחת מטופלת על ידי כמה צרכנים שונים. כל אחד עם group משלו. למשל: הודעת WhatsApp נשלחת ל-Box (תזונה), Adopter (תוכן) ול-Dashboard (לוג). שלוש groups, שלוש קריאות עצמאיות לאותו stream",
        "Work queue — הודעות מטופלות פעם אחת בלבד. consumer group יחיד עם כמה consumers. למשל: רשימת משימות עיבוד תמונות, 5 workers מתחלקים",
        "Event sourcing — שומרים כל אירוע ב-stream, ובונים state נוכחי על ידי קריאת ההיסטוריה מההתחלה. שימושי ל-audit trail מלא",
        "Saga / orchestration — workflow מורכב שעובר בין שירותים. כל שלב כותב ל-stream, השלב הבא מאזין",
        "Dead letter queue — הודעות שנכשלו N פעמים עוברות ל-stream אחר. עיבוד על ידי human או באופן ידני",
        "Backpressure — אם consumer לא מספיק לעבד, ה-stream גדל. אפשר לראות עם XLEN, ולחתוך עם XTRIM MAXLEN",
        "Sharding — אם stream אחד גדול מדי, חלקו אותו לכמה (`agent:tasks:shard-0`, `agent:tasks:shard-1`) לפי hash של user_id",
      ],
      tips: [
        "fan-out + work-queue יחד = הארכיטקטורה הטיפוסית של רשת סוכנים. כל סוכן דוחף ל-events stream, כל סוכן מקשיב לעצמו עם group משלו",
        "אם ההודעות גדולות (>1MB), אל תשמרו אותן ב-stream — שמרו ב-DB/S3 והעבירו רק את ה-ID",
      ],
    },
    {
      id: "production",
      icon: Activity,
      title: "Production: גודל זיכרון, persistence, ניטור",
      subtitle: "מה שצריך לדעת לפני release",
      description:
        "Redis בייצור דורש 3 דברים: persistence (שלא יאבד דאטה אם Redis קורס), ניהול גודל (שה-stream לא יבלע את כל הזיכרון), וניטור.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "Redis מחזיק את הכול בזיכרון, וזה מה שעושה אותו מהיר — אבל גם מה שמסוכן בו. זיכרון נמחק כשמכבים את המחשב, אז בלי הגדרה נכונה כל ההודעות נעלמות אם השרת קורס. שלושת הדברים בסעיף הזה הם הביטוח: שמירה לדיסק (שלא יאבד דאטה), הגבלת גודל (שה-stream לא יבלע את כל הזיכרון), וניטור (שתדעו שמשהו נתקע לפני שזה מתפוצץ). אצלי (אלעד) כל הרשת מסתדרת עם כ-10MB זיכרון בלבד בזכות ההגדרות האלה.",
      content: [
        "Persistence — שני סוגים: AOF (append-only file, יותר בטוח) ו-RDB (snapshot כל N דקות). מומלץ AOF every-second כברירת מחדל",
        "MAXLEN — תמיד הוסיפו `XADD ... MAXLEN ~ 10000` כדי לחתוך אוטומטית. ה-`~` אומר 'בערך', יעיל יותר",
        "MINID — חתוך לפי גיל במקום מספר. `XADD ... MINID ~ 1730000000000` ימחק כל מה שלפני הזמן הזה",
        "ניטור: XLEN — מספר ההודעות. אם זה גדל בלי הפסקה, אתם מייצרים מהר יותר ממה שהצרכן מסוגל",
        "ניטור: XPENDING — הודעות שלא אושרו. אם המספר גדל, יש consumer שתקוע",
        "redis-cli --bigkeys — מציג את ה-streams הגדולים ביותר. שימושי כדי לזהות מה תופס מקום",
        "INFO memory — מציג צריכת RAM. אם מתקרבים למקסימום, צריך לחתוך streams או להוסיף RAM",
        "Redis Sentinel — high-availability. לפרודקשן רציני, חייב",
        "Redis Cluster — להתפלגות אופקית. לרוב הצרכים, single instance מספיק",
      ],
      tips: [
        "אצלי Redis רץ ב-Docker עם volume persistence ו-AOF. השורה התחתונה: כ-10MB RAM משמשים את כל הרשת, latency פחות מ-5ms",
        "תמיד ודאו שיש backup של ה-RDB/AOF. אם Redis קורס באמצע פעולה, ייתכן אבדן דאטה של שנייה אחרונה",
      ],
      codeExample: {
        label: "production docker-compose עם persistence",
        code: "services:\n  redis:\n    image: redis:7-alpine\n    restart: unless-stopped\n    command: >\n      redis-server\n      --appendonly yes\n      --appendfsync everysec\n      --maxmemory 512mb\n      --maxmemory-policy noeviction\n    volumes:\n      - redis_data:/data\n    ports:\n      - '127.0.0.1:6379:6379'\n    healthcheck:\n      test: ['CMD', 'redis-cli', 'ping']\n      interval: 10s\n\nvolumes:\n  redis_data:",
      },
    },
    {
      id: "alternatives",
      icon: Network,
      title: "אלטרנטיבות: Kafka, RabbitMQ, NATS",
      subtitle: "מתי לבחור מה",
      description:
        "Redis Streams זה lightweight, אבל לא מתאים לכל מקרה. הנה השוואה לפתרונות אחרים.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "Redis Streams זה האופנוע: קל, זריז, מתניע מיד. אבל אם אתם צריכים להזיז משאית של סחורה, אופנוע לא יעזור — ואז נכנסות אלטרנטיבות כמו Kafka, שהן כבדות ומסובכות יותר אבל בנויות לעומסים ענקיים. הכלל שלי (אלעד) פשוט: תתחילו עם הכלי הקל, ותעברו לכבד רק כשאתם באמת מרגישים שהקל לא מספיק. רוב המוצרים בעולם לעולם לא מגיעים לנפח שמצדיק את Kafka — ולשלם את מחיר הסיבוך שלו מראש זה בזבוז.",
      content: [
        "Apache Kafka — אם יש לכם מיליארדי הודעות ביום, או צריך retention של חודשים. דורש Java, Zookeeper, partitions, brokers — overhead משמעותי. לרוב המקרים זה overkill",
        "RabbitMQ — message broker מסורתי. יותר אופציות routing מ-Redis (exchanges, bindings). פחות פופולרי ב-2026, אבל עדיין יציב",
        "NATS — מתחרה ל-Redis Streams בקונספט. קוד פתוח, בשפת Go, מהיר מאוד. JetStream שלהם דומה ל-Streams עם הבדלי ניואנסים",
        "AWS SQS — managed queue. אין שרת לתחזק, משלמים לפי שימוש. אבל vendor lock ל-AWS, ויש latency גבוה יותר מ-Redis local",
        "Cloudflare Queues — חדש (2024-2025). חינמי לעומסים קטנים, מצוין ל-Cloudflare Workers. אבל פחות בוגר",
        "Postgres LISTEN/NOTIFY — אם כבר יש לכם Postgres, זו אופציית pub/sub פשוטה. בלי persistence ובלי consumer groups, אבל אפס תלות נוספת",
        "השוואה: לרשת סוכנים אישית/קטנה → Redis Streams. ל-enterprise עם דרישות compliance → Kafka או RabbitMQ. ל-serverless מלא → SQS או Cloudflare Queues",
      ],
      tips: [
        "אצלי בחרתי Redis Streams כי: כבר היה לי Redis ל-cache, צריכת RAM קטנה, ו-API פשוט. Kafka היה overkill לרשת סוכנים שמטפלת בכ-5,000 הודעות ביום",
        "אל תקפצו ל-Kafka רק 'כי זה הסטנדרט'. רוב המוצרים לא מגיעים ל-scale שמצדיק את הסיבוך. התחילו פשוט ועלו רק כשאתם באמת צריכים",
      ],
    },
  ],
  resources: [
    {
      title: "Redis Streams Documentation",
      description: "התיעוד הרשמי — מקיף, עם דוגמאות לכל פעולה",
      href: "https://redis.io/docs/latest/develop/data-types/streams/",
      icon: BookOpen,
    },
    {
      title: "Redis Streams Tutorial",
      description: "המדריך הרשמי למתחילים — קל להבנה",
      href: "https://redis.io/docs/latest/develop/data-types/streams-tutorial/",
      icon: BookOpen,
    },
    {
      title: "redis-py",
      description: "הספרייה הרשמית ל-Python — תומכת מלאה ב-Streams",
      href: "https://github.com/redis/redis-py",
      icon: Github,
    },
    {
      title: "ioredis",
      description: "הספרייה הסטנדרטית ל-Node.js",
      href: "https://github.com/luin/ioredis",
      icon: Github,
    },
    {
      title: "Redis Insight",
      description: "GUI רשמי — מציג streams בצורה ויזואלית",
      href: "https://redis.com/redis-enterprise/redis-insight/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Docker",
      description: "להריץ Redis בקונטיינר עם persistence",
      href: "/guide/docker",
      icon: BookOpen,
    },
  ],
  ctaTitle: "צריכים ארכיטקטורת message bus?",
  ctaSub:
    "אצלי רשת סוכנים שלמה מתואמת דרך Redis Streams בלי Kafka, בלי overhead. אני יכול לעזור לכם לתכנן את שלכם.",
  primaryCta: {
    label: "Redis Streams Quick Start",
    href: "https://redis.io/docs/latest/develop/data-types/streams-tutorial/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו message bus design",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אצלי על שרת ה-Contabo, Redis Streams מחבר את רשת הסוכנים עם 17 consumer groups שמטפלים בכ-5,000 הודעות ביום. צריכת RAM: כ-10MB. latency ממוצע: פחות מ-5ms. בחרתי ב-Streams כי Kafka היה סיבוך מיותר בקנה-מידה כזה — ומאז המערכת יציבה ופשוטה הרבה יותר לתחזוקה.",
};
