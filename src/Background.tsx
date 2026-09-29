import { AbsoluteFill, useCurrentFrame } from 'remotion';

const BLOBS = [
  { x: 10, y: 12, size: 520, color: 'rgba(167,139,250,0.35)', speed: 0.5, phase: 0 },
  { x: 90, y: 30, size: 420, color: 'rgba(244,114,182,0.18)', speed: 0.4, phase: 2 },
  { x: 25, y: 88, size: 560, color: 'rgba(96,165,250,0.18)', speed: 0.35, phase: 4 },
  { x: 85, y: 80, size: 380, color: 'rgba(124,58,237,0.16)', speed: 0.6, phase: 1 },
];

// Latar terang seperti web XyDesk: putih ke lavender + blob lembut bergerak pelan.
export const Background = () => {
  const t = useCurrentFrame() / 60;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f5f1ff 60%, #ede7fe 100%)' }}>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `calc(${b.x}% - ${b.size / 2}px)`,
            top: `calc(${b.y}% - ${b.size / 2}px)`,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: b.color,
            filter: 'blur(70px)',
            transform: `translate(${Math.sin(t * b.speed + b.phase) * 36}px, ${Math.cos(t * b.speed * 0.8 + b.phase) * 28}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
