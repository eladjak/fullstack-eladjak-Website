import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Elad Ya'akobovitch - Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(167, 139, 250, 0.1)',
          }}
        />

        {/* Brand text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #A78BFA, #C4B5FD, #8B5CF6)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            EY.dev
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: '#FAFAFA',
              letterSpacing: '-0.5px',
            }}
          >
            Elad Ya&apos;akobovitch
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#D1D5DB',
              marginTop: '4px',
            }}
          >
            Full-Stack Developer | Next.js + AI Specialist
          </div>

          {/* Tech stack pills */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            {['Next.js', 'React', 'TypeScript', 'AI'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 20px',
                  borderRadius: '24px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#C4B5FD',
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: '#9CA3AF',
          }}
        >
          fullstack-eladjak.co.il
        </div>
      </div>
    ),
    { ...size }
  );
}
