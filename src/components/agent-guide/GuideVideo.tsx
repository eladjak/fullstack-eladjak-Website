"use client";

interface GuideVideoProps {
  src: string;
  title: string;
  poster?: string;
}

export function GuideVideo({ src, title, poster }: GuideVideoProps) {
  return (
    <section className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-black/30 shadow-xl">
      <div className="aspect-video w-full">
        <video
          className="w-full h-full"
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          aria-label={`וידאו הסבר על ${title}`}
        >
          הדפדפן שלך לא תומך בנגן וידאו.
        </video>
      </div>
    </section>
  );
}
