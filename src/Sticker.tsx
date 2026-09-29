import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import type { StickerCue } from './script';

// Stiker mentah, masuk halus tanpa pantulan berlebihan, melayang naik pelan, keluar memudar.
export const Sticker = ({ cue }: { cue: StickerCue }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const size = cue.size ?? 170;
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 150, mass: 0.7 } });
  const life = Math.min(durationInFrames, Math.round(2.4 * fps));
  const exit = interpolate(frame, [life - 14, life], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });
  const drift = interpolate(frame, [0, life], [0, -18]);
  const sway = Math.sin(frame / 18) * 1.5;
  return (
    <Img
      src={staticFile(`stickers/${cue.file}`)}
      style={{
        position: 'absolute',
        left: cue.x,
        top: cue.y,
        width: size,
        height: size,
        objectFit: 'contain',
        transform: `translateY(${(1 - enter) * 24 + drift}px) scale(${0.85 + 0.15 * enter}) rotate(${(cue.rot ?? 0) + sway}deg)`,
        opacity: enter * exit,
        filter: 'drop-shadow(0 14px 24px rgba(60,30,120,0.22))',
      }}
    />
  );
};
