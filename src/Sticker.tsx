import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = { file: string; side: 'left' | 'right' };

// Stiker meme: pop-in dengan spring, goyang pelan, lalu memudar sebelum adegan habis.
export const Sticker = ({ file, side }: Props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 9, stiffness: 180, mass: 0.7 } });
  const wobble = Math.sin(frame / 7) * 4;
  const life = Math.min(durationInFrames, Math.round(2.6 * fps));
  const exit = interpolate(frame, [life - 12, life], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const baseRot = side === 'left' ? -8 : 8;
  return (
    <div
      style={{
        position: 'absolute',
        top: 150,
        [side]: 22,
        width: 230,
        height: 230,
        transform: `scale(${enter * exit}) rotate(${baseRot + wobble}deg)`,
        opacity: exit,
        filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.45))',
      }}
    >
      <Img
        src={staticFile(`stickers/${file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 22, border: '5px solid white' }}
      />
    </div>
  );
};
