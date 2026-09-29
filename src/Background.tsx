import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const ORBS = [
  { x: 12, y: 18, size: 420, color: '#a78bfa', speed: 0.9, phase: 0 },
  { x: 80, y: 32, size: 360, color: '#f472b6', speed: 0.7, phase: 2 },
  { x: 30, y: 82, size: 480, color: '#60a5fa', speed: 0.6, phase: 4 },
  { x: 86, y: 78, size: 300, color: '#c4b5fd', speed: 1.1, phase: 1 },
];

// Latar: gradasi ungu XyDesk + bola cahaya yang melayang pelan + grid tipis.
export const Background = () => {
  const frame = useCurrentFrame();
  const t = frame / 60;
  const gridShift = (frame * 0.35) % 48;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(165deg, #1b0a33 0%, #3b1a7a 55%, #5b21b6 100%)' }}>
      {ORBS.map((o, i) => {
        const dx = Math.sin(t * o.speed + o.phase) * 40;
        const dy = Math.cos(t * o.speed * 0.8 + o.phase) * 30;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(${o.x}% - ${o.size / 2}px)`,
              top: `calc(${o.y}% - ${o.size / 2}px)`,
              width: o.size,
              height: o.size,
              borderRadius: '50%',
              background: o.color,
              opacity: 0.28,
              filter: 'blur(90px)',
              transform: `translate(${dx}px, ${dy}px)`,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: `0 ${gridShift}px`,
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.45), transparent 60%)',
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
