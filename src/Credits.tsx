import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

const LINES: [string, string][] = [
  ['Dikembangkan oleh', 'XyVerse Technology Global'],
  ['Founder', 'Kall'],
  ['Web', 'remote.xydesk.my.id'],
];

// Kartu penutup bersih: logo XyVerse hitam di atas kartu putih, kredit masuk bergantian.
export const Credits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame, fps, config: { damping: 18, stiffness: 110 } });
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', color: '#14102a', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(20px)' }}>
      <div style={{ width: 560, padding: '48px 36px', borderRadius: 36, background: 'white', boxShadow: '0 30px 80px rgba(60,30,120,0.18)', textAlign: 'center', transform: `translateY(${(1 - card) * 40}px) scale(${0.96 + 0.04 * card})`, opacity: card }}>
        <Img src={staticFile('brand/xyverse-stacked-black.png')} style={{ width: 260 }} />
        <div style={{ marginTop: 28, display: 'grid', gap: 18 }}>
          {LINES.map(([k, v], i) => {
            const s = spring({ frame: frame - 16 - i * 10, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div key={k} style={{ transform: `translateY(${(1 - s) * 18}px)`, opacity: s }}>
                <div style={{ fontSize: 12, letterSpacing: 3, fontWeight: 800, color: '#9ca3af' }}>{k.toUpperCase()}</div>
                <div style={{ fontSize: i === 0 ? 26 : 24, fontWeight: 900, letterSpacing: -0.6, color: i === 1 ? '#7c3aed' : '#14102a' }}>{v}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, background: '#7c3aed', color: 'white', fontWeight: 900, fontSize: 18, opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          <Img src={staticFile('logo.png')} style={{ width: 26, height: 26, borderRadius: 7 }} />
          Download XyDesk — link di bio
        </div>
      </div>
    </AbsoluteFill>
  );
};
