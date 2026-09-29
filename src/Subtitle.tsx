import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = { words: string[]; voFrames: number };

const LINE_MAX = 4;

// Subtitle gaya TikTok: muncul per kelompok kata, kata aktif membesar dan berwarna.
// Timing kata dibagi rata sepanjang durasi suara (tanpa word-level alignment).
export const Subtitle = ({ words, voFrames }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const usable = voFrames - Math.round(0.25 * fps);
  const perWord = usable / words.length;
  const active = Math.min(words.length - 1, Math.floor(frame / perWord));
  const groupStart = Math.floor(active / LINE_MAX) * LINE_MAX;
  const group = words.slice(groupStart, groupStart + LINE_MAX);
  const groupFrame = frame - groupStart * perWord;
  const pop = spring({ frame: groupFrame, fps, config: { damping: 14, stiffness: 220, mass: 0.6 } });
  const isXy = (w: string) => /xydesk/i.test(w);

  return (
    <div
      style={{
        position: 'absolute',
        left: 40,
        right: 40,
        bottom: 190,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '6px 14px',
        transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`,
        opacity: interpolate(pop, [0, 1], [0, 1]),
      }}
    >
      {group.map((word, i) => {
        const idx = groupStart + i;
        const isActive = idx === active;
        const wordFrame = frame - idx * perWord;
        const bump = spring({ frame: wordFrame, fps, config: { damping: 10, stiffness: 300, mass: 0.5 } });
        const scale = isActive ? interpolate(bump, [0, 1], [1.25, 1.08]) : 1;
        const color = isXy(word) ? '#fde047' : isActive ? '#ffffff' : 'rgba(255,255,255,0.82)';
        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              fontSize: 54,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -1,
              color,
              transform: `scale(${scale}) rotate(${isActive ? -1.5 : 0}deg)`,
              textShadow: '0 4px 0 rgba(0,0,0,0.35), 0 10px 24px rgba(0,0,0,0.45)',
              WebkitTextStroke: '2px rgba(20,8,40,0.9)',
              paintOrder: 'stroke fill',
              background: isActive && !isXy(word) ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent',
              borderRadius: 14,
              padding: isActive ? '2px 12px' : '2px 0',
              transition: 'none',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
