import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { ReactNode } from 'react';
import { SCENES } from './script';
import { Screen } from './Screen';
import type { Timing } from './Video';

export const PHONE = { w: 300, h: 620, top: 130, pad: 10, radius: 48 };
export const SCREEN = { w: PHONE.w - PHONE.pad * 2, h: PHONE.h - PHONE.pad * 2 };

const Fade = ({ children, frames }: { children: ReactNode; frames: number }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12, frames - 10, frames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// Satu bingkai HP yang tetap di layar sepanjang video; isi layar crossfade antar adegan.
// Saat adegan desktop, HP berputar ke landscape seperti aplikasi aslinya.
export const Device = ({ timing }: { timing: Timing[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });
  const float = Math.sin(frame / 34) * 4;
  const desktopIdx = SCENES.findIndex((s) => s.visual === 'desktop');
  const d = timing[desktopIdx];
  const rotIn = spring({ frame: frame - d.from, fps, config: { damping: 20, stiffness: 90 } });
  const rotOut = spring({ frame: frame - (d.from + d.frames - 20), fps, config: { damping: 20, stiffness: 90 } });
  const rotate = -90 * (rotIn - rotOut);
  const scale = interpolate(enter, [0, 1], [0.9, 1]) * (1 + 0.12 * (rotIn - rotOut));

  return (
    <div
      style={{
        position: 'absolute',
        left: (720 - PHONE.w) / 2,
        top: PHONE.top + float,
        width: PHONE.w,
        height: PHONE.h,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity: enter,
        borderRadius: PHONE.radius,
        background: 'linear-gradient(160deg, #2b2735, #0f0d16)',
        boxShadow: '0 30px 70px rgba(60,30,120,0.28), inset 0 0 0 2px rgba(255,255,255,0.08)',
        padding: PHONE.pad,
      }}
    >
      <div style={{ width: '100%', height: '100%', borderRadius: PHONE.radius - PHONE.pad, overflow: 'hidden', background: '#f6f5fb', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, left: '50%', width: 92, height: 26, borderRadius: 20, background: '#000', transform: 'translateX(-50%)', zIndex: 5 }} />
        {SCENES.map((scene, i) => (
          <Sequence key={scene.vo} from={timing[i].from} durationInFrames={timing[i].frames} name={`screen ${scene.visual}`}>
            <Fade frames={timing[i].frames}>
              <Screen visual={scene.visual} sceneFrames={timing[i].voFrames} />
            </Fade>
          </Sequence>
        ))}
      </div>
    </div>
  );
};
