import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { StickerCue } from './script';

// Stiker meme apa adanya (tanpa bingkai/rounded): pop-in cepat, goyang, keluar cepat.
export const Sticker = ({ cue }: { cue: StickerCue }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const size = cue.size ?? 220;
  const enter = spring({ frame, fps, config: { damping: 8, stiffness: 260, mass: 0.5 } });
  const life = Math.min(durationInFrames, Math.round(2.2 * fps));
  const exit = interpolate(frame, [life - 8, life], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const wobble = Math.sin(frame / 5) * 3 * (1 - frame / life);
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
        transform: `scale(${enter * exit}) rotate(${(cue.rot ?? 0) + wobble}deg)`,
        opacity: exit,
        filter: 'drop-shadow(0 12px 22px rgba(0,0,0,0.45))',
      }}
    />
  );
};
