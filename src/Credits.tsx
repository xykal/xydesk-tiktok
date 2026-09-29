import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const LINES = [
  ['Dikembangkan oleh', 'XyVerse Technology Global'],
  ['Founder', 'Kall'],
  ['Produk', 'XyDesk — remote desktop Indonesia'],
  ['Web', 'remote.xydesk.my.id'],
];

// Kartu kredit penutup: logo XyVerse besar, baris kredit masuk bergantian.
export const Credits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame, fps, config: { damping: 12, stiffness: 140 } });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', color: 'white', background: 'rgba(10,4,22,0.55)' }}>
      <Img src={staticFile('brand/xyverse-stacked-white.png')} style={{ width: 360, transform: `scale(${logo})`, opacity: logo }} />
      <div style={{ marginTop: 40, display: 'grid', gap: 14, textAlign: 'center' }}>
        {LINES.map(([k, v], i) => {
          const s = spring({ frame: frame - 14 - i * 9, fps, config: { damping: 14, stiffness: 180 } });
          return (
            <div key={k} style={{ transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`, opacity: s }}>
              <div style={{ fontSize: 14, letterSpacing: 3, fontWeight: 700, opacity: 0.6 }}>{k.toUpperCase()}</div>
              <div style={{ fontSize: i === 0 ? 30 : 24, fontWeight: 900, letterSpacing: -0.5, color: i === 1 ? '#fde047' : 'white' }}>{v}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 70, display: 'flex', alignItems: 'center', gap: 12, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
        <Img src={staticFile('logo.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
        <span style={{ fontSize: 22, fontWeight: 900 }}>Link download di bio</span>
      </div>
    </AbsoluteFill>
  );
};
