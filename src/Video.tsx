import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Background } from './Background';
import { Phone } from './Phone';
import { Subtitle } from './Subtitle';
import { Sticker } from './Sticker';
import { Brand } from './Brand';
import { SCENES, VO_RATE } from './script';
import { loadFont } from '@remotion/google-fonts/Nunito';

const { fontFamily } = loadFont('normal', { weights: ['700', '800', '900'], subsets: ['latin'] });

export type Timing = { from: number; frames: number; voFrames: number };
export type VideoProps = { timing: Timing[] };

export const Video = ({ timing }: VideoProps) => {
  if (timing.length === 0) return <Background />;
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />
      {SCENES.map((scene, i) => {
        const t = timing[i];
        const stickerAt = Math.round(scene.sticker.at * t.voFrames);
        const sfxAt = Math.round(scene.sfx.at * t.voFrames);
        return (
          <Sequence key={scene.vo} from={t.from} durationInFrames={t.frames} name={scene.visual}>
            <Audio src={staticFile(`audio/${scene.vo}`)} playbackRate={VO_RATE} />
            <Sequence from={sfxAt} name={`sfx ${scene.sfx.file}`}>
              <Audio src={staticFile(`sfx/${scene.sfx.file}`)} volume={scene.sfx.volume ?? 0.7} />
            </Sequence>
            <Phone visual={scene.visual} sceneFrames={t.voFrames} />
            <Sequence from={stickerAt} name="sticker">
              <Sticker file={scene.sticker.file} side={scene.sticker.side} />
            </Sequence>
            <Subtitle words={scene.words} voFrames={t.voFrames} />
          </Sequence>
        );
      })}
      <Brand />
    </AbsoluteFill>
  );
};
