import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Scene } from './script';

type Props = { visual: Scene['visual']; sceneFrames: number };

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: 18,
  padding: 16,
  color: 'white',
};

const Field = ({ label, value, filled }: { label: string; value: string; filled: number }) => (
  <div style={{ marginTop: 14 }}>
    <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 700, letterSpacing: 1 }}>{label}</div>
    <div
      style={{
        marginTop: 6,
        height: 48,
        borderRadius: 12,
        background: '#f5f3ff',
        color: '#18181b',
        fontWeight: 800,
        fontSize: 20,
        letterSpacing: 2,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        boxShadow: filled > 0 && filled < 1 ? '0 0 0 3px rgba(124,58,237,0.35)' : 'none',
      }}
    >
      {value.slice(0, Math.round(value.length * filled))}
      {filled > 0 && filled < 1 && <span style={{ opacity: 0.6 }}>|</span>}
    </div>
  </div>
);

const Desktop = ({ frame, fps }: { frame: number; fps: number }) => {
  const winIn = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const cursorX = 220 + Math.sin(frame / 25) * 90;
  const cursorY = 150 + Math.cos(frame / 31) * 60;
  return (
    // HP diputar -90° di Phone.tsx; konten 716x336 diputar +90° supaya tegak
    // bagi penonton dan pas memenuhi layar lanskap.
    <div style={{ position: 'absolute', left: -190, top: 190, width: 716, height: 336, transform: 'rotate(90deg)', background: 'linear-gradient(135deg,#0ea5e9,#6366f1 60%,#a855f7)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 70, top: 50, width: 330, height: 200, borderRadius: 8, background: '#fff', transform: `scale(${winIn})`, boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
        <div style={{ height: 18, background: '#e5e7eb', borderRadius: '8px 8px 0 0', display: 'flex', gap: 4, padding: 5 }}>
          {['#f87171', '#fbbf24', '#34d399'].map((c) => <span key={c} style={{ width: 8, height: 8, borderRadius: 4, background: c }} />)}
        </div>
        <div style={{ padding: 8, fontSize: 13, color: '#111', fontWeight: 700 }}>Tugas_Final_FIX_BENERAN.docx</div>
        {[140, 220, 180, 110].map((w, i) => <div key={i} style={{ marginLeft: 8, marginTop: 5, width: w, height: 5, borderRadius: 3, background: '#d1d5db' }} />)}
      </div>
      <div style={{ position: 'absolute', left: cursorX, top: cursorY, width: 0, height: 0, borderLeft: '7px solid white', borderRight: '7px solid transparent', borderBottom: '14px solid transparent', borderTop: '14px solid white', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 22, background: 'rgba(15,23,42,0.85)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px' }}>
        {['#7c3aed', '#22d3ee', '#f472b6', '#facc15'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: 3, background: c }} />)}
      </div>
      <div style={{ position: 'absolute', left: 24, bottom: 44, width: 90, height: 90, borderRadius: 45, border: '3px solid rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.15)' }}>
        <div style={{ position: 'absolute', left: 26 + Math.sin(frame / 9) * 16, top: 26 + Math.cos(frame / 9) * 16, width: 32, height: 32, borderRadius: 16, background: 'white' }} />
      </div>
      {['A', 'B'].map((k, i) => (
        <div key={k} style={{ position: 'absolute', right: 30 + i * 60, bottom: 54 + i * 40, width: 46, height: 46, borderRadius: 23, background: i === 0 ? '#22c55e' : '#ef4444', color: 'white', fontWeight: 900, fontSize: 18, display: 'grid', placeItems: 'center', transform: `scale(${1 + (Math.sin(frame / 6 + i) > 0.8 ? 0.15 : 0)})` }}>{k}</div>
      ))}
    </div>
  );
};

export const Screen = ({ visual, sceneFrames }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = Math.min(1, frame / sceneFrames);
  const pad: React.CSSProperties = { padding: '64px 20px 20px' };

  if (visual === 'panic') {
    const shake = frame > sceneFrames * 0.55 ? Math.sin(frame * 1.8) * 4 : 0;
    return (
      <AbsoluteFill style={{ ...pad, background: '#0f0a1f', transform: `translateX(${shake}px)` }}>
        <div style={{ color: 'white', fontSize: 40, fontWeight: 900, textAlign: 'center', marginTop: 40 }}>21:47</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontSize: 14 }}>Minggu malam</div>
        {[['Dosen', 'Deadline tugas jam 23.59 ya'], ['Kamu', 'file-nya... di PC rumah'], ['Kamu', 'AAAAAAAA']].map(([who, msg], i) => {
          const s = spring({ frame: frame - 20 - i * 42, fps, config: { damping: 12 } });
          return (
            <div key={i} style={{ ...card, marginTop: 14, transform: `translateY(${(1 - s) * 30}px)`, opacity: s, background: who === 'Kamu' ? 'rgba(124,58,237,0.5)' : card.background }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{who}</div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{msg}</div>
            </div>
          );
        })}
      </AbsoluteFill>
    );
  }

  if (visual === 'logo') {
    return (
      <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 45%, #7c3aed, #1b0a33 70%)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 100, textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1, transform: `scale(${spring({ frame: frame - 25, fps })})` }}>XyDesk</div>
          <div style={{ marginTop: 8, display: 'inline-block', padding: '6px 14px', borderRadius: 999, background: '#fde047', color: '#1b0a33', fontWeight: 900, fontSize: 14, opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>GRATIS · BUATAN INDONESIA</div>
        </div>
      </AbsoluteFill>
    );
  }

  if (visual === 'connect') {
    const idFill = interpolate(p, [0.35, 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const pwFill = interpolate(p, [0.62, 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const press = p > 0.86 ? 0.94 : 1;
    const flash = interpolate(p, [0.9, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return (
      <AbsoluteFill style={{ ...pad, background: '#0f0a1f' }}>
        <div style={{ color: 'white', fontWeight: 900, fontSize: 24, textAlign: 'center', marginTop: 10 }}>Kendalikan PC dari HP</div>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, textAlign: 'center' }}>Masukkan ID dan password dari XyDesk Host.</div>
        <Field label="ID PERANGKAT" value="123 456 789" filled={idFill} />
        <Field label="PASSWORD PAIRING" value="••••••••" filled={pwFill} />
        <div style={{ marginTop: 22, height: 52, borderRadius: 14, background: 'linear-gradient(160deg,#8b5cf6,#5b21b6)', color: 'white', fontWeight: 900, fontSize: 17, display: 'grid', placeItems: 'center', transform: `scale(${press})`, boxShadow: '0 10px 24px rgba(91,33,182,0.5)' }}>Konek sekarang</div>
        <AbsoluteFill style={{ background: 'white', opacity: flash * 0.9 }} />
      </AbsoluteFill>
    );
  }

  if (visual === 'desktop') return <Desktop frame={frame} fps={fps} />;

  if (visual === 'anywhere') {
    const items = [['Android', '#22c55e'], ['iPhone', '#f472b6'], ['Browser', '#38bdf8'], ['Windows', '#60a5fa']];
    return (
      <AbsoluteFill style={{ ...pad, background: '#0f0a1f' }}>
        <div style={{ color: 'white', fontWeight: 900, fontSize: 26, textAlign: 'center', marginTop: 10 }}>Jalan di mana aja</div>
        {items.map(([name, color], i) => {
          const s = spring({ frame: frame - 15 - i * 18, fps, config: { damping: 11 } });
          return (
            <div key={name} style={{ ...card, marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, transform: `translateX(${(1 - s) * 80}px)`, opacity: s }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: color }} />
              <span style={{ fontWeight: 800, fontSize: 20, flex: 1 }}>{name}</span>
              <span style={{ color: '#4ade80', fontWeight: 900, fontSize: 22 }}>✓</span>
            </div>
          );
        })}
        <div style={{ marginTop: 22, textAlign: 'center', color: '#fde047', fontWeight: 900, fontSize: 18, opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>Tanpa akun. Tanpa ribet.</div>
      </AbsoluteFill>
    );
  }

  if (visual === 'speed') {
    const ms = Math.round(interpolate(p, [0.1, 0.55], [480, 18], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
    const bad = p > 0.78;
    return (
      <AbsoluteFill style={{ ...pad, background: '#0f0a1f', alignItems: 'center' }}>
        <div style={{ color: 'white', fontWeight: 900, fontSize: 24, marginTop: 10 }}>Latency</div>
        <div style={{ color: bad ? '#f87171' : '#4ade80', fontWeight: 900, fontSize: 96, letterSpacing: -4, marginTop: 30 }}>{bad ? '???' : ms}<span style={{ fontSize: 30 }}> ms</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40, color: 'white', fontWeight: 800 }}>
          <span style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.12)' }}>HP</span>
          <span style={{ width: 90, height: 4, background: bad ? '#f87171' : 'linear-gradient(90deg,#4ade80,#22d3ee)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: `${(frame * 4) % 100}%`, top: -3, width: 10, height: 10, borderRadius: 5, background: 'white' }} />
          </span>
          <span style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.12)' }}>PC</span>
        </div>
        <div style={{ marginTop: 16, color: '#fde047', fontWeight: 900 }}>P2P · langsung, tanpa mampir server</div>
        {bad && <div style={{ marginTop: 26, color: '#f87171', fontWeight: 900, fontSize: 18 }}>wifi tetangga terdeteksi</div>}
      </AbsoluteFill>
    );
  }

  const pulse = 1 + Math.sin(frame / 8) * 0.04;
  return (
    <AbsoluteFill style={{ ...pad, background: 'radial-gradient(circle at 50% 30%, #7c3aed, #1b0a33 70%)', alignItems: 'center' }}>
      <div style={{ color: 'white', fontWeight: 900, fontSize: 34, textAlign: 'center', marginTop: 40, lineHeight: 1.1 }}>Download<br />XyDesk</div>
      <div style={{ marginTop: 26, padding: '14px 26px', borderRadius: 999, background: '#fde047', color: '#1b0a33', fontWeight: 900, fontSize: 20, transform: `scale(${pulse})` }}>Link di bio</div>
      <div style={{ marginTop: 40, padding: '12px 22px', borderRadius: 14, border: '2px solid white', color: 'white', fontWeight: 900, fontSize: 18, opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>+ Follow</div>
      <div style={{ marginTop: 30, color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>remote.xydesk.my.id</div>
    </AbsoluteFill>
  );
};
