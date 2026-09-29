// Naskah v2. Teks subtitle dipisah dari teks ucapan (audio sudah jadi).
// `at` = posisi relatif (0..1) terhadap durasi narasi adegan.
export type StickerCue = { file: string; at: number; x: number; y: number; size?: number; rot?: number };
export type SfxCue = { file: string; at: number; volume?: number };
export type Scene = {
  vo: string;
  words: string[];
  visual: 'hook' | 'brand' | 'connect' | 'desktop' | 'gaming' | 'anywhere' | 'speed' | 'secure' | 'cta';
  stickers: StickerCue[];
  sfx: SfxCue[];
  gapAfter: number;
};

const w = (s: string) => s.split(' ');

export const SCENES: Scene[] = [
  {
    vo: 'v2-01.mp3',
    words: w('POV: deadline jam 12 malam, file tugas di PC rumah, kamu di kosan. Nangis? Eits, jangan dulu!'),
    visual: 'hook',
    stickers: [
      { file: 's6.webp', at: 0.12, x: 470, y: 120, size: 210, rot: 8 },
      { file: 's8.webp', at: 0.55, x: 30, y: 620, size: 230, rot: -10 },
      { file: 's16.webp', at: 0.8, x: 440, y: 560, size: 220, rot: 6 },
    ],
    sfx: [
      { file: 'vine-boom.mp3', at: 0.02, volume: 0.9 },
      { file: 'spongebob-fail.mp3', at: 0.58, volume: 0.5 },
      { file: 'metal-pipe.mp3', at: 0.8, volume: 0.6 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-02.mp3',
    words: w('Kenalin, XyDesk! Remote desktop buatan anak Indonesia, dikembangkan XyVerse Technology Global. Foundernya namanya Kall. Iya, Kall! Dan ini gratis, gak pake nyicil.'),
    visual: 'brand',
    stickers: [
      { file: 's7.webp', at: 0.03, x: 20, y: 130, size: 220, rot: -8 },
      { file: 's13.webp', at: 0.55, x: 460, y: 560, size: 230, rot: 9 },
      { file: 's1.webp', at: 0.8, x: 30, y: 600, size: 220, rot: -6 },
    ],
    sfx: [
      { file: 'anime-wow.mp3', at: 0.04, volume: 0.55 },
      { file: 'among-us.mp3', at: 0.5, volume: 0.6 },
      { file: 'apple-pay.mp3', at: 0.86, volume: 0.8 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-03.mp3',
    words: w('Cara pakenya lebih gampang dari move on. Buka XyDesk, ketik ID PC, ketik password, pencet konek. Udah! Gak ada langkah ke-15.'),
    visual: 'connect',
    stickers: [
      { file: 's17.webp', at: 0.08, x: 450, y: 150, size: 230, rot: 7 },
      { file: 's19.webp', at: 0.86, x: 20, y: 560, size: 230, rot: -7 },
    ],
    sfx: [
      { file: 'bruh.mp3', at: 0.1, volume: 0.6 },
      { file: 'apple-pay.mp3', at: 0.72, volume: 0.8 },
      { file: 'rizz.mp3', at: 0.86, volume: 0.6 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-04.mp3',
    words: w('Dan... BOOM! Layar PC nongol di HP. Ngetik bisa, klik bisa, buka Excel bisa, buka folder "tugas baru fix final banget" juga bisa!'),
    visual: 'desktop',
    stickers: [
      { file: 's25.webp', at: 0.1, x: 470, y: 130, size: 210, rot: 10 },
      { file: 's15.webp', at: 0.78, x: 30, y: 130, size: 230, rot: -8 },
    ],
    sfx: [
      { file: 'vine-boom.mp3', at: 0.07, volume: 0.9 },
      { file: 'anime-wow.mp3', at: 0.14, volume: 0.45 },
      { file: 'fahhh.mp3', at: 0.8, volume: 0.6 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-05.mp3',
    words: w('Buat para gamer: ada joystick layar sentuh, keypad, sampai gamepad Bluetooth. Main game PC di kasur sambil selimutan. Hidup apa lagi sih yang kamu mau?'),
    visual: 'gaming',
    stickers: [
      { file: 's21.webp', at: 0.5, x: 20, y: 130, size: 240, rot: -6 },
      { file: 's4.webp', at: 0.84, x: 450, y: 560, size: 230, rot: 8 },
    ],
    sfx: [
      { file: 'among-us.mp3', at: 0.02, volume: 0.5 },
      { file: 'rizz.mp3', at: 0.5, volume: 0.6 },
      { file: 'bruh.mp3', at: 0.86, volume: 0.6 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-06.mp3',
    words: w('Gak punya akun? Gak apa-apa! Buka dari browser bisa, iPhone bisa, Android bisa, laptop temen juga bisa. XyDesk tuh gak pilih-pilih, beda sama dia.'),
    visual: 'anywhere',
    stickers: [
      { file: 's20.webp', at: 0.05, x: 460, y: 130, size: 220, rot: 7 },
      { file: 's14.webp', at: 0.86, x: 30, y: 580, size: 240, rot: -9 },
    ],
    sfx: [
      { file: 'apple-pay.mp3', at: 0.3, volume: 0.7 },
      { file: 'apple-pay.mp3', at: 0.42, volume: 0.7 },
      { file: 'vine-boom.mp3', at: 0.88, volume: 0.9 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-07.mp3',
    words: w('Lag? XyDesk nyambungin HP ke PC langsung, peer-to-peer, gak mampir server orang. Kalau masih lag, coba cek dulu... itu wifi kamu, atau wifi tetangga?'),
    visual: 'speed',
    stickers: [
      { file: 's11.webp', at: 0.02, x: 20, y: 130, size: 230, rot: -8 },
      { file: 's9.webp', at: 0.78, x: 450, y: 560, size: 230, rot: 8 },
    ],
    sfx: [
      { file: 'error.mp3', at: 0.02, volume: 0.6 },
      { file: 'metal-pipe.mp3', at: 0.8, volume: 0.6 },
      { file: 'spongebob-fail.mp3', at: 0.9, volume: 0.5 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-08.mp3',
    words: w('Dan yang penting: AMAN! Ada password pairing, aksesnya bisa dicabut kapan aja dari PC. Mantan aja gak bisa balik, apalagi orang iseng.'),
    visual: 'secure',
    stickers: [
      { file: 's2.webp', at: 0.06, x: 460, y: 130, size: 230, rot: 8 },
      { file: 's3.webp', at: 0.72, x: 20, y: 580, size: 230, rot: -7 },
    ],
    sfx: [
      { file: 'apple-pay.mp3', at: 0.08, volume: 0.8 },
      { file: 'error.mp3', at: 0.72, volume: 0.6 },
      { file: 'bruh.mp3', at: 0.9, volume: 0.6 },
    ],
    gapAfter: 0.2,
  },
  {
    vo: 'v2-09.mp3',
    words: w('Jadi, download XyDesk sekarang, link di bio! Follow buat update fitur baru. Dari XyVerse Technology Global, buat kamu yang PC-nya jauh tapi deadline-nya deket. Dadah!'),
    visual: 'cta',
    stickers: [
      { file: 's26.webp', at: 0.04, x: 30, y: 130, size: 220, rot: -6 },
      { file: 's10.webp', at: 0.7, x: 450, y: 560, size: 230, rot: 8 },
      { file: 's12.webp', at: 0.93, x: 40, y: 580, size: 220, rot: -8 },
    ],
    sfx: [
      { file: 'anime-wow.mp3', at: 0.02, volume: 0.5 },
      { file: 'rizz.mp3', at: 0.66, volume: 0.6 },
      { file: 'vine-boom.mp3', at: 0.95, volume: 0.9 },
    ],
    gapAfter: 0.2,
  },
];

export const FPS = 60;
export const WIDTH = 720;
export const HEIGHT = 1280;
// Narasi TTS dipercepat supaya ritmenya TikTok.
export const VO_RATE = 1.22;
// Kartu kredit penutup setelah narasi terakhir (detik).
export const CREDITS_SECONDS = 4;
