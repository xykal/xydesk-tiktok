import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CSSProperties, ReactNode } from 'react';
import type { Scene } from './script';

type Props = { visual: Scene['visual']; sceneFrames: number };

const ACCENT = '#7c3aed';
const INK = '#111827';
const MUTED = '#6b7280';

const Ring = ({ top, left, width, height, from }: { top: number; left: number; width: number; height: number; from: number }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - from);
  const pulse = (t % 40) / 40;
  return (
    <div style={{ position: 'absolute', top, left, width, height, borderRadius: 16, border: `4px solid ${ACCENT}`, boxShadow: `0 0 0 ${pulse * 14}px rgba(124,58,237,${0.45 * (1 - pulse)})`, opacity: t > 0 ? 1 : 0 }} />
  );
};

const Cursor = ({ x, y, from }: { x: number; y: number; from: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - from, fps, config: { damping: 12, stiffness: 200 } });
  const tap = interpolate(frame - from, [8, 12, 16], [1, 0.75, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ position: 'absolute', left: x, top: y, width: 46, height: 46, borderRadius: 999, background: 'rgba(124,58,237,0.35)', border: '3px solid white', transform: `scale(${s * tap})`, boxShadow: '0 6px 16px rgba(0,0,0,0.3)' }} />;
};

const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 8px 30px rgba(17,24,39,0.08)', padding: 18, ...style }}>{children}</div>
);

const Light = ({ children }: { children: ReactNode }) => (
  <AbsoluteFill style={{ background: '#f6f5fb', color: INK, padding: 14, paddingTop: 54, gap: 12, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <Img src={staticFile('logo.png')} style={{ width: 26, height: 26, borderRadius: 7 }} />
      <span style={{ fontWeight: 800, fontSize: 18 }}>XyDesk</span>
      <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: 'white', background: ACCENT, padding: '5px 10px', borderRadius: 999 }}>Koneksi baru</span>
    </div>
    {children}
  </AbsoluteFill>
);

const Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shake = frame < 12 ? Math.sin(frame * 3) * 6 : 0;
  const s = spring({ frame: frame - 6, fps, config: { damping: 9, stiffness: 220 } });
  return (
    <AbsoluteFill style={{ background: '#f6f5fb', transform: `translateX(${shake}px)` }}>
      <Img src={staticFile('shots/hero.webp')} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.15 - 0.1 * Math.min(1, frame / 60)})` }} />
      <div style={{ position: 'absolute', left: 16, right: 16, top: 90, transform: `scale(${s})`, textAlign: 'center' }}>
        <div style={{ background: '#dc2626', color: 'white', fontWeight: 900, fontSize: 54, borderRadius: 18, padding: '10px 0', letterSpacing: -2, boxShadow: '0 12px 30px rgba(220,38,38,0.4)' }}>23:{String(59 - Math.floor(frame / 40)).padStart(2, '0')}</div>
        <div style={{ marginTop: 10, background: 'white', color: INK, fontWeight: 800, fontSize: 20, borderRadius: 14, padding: 10 }}>tugas_final_FIX_banget.docx<br /><span style={{ color: MUTED, fontSize: 14 }}>ada di PC rumah</span></div>
      </div>
    </AbsoluteFill>
  );
};

const BrandScreen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 10, stiffness: 170 } });
  const b = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 150 } });
  const c = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${ACCENT}, #4c1d95)`, alignItems: 'center', justifyContent: 'center', color: 'white', gap: 22 }}>
      <Img src={staticFile('logo.png')} style={{ width: 150, height: 150, borderRadius: 34, transform: `scale(${a}) rotate(${Math.sin(frame / 12) * 4}deg)`, boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }} />
      <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.5, transform: `scale(${a})` }}>XyDesk</div>
      <div style={{ opacity: b, transform: `translateY(${(1 - b) * 20}px)`, textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: 3, opacity: 0.75, fontWeight: 700 }}>DIKEMBANGKAN OLEH</div>
        <Img src={staticFile('brand/xyverse-h-white.png')} style={{ width: 240, marginTop: 8 }} />
      </div>
      <div style={{ opacity: c, transform: `scale(${c})`, background: 'white', color: ACCENT, fontWeight: 900, borderRadius: 999, padding: '10px 22px', fontSize: 20 }}>Founder: Kall · GRATIS</div>
    </AbsoluteFill>
  );
};

const Connect = ({ sceneFrames }: { sceneFrames: number }) => {
  const frame = useCurrentFrame();
  const id = '123 456 789';
  const typeStart = Math.round(sceneFrames * 0.3);
  const typed = id.slice(0, Math.max(0, Math.floor((frame - typeStart) / 3)));
  const pwStart = Math.round(sceneFrames * 0.5);
  const pw = '•'.repeat(Math.max(0, Math.min(8, Math.floor((frame - pwStart) / 3))));
  const btn = Math.round(sceneFrames * 0.68);
  const pressed = frame > btn + 10;
  return (
    <AbsoluteFill style={{ background: '#f6f5fb' }}>
      <Img src={staticFile('shots/connect.png')} style={{ width: 336, height: 684 }} />
      <div style={{ position: 'absolute', left: 30, top: 246, width: 276, height: 44, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 18, fontWeight: 700, color: INK }}>{typed}<span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span></div>
      <div style={{ position: 'absolute', left: 30, top: 324, width: 240, height: 44, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 22, color: INK }}>{pw}</div>
      <Ring top={232} left={26} width={284} height={62} from={typeStart - 8} />
      <Ring top={310} left={26} width={284} height={62} from={pwStart - 8} />
      <Ring top={358} left={26} width={284} height={54} from={btn - 8} />
      <Cursor x={140} y={364} from={btn} />
      {pressed && <div style={{ position: 'absolute', left: 26, top: 362, width: 284, height: 46, borderRadius: 12, background: ACCENT, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>Menghubungkan… ✓</div>}
    </AbsoluteFill>
  );
};

const Desktop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 9, stiffness: 200 } });
  const toast = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ background: '#0b0b12', alignItems: 'center', justifyContent: 'center' }}>
      <Img src={staticFile('shots/landing-desktop.png')} style={{ width: '100%', transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`, borderRadius: 8 }} />
      <div style={{ position: 'absolute', top: 60, left: 14, right: 14, background: 'white', borderRadius: 12, padding: '8px 12px', fontSize: 13, color: INK, display: 'flex', alignItems: 'center', gap: 8, transform: `translateY(${(1 - toast) * -60}px)` }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#16a34a' }} /><b>Terhubung</b>&nbsp;· 60 FPS · 38 ms
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 20, background: 'rgba(255,255,255,0.95)', color: INK, borderRadius: 10, padding: '8px 12px', fontSize: 12, fontWeight: 700, transform: `scale(${spring({ frame: frame - 110, fps, config: { damping: 10 } })})` }}>📁 tugas baru fix final banget</div>
    </AbsoluteFill>
  );
};

const Gaming = () => {
  const frame = useCurrentFrame();
  const stick = { x: Math.sin(frame / 9) * 16, y: Math.cos(frame / 11) * 16 };
  const press = (o: number) => (Math.floor((frame + o) / 14) % 4 === 0 ? ACCENT : '#e5e7eb');
  return (
    <Light>
      <Card style={{ flex: 1, position: 'relative', background: `linear-gradient(180deg,#ede9fe,#ffffff)` }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>Mode Game</div>
        <div style={{ color: MUTED, fontSize: 12 }}>Joystick · Keypad · Gamepad BT</div>
        <div style={{ position: 'absolute', left: 30, bottom: 40, width: 120, height: 120, borderRadius: 999, background: '#e5e7eb' }}>
          <div style={{ position: 'absolute', left: 30 + stick.x, top: 30 + stick.y, width: 60, height: 60, borderRadius: 999, background: ACCENT, boxShadow: '0 8px 20px rgba(124,58,237,0.5)' }} />
        </div>
        {[
          [220, 60, 0], [260, 100, 1], [220, 140, 2], [180, 100, 3],
        ].map(([x, y, o]) => (
          <div key={o} style={{ position: 'absolute', left: x, bottom: y, width: 40, height: 40, borderRadius: 999, background: press(o * 14), transition: 'none' }} />
        ))}
        <div style={{ position: 'absolute', top: 70, left: 18, right: 18, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {'WASD ↑←↓→ SPACE'.split(' ').map((k) => <span key={k} style={{ fontSize: 12, fontWeight: 800, padding: '6px 8px', borderRadius: 8, background: 'white', border: '1px solid #e5e7eb' }}>{k}</span>)}
        </div>
      </Card>
    </Light>
  );
};

const Anywhere = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = ['🌐 Browser (tanpa install)', '🍎 iPhone / iPad', '🤖 Android', '💻 Laptop temen'];
  return (
    <Light>
      <Card><div style={{ fontWeight: 800, fontSize: 18 }}>Mode tamu</div><div style={{ color: MUTED, fontSize: 13 }}>Gak perlu akun, buka aja.</div></Card>
      {items.map((t, i) => {
        const s = spring({ frame: frame - 8 - i * 12, fps, config: { damping: 12, stiffness: 180 } });
        return <Card key={t} style={{ transform: `translateX(${(1 - s) * 200}px)`, opacity: s, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 700 }}>{t}</span><span style={{ color: '#16a34a', fontWeight: 900 }}>✓</span></Card>;
      })}
    </Light>
  );
};

const Speed = () => {
  const frame = useCurrentFrame();
  const p = (frame % 50) / 50;
  return (
    <Light>
      <Card style={{ flex: 1, position: 'relative' }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Peer-to-peer</div>
        <div style={{ color: MUTED, fontSize: 13 }}>HP ↔ PC langsung, tanpa relay.</div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 200, height: 6, background: '#ede9fe', borderRadius: 4 }}>
          {[0, 0.33, 0.66].map((o) => <div key={o} style={{ position: 'absolute', left: `${((p + o) % 1) * 100}%`, top: -7, width: 20, height: 20, borderRadius: 999, background: ACCENT }} />)}
        </div>
        <div style={{ position: 'absolute', left: 20, top: 170, fontSize: 40 }}>📱</div>
        <div style={{ position: 'absolute', right: 20, top: 170, fontSize: 40 }}>🖥️</div>
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['FPS', '60'], ['Latensi', `${30 + Math.round(Math.sin(frame / 10) * 6)} ms`], ['Codec', 'H.264 HW'], ['Server orang', '0']].map(([k, v]) => (
            <div key={k} style={{ background: '#f6f5fb', borderRadius: 12, padding: 10 }}><div style={{ fontSize: 11, color: MUTED }}>{k}</div><div style={{ fontWeight: 900, fontSize: 22, color: ACCENT }}>{v}</div></div>
          ))}
        </div>
      </Card>
    </Light>
  );
};

const Secure = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lock = spring({ frame: frame - 4, fps, config: { damping: 8, stiffness: 200 } });
  const revoke = frame > 100;
  return (
    <Light>
      <Card style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 80, transform: `scale(${lock})` }}>🔒</div>
        <div style={{ fontWeight: 900, fontSize: 20 }}>Password pairing</div>
        <div style={{ color: MUTED, fontSize: 13 }}>Terenkripsi ujung ke ujung</div>
      </Card>
      <Card>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>Perangkat terhubung</div>
        {[['HP kamu', true], ['Orang iseng', !revoke]].map(([n, ok]) => (
          <div key={String(n)} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #f1f0f6' }}>
            <span style={{ textDecoration: ok ? 'none' : 'line-through', color: ok ? INK : MUTED }}>{n}</span>
            <span style={{ fontWeight: 800, color: ok ? '#16a34a' : '#dc2626' }}>{ok ? 'aktif' : 'DICABUT'}</span>
          </div>
        ))}
      </Card>
    </Light>
  );
};

const Cta = ({ sceneFrames }: { sceneFrames: number }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, sceneFrames], [0, -900], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#f6f5fb' }}>
      <Img src={staticFile('shots/landing.png')} style={{ width: 336, transform: `translateY(${y}px)` }} />
    </AbsoluteFill>
  );
};

export const Screen = ({ visual, sceneFrames }: Props) => {
  switch (visual) {
    case 'hook': return <Hook />;
    case 'brand': return <BrandScreen />;
    case 'connect': return <Connect sceneFrames={sceneFrames} />;
    case 'desktop': return <Desktop />;
    case 'gaming': return <Gaming />;
    case 'anywhere': return <Anywhere />;
    case 'speed': return <Speed />;
    case 'secure': return <Secure />;
    default: return <Cta sceneFrames={sceneFrames} />;
  }
};
