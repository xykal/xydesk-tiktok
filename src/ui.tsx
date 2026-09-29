import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CSSProperties, ReactNode } from 'react';

// Token desain diambil dari web XyDesk (remote.xydesk.my.id) supaya semua layar konsisten.
export const T = {
  bg: '#f4f3f9',
  card: '#ffffff',
  ink: '#111827',
  muted: '#6b7280',
  line: '#e5e7eb',
  accent: '#7c3aed',
  accentSoft: '#ede9fe',
  accentGrad: 'linear-gradient(90deg,#7c3aed,#8b5cf6)',
  ok: '#16a34a',
  danger: '#dc2626',
  radius: 18,
};

export const Rise = ({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 140 } });
  return <div style={{ transform: `translateY(${(1 - s) * 22}px)`, opacity: s, ...style }}>{children}</div>;
};

export const Card = ({ children, style, delay = 0 }: { children: ReactNode; style?: CSSProperties; delay?: number }) => (
  <Rise delay={delay}>
    <div style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${T.line}`, boxShadow: '0 6px 24px rgba(17,24,39,0.06)', padding: 16, ...style }}>{children}</div>
  </Rise>
);

export const Title = ({ children }: { children: ReactNode }) => <div style={{ fontWeight: 800, fontSize: 19, letterSpacing: -0.4, color: T.ink }}>{children}</div>;
export const Sub = ({ children }: { children: ReactNode }) => <div style={{ fontSize: 12, color: T.muted, marginTop: 3, lineHeight: 1.35 }}>{children}</div>;
export const Label = ({ children }: { children: ReactNode }) => <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: T.ink, marginTop: 12, marginBottom: 6 }}>{children}</div>;

export const Field = ({ value, placeholder, active, mask }: { value: string; placeholder: string; active?: boolean; mask?: boolean }) => {
  const frame = useCurrentFrame();
  const shown = mask ? '•'.repeat(value.length) : value;
  return (
    <div style={{ height: 42, borderRadius: 12, border: `2px solid ${active ? T.accent : '#d1d5db'}`, boxShadow: active ? '0 0 0 4px rgba(124,58,237,0.18)' : 'none', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 15, fontWeight: value ? 700 : 500, color: value ? T.ink : '#9ca3af', background: 'white' }}>
      {shown || placeholder}
      {active && <span style={{ marginLeft: 1, opacity: frame % 30 < 15 ? 1 : 0, color: T.ink }}>|</span>}
    </div>
  );
};

export const Button = ({ children, pressed, style }: { children: ReactNode; pressed?: boolean; style?: CSSProperties }) => (
  <div style={{ height: 44, borderRadius: 12, background: T.accentGrad, color: 'white', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(124,58,237,0.30)', transform: pressed ? 'scale(0.97)' : 'scale(1)', filter: pressed ? 'brightness(0.92)' : 'none', ...style }}>{children}</div>
);

export const Chip = ({ children, tone = 'soft' }: { children: ReactNode; tone?: 'soft' | 'ok' | 'danger' }) => {
  const bg = tone === 'ok' ? '#dcfce7' : tone === 'danger' ? '#fee2e2' : T.accentSoft;
  const fg = tone === 'ok' ? T.ok : tone === 'danger' ? T.danger : T.accent;
  return <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 999, background: bg, color: fg }}>{children}</span>;
};

export const Row = ({ left, right, strike }: { left: ReactNode; right: ReactNode; strike?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${T.line}` }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: strike ? T.muted : T.ink, textDecoration: strike ? 'line-through' : 'none' }}>{left}</span>
    {right}
  </div>
);

// Kerangka aplikasi: header + tab persis halaman konek asli. Semua adegan memakainya.
export const Shell = ({ children, tab = 'Mode tamu', toast }: { children: ReactNode; tab?: string; toast?: string }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: T.bg, color: T.ink, padding: '46px 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34 }}>
        <Img src={staticFile('logo.png')} style={{ width: 26, height: 26, borderRadius: 7 }} />
        <span style={{ fontWeight: 800, fontSize: 16 }}>XyDesk</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: 'white', background: T.accentGrad, padding: '7px 11px', borderRadius: 999 }}>Koneksi baru</span>
        <span style={{ width: 30, height: 30, borderRadius: 9, border: `1px solid ${T.line}`, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
          {[0, 1, 2].map((i) => <i key={i} style={{ width: 14, height: 2, background: T.ink, borderRadius: 2 }} />)}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: T.muted, padding: '0 4px' }}>
        <span style={{ color: T.ink }}>{tab}</span><span>Masuk akun</span>
      </div>
      {children}
      {toast && (
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 14, background: T.ink, color: 'white', borderRadius: 12, padding: '10px 12px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, opacity: t, transform: `translateY(${(1 - t) * 12}px)` }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: T.ok }} />{toast}
        </div>
      )}
    </AbsoluteFill>
  );
};
