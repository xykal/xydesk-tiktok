# xydesk-tiktok

Video promo XyDesk untuk TikTok, 720x1280 @ 60 fps, dirender sepenuhnya di
GitHub Actions (Remotion + Chromium headless). Tidak ada langkah render lokal.

## Alur
1. Ubah naskah/visual di `src/` (naskah dan urutan adegan: `src/script.ts`).
2. Suara narasi ada di `public/audio/vo-0N.mp3`; durasi adegan dihitung dari
   file audio saat render (`calculateMetadata` di `src/Root.tsx`).
3. Push ke `main` atau jalankan workflow **Render** manual → artifact
   `xydesk-tiktok-mp4` berisi `xydesk-tiktok.mp4` + `preview.png`.

## Struktur
- `src/Video.tsx` — susunan adegan, audio, SFX, stiker, subtitle.
- `src/Screen.tsx` — isi layar HP per adegan.
- `src/Subtitle.tsx` — subtitle per kata gaya TikTok.
- `public/sfx`, `public/stickers` — aset pihak ketiga, lihat `ATTRIBUTION.md`.

## Catatan
Aset SFX dan stiker berasal dari situs publik; sebelum dipakai komersial,
pastikan lisensinya (lihat `ATTRIBUTION.md`).
