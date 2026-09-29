import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Lower-third tetap: logo XyDesk + tagline, plus "by XyVerse" di kanan.
export const Brand = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 160 } });
  return (
    <div
      style={{
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
        opacity: enter,
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }}>
        <Img src={staticFile('logo.png')} style={{ width: 36, height: 36, borderRadius: 9 }} />
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>XyDesk</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>remote.xydesk.my.id</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.9 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, opacity: 0.7 }}>BY</span>
        <Img src={staticFile('brand/xyverse-h-white.png')} style={{ height: 30 }} />
      </div>
    </div>
  );
};
