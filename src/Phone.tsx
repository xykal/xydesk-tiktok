import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Scene } from './script';
import { Screen } from './Screen';

type Props = { visual: Scene['visual']; sceneFrames: number };

// Bingkai perangkat: HP putih (seperti mockup web) atau laptop untuk adegan desktop.
export const Phone = ({ visual, sceneFrames }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 13, stiffness: 200, mass: 0.6 } });
  const float = Math.sin(frame / 28) * 5;
  const tilt = Math.sin(frame / 40) * 1.2;
  const isDesktop = visual === 'desktop';

  if (isDesktop) {
    return (
      <div style={{ position: 'absolute', left: 30, top: 330 + float, width: 660, transform: `scale(${interpolate(enter, [0, 1], [0.6, 1])})`, opacity: enter }}>
        <div style={{ borderRadius: 22, background: '#1f2937', padding: 12, boxShadow: '0 40px 90px rgba(0,0,0,0.55)' }}>
          <div style={{ position: 'relative', height: 398, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
            <Screen visual={visual} sceneFrames={sceneFrames} />
          </div>
        </div>
        <div style={{ height: 16, margin: '0 -20px', borderRadius: '0 0 20px 20px', background: 'linear-gradient(#374151,#111827)' }} />
      </div>
    );
  }

  const width = 360;
  const height = 740;
  return (
    <div
      style={{
        position: 'absolute',
        left: (720 - width) / 2,
        top: 170 + float,
        width,
        height,
        transform: `scale(${interpolate(enter, [0, 1], [0.7, 1])}) rotate(${tilt}deg)`,
        opacity: enter,
        borderRadius: 54,
        background: 'linear-gradient(160deg, #f8fafc, #cbd5e1)',
        boxShadow: '0 40px 90px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.7)',
        padding: 12,
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: 44, overflow: 'hidden', background: '#f6f5fb', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 12, left: '50%', width: 110, height: 30, borderRadius: 20, background: '#000', transform: 'translateX(-50%)', zIndex: 5 }} />
        <Screen visual={visual} sceneFrames={sceneFrames} />
      </div>
    </div>
  );
};
