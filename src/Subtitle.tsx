import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = { words: string[]; voFrames: number };

const LINE_MAX = 3;

// Subtitle 3 kata per baris; kata aktif "pop" dengan spring cepat, baris baru
// masuk dari bawah dengan easing halus (tidak ada frame loncat).
export const Subtitle = ({ words, voFrames }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const perWord = (voFrames - Math.round(0.2 * fps)) / words.length;
  const active = Math.min(words.length - 1, Math.floor(frame / perWord));
  const groupStart = Math.floor(active / LINE_MAX) * LINE_MAX;
  const group = words.slice(groupStart, groupStart + LINE_MAX);
  const groupFrame = frame - groupStart * perWord;
  const slide = interpolate(groupFrame, [0, 7], [22, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const fade = interpolate(groupFrame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
  const isXy = (s: string) => /xydesk|xyverse/i.test(s);

  return (
    <div
      style={{
        position: 'absolute',
        left: 28,
        right: 28,
        bottom: 200,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px 12px',
        transform: `translateY(${slide}px)`,
        opacity: fade,
      }}
    >
      {group.map((word, i) => {
        const idx = groupStart + i;
        const isActive = idx === active;
        const done = idx < active;
        const bump = spring({ frame: frame - idx * perWord, fps, config: { damping: 11, stiffness: 420, mass: 0.4 } });
        const scale = isActive ? interpolate(bump, [0, 1], [1.28, 1.1]) : 1;
        const brand = isXy(word);
        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: brand ? '#fde047' : '#ffffff',
              opacity: done ? 0.75 : 1,
              transform: `scale(${scale}) rotate(${isActive ? -1.2 : 0}deg)`,
              textShadow: '0 3px 0 rgba(0,0,0,0.4), 0 10px 26px rgba(0,0,0,0.5)',
              WebkitTextStroke: '2px rgba(20,8,40,0.95)',
              paintOrder: 'stroke fill',
              background: isActive && !brand ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent',
              borderRadius: 14,
              padding: isActive ? '0 12px' : '0',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
