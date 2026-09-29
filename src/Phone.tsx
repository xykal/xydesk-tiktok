import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Scene } from './script';
import { Screen } from './Screen';

type Props = { visual: Scene['visual']; sceneFrames: number };

// Bingkai HP di tengah; isi layar per adegan ada di Screen.tsx.
export const Phone = ({ visual, sceneFrames }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 140, mass: 0.8 } });
  const tilt = Math.sin(frame / 40) * 1.6;
  const float = Math.sin(frame / 28) * 6;
  const isDesktop = visual === 'desktop';
  const rotate = isDesktop ? interpolate(spring({ frame: frame - 10, fps, config: { damping: 15 } }), [0, 1], [0, -90]) : tilt;
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
        transform: `scale(${interpolate(enter, [0, 1], [0.7, isDesktop ? 0.92 : 1])}) rotate(${rotate}deg)`,
        opacity: enter,
        borderRadius: 54,
        background: 'linear-gradient(160deg, #2a2438, #100b1c)',
        boxShadow: '0 40px 90px rgba(0,0,0,0.55), inset 0 0 0 3px rgba(255,255,255,0.12)',
        padding: 12,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 44,
          overflow: 'hidden',
          background: '#0f0a1f',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            width: 110,
            height: 30,
            borderRadius: 20,
            background: '#000',
            transform: 'translateX(-50%)',
            zIndex: 5,
          }}
        />
        <Screen visual={visual} sceneFrames={sceneFrames} />
      </div>
      {visual === 'logo' && (
        <Img
          src={staticFile('logo.png')}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 170,
            height: 170,
            transform: `translate(-50%, -50%) scale(${spring({ frame: frame - 8, fps, config: { damping: 8, stiffness: 160 } })}) rotate(${Math.sin(frame / 12) * 5}deg)`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
            borderRadius: 40,
          }}
        />
      )}
    </div>
  );
};
