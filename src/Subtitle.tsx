import { Easing, interpolate, useCurrentFrame } from 'remotion';

type Props = { words: string[]; voFrames: number };

const isBrand = (s: string) => /xydesk|xyverse/i.test(s);

// Gabungkan kata pendek ("di", "gak") dengan kata berikutnya supaya tiap kartu terasa utuh.
export const groupWords = (words: string[]): string[] => {
  const out: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const next = words[i + 1];
    if (next && w.replace(/[^\w]/g, '').length <= 3 && (w + ' ' + next).length <= 14) {
      out.push(w + ' ' + next);
      i++;
    } else out.push(w);
  }
  return out;
};

// Satu kata besar di tengah (kinetic): fade+slide masuk lembut, keluar crossfade.
export const Subtitle = ({ words, voFrames }: Props) => {
  const frame = useCurrentFrame();
  const groups = groupWords(words);
  const usable = voFrames - 6;
  const weights = groups.map((g) => g.length + 3);
  const total = weights.reduce((a, b) => a + b, 0);
  let start = 0;
  const spans = groups.map((g, i) => {
    const len = (weights[i] / total) * usable;
    const s = { text: g, from: start, to: start + len };
    start += len;
    return s;
  });
  const found = spans.findIndex((s) => frame < s.to);
  const cur = spans[found === -1 ? spans.length - 1 : found];
  const local = frame - cur.from;
  const len = cur.to - cur.from;
  const inT = interpolate(local, [0, Math.min(8, len * 0.4)], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.out(Easing.cubic) });
  const outT = interpolate(local, [len - 4, len], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const text = cur.text.replace(/[.,!?]+$/, '');
  const size = text.length <= 7 ? 96 : text.length <= 11 ? 76 : text.length <= 15 ? 60 : 48;
  const brand = isBrand(text);
  return (
    <div style={{ position: 'absolute', left: 24, right: 24, top: 820, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <span
        style={{
          fontSize: size,
          fontWeight: 900,
          letterSpacing: -size * 0.04,
          lineHeight: 1,
          color: brand ? '#7c3aed' : '#14102a',
          opacity: inT * outT,
          transform: `translateY(${(1 - inT) * 16}px) scale(${0.94 + 0.06 * inT})`,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};
