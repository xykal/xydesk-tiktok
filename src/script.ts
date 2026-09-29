// Naskah: teks tampil (subtitle) dipisah dari teks ucapan (audio sudah jadi).
export type Scene = {
  vo: string;
  words: string[];
  visual: 'panic' | 'logo' | 'connect' | 'desktop' | 'anywhere' | 'speed' | 'cta';
  sticker: { file: string; at: number; side: 'left' | 'right' };
  sfx: { file: string; at: number; volume?: number };
  gapAfter: number;
};

const w = (s: string) => s.split(' ');

export const SCENES: Scene[] = [
  {
    vo: 'vo-01.mp3',
    words: w('Halo halooo! Ini aku lagi, si paling gabut. Lagi rebahan cantik, terus... yaampun, file tugasnya ketinggalan di PC rumah. Nangis gak tuh?'),
    visual: 'panic',
    sticker: { file: 's8.webp', at: 0.62, side: 'right' },
    sfx: { file: 'spongebob-fail.mp3', at: 0.8, volume: 0.6 },
    gapAfter: 0.35,
  },
  {
    vo: 'vo-02.mp3',
    words: w('Tapi tenang, aku punya jurus rahasia. Namanya XyDesk! Iya, XyDesk. Remote desktop buatan anak Indonesia, gratis pula. Cakep banget kan?'),
    visual: 'logo',
    sticker: { file: 's1.webp', at: 0.7, side: 'left' },
    sfx: { file: 'anime-wow.mp3', at: 0.28, volume: 0.5 },
    gapAfter: 0.3,
  },
  {
    vo: 'vo-03.mp3',
    words: w('Caranya gampang banget, kayak ngechat gebetan, tapi yang ini pasti dibales. Buka XyDesk di HP, ketik ID PC-nya, ketik password, terus... tadaaa!'),
    visual: 'connect',
    sticker: { file: 's17.webp', at: 0.22, side: 'right' },
    sfx: { file: 'rizz.mp3', at: 0.9, volume: 0.7 },
    gapAfter: 0.3,
  },
  {
    vo: 'vo-04.mp3',
    words: w('Layar PC-nya langsung nongol di HP aku! Bisa buka file, bisa ngetik, bisa klik-klik, malah bisa main game PC dari HP. Pake joystick layar sentuh dong. Gemes!'),
    visual: 'desktop',
    sticker: { file: 's25.webp', at: 0.88, side: 'left' },
    sfx: { file: 'vine-boom.mp3', at: 0.9, volume: 0.8 },
    gapAfter: 0.3,
  },
  {
    vo: 'vo-05.mp3',
    words: w('Terus yang paling aku suka: gak wajib bikin akun. Buka dari browser juga bisa, di iPhone pun jalan. Pokoknya XyDesk tuh anti ribet-ribet club.'),
    visual: 'anywhere',
    sticker: { file: 's20.webp', at: 0.3, side: 'right' },
    sfx: { file: 'bruh.mp3', at: 0.82, volume: 0.7 },
    gapAfter: 0.3,
  },
  {
    vo: 'vo-06.mp3',
    words: w('Kalau kamu nanya, "lag gak kak?" Hmm, XyDesk nyambungin HP ke PC langsung, peer to peer, jadi ngebutnya beda. Asal wifi kamu bukan wifi tetangga ya. Hihi.'),
    visual: 'speed',
    sticker: { file: 's11.webp', at: 0.08, side: 'left' },
    sfx: { file: 'error.mp3', at: 0.78, volume: 0.7 },
    gapAfter: 0.3,
  },
  {
    vo: 'vo-07.mp3',
    words: w('Jadi udah deh, gak ada lagi drama file ketinggalan. Download XyDesk sekarang, link-nya ada di bio. Follow juga ya, biar aku gak sendirian di sini. Hehe. Dadah!'),
    visual: 'cta',
    sticker: { file: 's26.webp', at: 0.86, side: 'right' },
    sfx: { file: 'vine-boom.mp3', at: 0.97, volume: 0.8 },
    gapAfter: 1.2,
  },
];

export const FPS = 60;
export const WIDTH = 720;
export const HEIGHT = 1280;
