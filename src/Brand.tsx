import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Lower-third merek yang selalu ada: logo + nama + tagline kecil.
export const Brand = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 120 } });
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 64,
        display: 'flex',
        justifyContent: 'center',
        transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)`,
        opacity: enter,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 20px 10px 12px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.28)',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
      >
        <Img src={staticFile('logo.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.5 }}>XyDesk</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>remote.xydesk.my.id</div>
        </div>
      </div>
    </div>
  );
};
