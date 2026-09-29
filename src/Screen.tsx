import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Scene } from './script';
import { Button, Card, Chip, Field, Label, Rise, Row, Shell, Sub, T, Title } from './ui';

type Props = { visual: Scene['visual']; sceneFrames: number };

const Hook = () => {
  const frame = useCurrentFrame();
  const sec = String(59 - Math.floor(frame / 40)).padStart(2, '0');
  return (
    <Shell>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <Img src={staticFile('shots/hero.webp')} style={{ width: '100%', height: 250, objectFit: 'cover', transform: `scale(${1.08 - 0.06 * Math.min(1, frame / 90)})` }} />
      </Card>
      <Card delay={8}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Deadline</Title><Chip tone="danger">23:{sec}</Chip>
        </div>
        <Sub>tugas_final_FIX_banget.docx</Sub>
        <Sub>Lokasi: PC rumah · kamu: kosan</Sub>
      </Card>
      <Card delay={20}><Title>Panik?</Title><Sub>Tenang, buka XyDesk aja.</Sub></Card>
    </Shell>
  );
};

const BrandScreen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  return (
    <Shell>
      <Card style={{ textAlign: 'center', padding: '26px 16px' }}>
        <Img src={staticFile('logo.png')} style={{ width: 92, height: 92, borderRadius: 22, transform: `scale(${a})`, boxShadow: '0 14px 30px rgba(124,58,237,0.25)' }} />
        <div style={{ fontWeight: 900, fontSize: 30, letterSpacing: -1, marginTop: 12 }}>XyDesk</div>
        <Sub>Remote desktop buatan anak Indonesia</Sub>
      </Card>
      <Card delay={18}>
        <Label>DIKEMBANGKAN OLEH</Label>
        <Img src={staticFile('brand/xyverse-h-black.png')} style={{ width: 190 }} />
        <Row left="Founder" right={<Chip>Kall</Chip>} />
        <Row left="Harga" right={<Chip tone="ok">Gratis</Chip>} />
      </Card>
    </Shell>
  );
};

const Connect = ({ sceneFrames }: { sceneFrames: number }) => {
  const frame = useCurrentFrame();
  const typeStart = Math.round(sceneFrames * 0.3);
  const pwStart = Math.round(sceneFrames * 0.5);
  const btn = Math.round(sceneFrames * 0.68);
  const id = '123 456 789'.slice(0, Math.max(0, Math.floor((frame - typeStart) / 3)));
  const pw = 'xydesk12'.slice(0, Math.max(0, Math.floor((frame - pwStart) / 3)));
  const pressed = frame > btn && frame < btn + 10;
  const done = frame > btn + 10;
  return (
    <Shell toast={done ? 'Terhubung ke PC rumah' : undefined}>
      <Card>
        <Title>Kendalikan PC dari browser</Title>
        <Sub>Masukkan ID dan password dari XyDesk Host.</Sub>
        <Label>ID PERANGKAT</Label>
        <Field value={id} placeholder="123 456 789" active={frame >= typeStart && frame < pwStart} />
        <Label>PASSWORD PAIRING</Label>
        <Field value={pw} placeholder="Password pairing" mask active={frame >= pwStart && frame < btn} />
        <Button pressed={pressed} style={{ marginTop: 14 }}>{done ? 'Terhubung ✓' : 'Konek sekarang'}</Button>
      </Card>
      <Card delay={10} style={{ textAlign: 'center' }}>
        <Sub>Dukung kami di</Sub>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
          {['Telegram', 'WhatsApp', 'TikTok'].map((s) => <Chip key={s}>{s}</Chip>)}
        </div>
      </Card>
    </Shell>
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
      <div style={{ position: 'absolute', width: W, height: H, left: (H - W) / 2, top: (W - H) / 2, transform: 'rotate(90deg)', overflow: 'hidden' }}>
        <Img src={staticFile('shots/landing-desktop.png')} style={{ width: W, height: H * 1.34, objectFit: 'cover', objectPosition: 'top', transform: `scale(${interpolate(pop, [0, 1], [1.08, 1])})`, opacity: pop }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: T.ink, color: 'white', borderRadius: 12, padding: '8px 12px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, transform: `translateY(${(1 - toast) * -40}px)`, opacity: toast }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: T.ok }} />Terhubung · 60 FPS · 38 ms
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'white', color: T.ink, borderRadius: 12, padding: '8px 12px', fontSize: 12, fontWeight: 800, border: `1px solid ${T.line}`, transform: `scale(${folder})`, opacity: folder }}>tugas baru fix final banget.docx</div>
      </div>
    </AbsoluteFill>
  );
};

const Gaming = () => {
  const frame = useCurrentFrame();
  const items: [string, string][] = [['float-controller.webp', 'Gamepad Bluetooth'], ['float-keyboard.webp', 'Keypad layar sentuh'], ['float-mouse.webp', 'Mouse & joystick']];
  return (
    <Shell tab="Mode game">
      <Card><Title>Mode Game</Title><Sub>Kontrol lengkap, langsung dari HP.</Sub></Card>
      {items.map(([img, label], i) => (
        <Card key={img} delay={8 + i * 12} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
          <Img src={staticFile(`shots/${img}`)} style={{ width: 72, height: 72, transform: `translateY(${Math.sin(frame / 20 + i) * 3}px)` }} />
          <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{label}</div><Sub>Latensi rendah</Sub></div>
          <Chip tone="ok">aktif</Chip>
        </Card>
      ))}
    </Shell>
  );
};

const Anywhere = () => (
  <Shell>
    <Card><Title>Mode tamu</Title><Sub>Gak perlu akun, buka dari mana aja.</Sub></Card>
    <Card delay={10} style={{ paddingTop: 6 }}>
      {['Browser, tanpa install', 'iPhone / iPad', 'Android', 'Laptop temen'].map((t, i) => (
        <Rise key={t} delay={14 + i * 10}><Row left={t} right={<Chip tone="ok">bisa</Chip>} /></Rise>
      ))}
    </Card>
  </Shell>
);

const Speed = () => {
  const frame = useCurrentFrame();
  const p = (frame % 50) / 50;
  const stats: [string, string][] = [['FPS', '60'], ['Latensi', `${30 + Math.round(Math.sin(frame / 10) * 6)} ms`], ['Codec', 'H.264'], ['Relay', '0']];
  return (
    <Shell>
      <Card>
        <Title>Peer-to-peer</Title><Sub>HP ke PC langsung, tanpa mampir server orang.</Sub>
        <div style={{ position: 'relative', margin: '18px 6px 6px', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip>HP</Chip>
          <div style={{ position: 'absolute', left: 50, right: 50, height: 4, background: T.accentSoft, borderRadius: 4 }}>
            {[0, 0.33, 0.66].map((o) => <div key={o} style={{ position: 'absolute', left: `${((p + o) % 1) * 100}%`, top: -5, width: 14, height: 14, borderRadius: 999, background: T.accent }} />)}
          </div>
          <Chip>PC</Chip>
        </div>
      </Card>
      <Card delay={12} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {stats.map(([k, v]) => (
          <div key={k} style={{ background: T.bg, borderRadius: 12, padding: 10 }}><div style={{ fontSize: 10, fontWeight: 700, color: T.muted }}>{k}</div><div style={{ fontWeight: 900, fontSize: 20, color: T.accent }}>{v}</div></div>
        ))}
      </Card>
    </Shell>
  );
};

const Secure = () => {
  const frame = useCurrentFrame();
  const revoked = frame > 100;
  return (
    <Shell>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Title>Keamanan</Title><Chip tone="ok">aman</Chip></div>
        <Sub>Password pairing, terenkripsi ujung ke ujung.</Sub>
      </Card>
      <Card delay={10} style={{ paddingTop: 6 }}>
        <Label>PERANGKAT TERHUBUNG</Label>
        <Row left="HP kamu" right={<Chip tone="ok">aktif</Chip>} />
        <Row left="Orang iseng" strike={revoked} right={<Chip tone={revoked ? 'danger' : 'soft'}>{revoked ? 'DICABUT' : 'menunggu'}</Chip>} />
      </Card>
      <Rise delay={20}><Button style={{ background: revoked ? T.ink : T.accentGrad }}>{revoked ? 'Akses dicabut ✓' : 'Cabut akses'}</Button></Rise>
    </Shell>
  );
};

const Cta = () => (
  <Shell>
    <Card style={{ textAlign: 'center', padding: '22px 16px' }}>
      <Img src={staticFile('logo.png')} style={{ width: 72, height: 72, borderRadius: 18 }} />
      <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: -0.8, marginTop: 10 }}>Download XyDesk</div>
      <Sub>Gratis · Android · iPhone · Browser</Sub>
      <Button style={{ marginTop: 14 }}>Link di bio</Button>
    </Card>
    <Card delay={14}>
      <Label>DIKEMBANGKAN OLEH</Label>
      <Img src={staticFile('brand/xyverse-h-black.png')} style={{ width: 190 }} />
      <Row left="Founder" right={<Chip>Kall</Chip>} />
    </Card>
  </Shell>
);

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
    default: return <Cta />;
  }
};
