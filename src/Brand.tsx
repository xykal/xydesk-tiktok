import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Lower-third tetap, gaya bersih: kartu putih XyDesk di kiri, logo XyVerse di kanan.
export const Brand = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <div
      style={{
        position: 'absolute',
        left: 28,
        right: 28,
        bottom: 64,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
        opacity: enter,
        color: '#14102a',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(124,58,237,0.15)', boxShadow: '0 10px 30px rgba(60,30,120,0.10)' }}>
        <Img src={staticFile('logo.png')} style={{ width: 34, height: 34, borderRadius: 9 }} />
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 900, fontSize: 19, letterSpacing: -0.5 }}>XyDesk</div>
          <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>remote.xydesk.my.id</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#9ca3af' }}>BY</span>
        <Img src={staticFile('brand/xyverse-h-black.png')} style={{ height: 30 }} />
      </div>
    </div>
  );
};
