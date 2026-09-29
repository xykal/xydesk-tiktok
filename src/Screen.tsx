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
  <AbsoluteFill style={{ background: '#f6f5fb', color: INK, padding: 14, paddingTop: 48, gap: 12, display: 'flex', flexDirection: 'column' }}>
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
  const shake = 0;
  const s = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 140 } });
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
  const a = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const b = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 150 } });
  const c = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${ACCENT}, #4c1d95)`, alignItems: 'center', justifyContent: 'center', color: 'white', gap: 22 }}>
      <Img src={staticFile('logo.png')} style={{ width: 120, height: 120, borderRadius: 28, transform: `scale(${a}) rotate(${Math.sin(frame / 30) * 2}deg)`, boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }} />
      <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1.5, transform: `scale(${a})` }}>XyDesk</div>
      <div style={{ opacity: b, transform: `translateY(${(1 - b) * 20}px)`, textAlign: 'center' }}>
        <div style={{ fontSize: 12, letterSpacing: 3, opacity: 0.75, fontWeight: 700 }}>DIKEMBANGKAN OLEH</div>
        <Img src={staticFile('brand/xyverse-h-white.png')} style={{ width: 200, marginTop: 8 }} />
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
      <Img src={staticFile('shots/connect.png')} style={{ width: 280, height: 570 }} />
      <div style={{ position: 'absolute', left: 28, top: 190, width: 220, height: 34, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 15, fontWeight: 700, color: INK }}>{typed}<span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span></div>
      <div style={{ position: 'absolute', left: 28, top: 254, width: 190, height: 34, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 18, color: INK }}>{pw}</div>
      <Ring top={183} left={22} width={232} height={46} from={typeStart - 8} />
      <Ring top={247} left={22} width={232} height={46} from={pwStart - 8} />
      <Ring top={296} left={22} width={232} height={40} from={btn - 8} />
      <Cursor x={116} y={296} from={btn} />
      {pressed && <div style={{ position: 'absolute', left: 26, top: 300, width: 224, height: 33, borderRadius: 10, background: ACCENT, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>Menghubungkan… ✓</div>}
    </AbsoluteFill>
  );
};

const Desktop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 120 } });
  const toast = spring({ frame: frame - 70, fps, config: { damping: 16 } });
  const folder = spring({ frame: frame - 120, fps, config: { damping: 14 } });
  const W = 600;
  const H = 280;
  return (
    <AbsoluteFill style={{ background: '#0b0b12' }}>
      <div style={{ position: 'absolute', width: W, height: H, left: (H - W) / 2 + 0, top: (W - H) / 2, transform: 'rotate(90deg)', overflow: 'hidden' }}>
        <Img src={staticFile('shots/landing-desktop.png')} style={{ width: W, height: H * 1.34, objectFit: 'cover', objectPosition: 'top', transform: `scale(${interpolate(pop, [0, 1], [1.08, 1])})`, opacity: pop }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: '6px 10px', fontSize: 12, color: INK, display: 'flex', alignItems: 'center', gap: 8, transform: `translateY(${(1 - toast) * -40}px)`, opacity: toast }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#16a34a' }} /><b>Terhubung</b>&nbsp;· 60 FPS · 38 ms
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(255,255,255,0.95)', color: INK, borderRadius: 10, padding: '8px 12px', fontSize: 12, fontWeight: 800, transform: `scale(${folder})`, opacity: folder }}>tugas baru fix final banget.docx</div>
      </div>
    </AbsoluteFill>
  );
};

const Gaming = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [['float-controller.webp', 'Gamepad Bluetooth'], ['float-keyboard.webp', 'Keypad layar'], ['float-mouse.webp', 'Mouse & joystick']];
  return (
    <Light>
      <Card style={{ padding: 14 }}>
        <div style={{ fontWeight: 900, fontSize: 17 }}>Mode Game</div>
        <div style={{ color: MUTED, fontSize: 12 }}>Kontrol lengkap di layar sentuh</div>
      </Card>
      {items.map(([img, label], i) => {
        const s = spring({ frame: frame - 6 - i * 14, fps, config: { damping: 16, stiffness: 150 } });
        return (
          <Card key={img} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, transform: `translateY(${(1 - s) * 30}px)`, opacity: s }}>
            <Img src={staticFile(`shots/${img}`)} style={{ width: 84, height: 84, transform: `translateY(${Math.sin(frame / 20 + i) * 3}px)` }} />
            <div><div style={{ fontWeight: 800, fontSize: 15 }}>{label}</div><div style={{ color: ACCENT, fontSize: 12, fontWeight: 700 }}>siap pakai</div></div>
          </Card>
        );
      })}
    </Light>
  );
};

const Anywhere = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = ['Browser, tanpa install', 'iPhone / iPad', 'Android', 'Laptop temen'];
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
        <div style={{ position: 'absolute', left: 50, right: 50, top: 180, height: 6, background: '#ede9fe', borderRadius: 4 }}>
          {[0, 0.33, 0.66].map((o) => <div key={o} style={{ position: 'absolute', left: `${((p + o) % 1) * 100}%`, top: -7, width: 20, height: 20, borderRadius: 999, background: ACCENT }} />)}
        </div>
        <div style={{ position: 'absolute', left: 18, top: 176, fontSize: 12, fontWeight: 900, color: ACCENT }}>HP</div>
        <div style={{ position: 'absolute', right: 18, top: 176, fontSize: 12, fontWeight: 900, color: ACCENT }}>PC</div>
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['FPS', '60'], ['Latensi', `${30 + Math.round(Math.sin(frame / 10) * 6)} ms`], ['Codec', 'H.264'], ['Relay', '0']].map(([k, v]) => (
            <div key={k} style={{ background: '#f6f5fb', borderRadius: 12, padding: 10 }}><div style={{ fontSize: 11, color: MUTED }}>{k}</div><div style={{ fontWeight: 900, fontSize: 18, color: ACCENT }}>{v}</div></div>
          ))}
        </div>
      </Card>
    </Light>
  );
};

const Secure = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lock = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 150 } });
  const revoke = frame > 100;
  return (
    <Light>
      <Card style={{ textAlign: 'center' }}>
        <div style={{ margin: '0 auto 10px', width: 90, height: 90, borderRadius: 999, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${lock})` }}>
          <div style={{ position: 'relative', width: 40, height: 34, borderRadius: 8, background: ACCENT, marginTop: 14 }}>
            <div style={{ position: 'absolute', left: 6, top: -20, width: 28, height: 30, borderRadius: '14px 14px 0 0', border: `6px solid ${ACCENT}`, borderBottom: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
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
  const y = interpolate(frame, [0, sceneFrames], [0, -560], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: '#f6f5fb' }}>
      <Img src={staticFile('shots/landing.png')} style={{ width: 280, transform: `translateY(${y}px)` }} />
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
