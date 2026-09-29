import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { Background } from './Background';
import { Phone } from './Phone';
import { Subtitle } from './Subtitle';
import { Sticker } from './Sticker';
import { Brand } from './Brand';
import { Credits } from './Credits';
import { CREDITS_SECONDS, FPS, SCENES, VO_RATE } from './script';

// Inter = font web/app XyDesk, supaya video terasa satu keluarga dengan produk.
const { fontFamily } = loadFont('normal', { weights: ['600', '700', '800', '900'], subsets: ['latin'] });

export type Timing = { from: number; frames: number; voFrames: number };
export type VideoProps = { timing: Timing[] };

export const Video = ({ timing }: VideoProps) => {
  if (timing.length === 0) return <Background />;
  const last = timing[timing.length - 1];
  const creditsFrom = last.from + last.frames;
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Background />
      {SCENES.map((scene, i) => {
        const t = timing[i];
        return (
          <Sequence key={scene.vo} from={t.from} durationInFrames={t.frames} name={scene.visual}>
            <Audio src={staticFile(`audio/${scene.vo}`)} playbackRate={VO_RATE} />
            {scene.sfx.map((cue, k) => (
              <Sequence key={k} from={Math.round(cue.at * t.voFrames)} name={`sfx ${cue.file}`}>
                <Audio src={staticFile(`sfx/${cue.file}`)} volume={cue.volume ?? 0.7} />
              </Sequence>
            ))}
            <Phone visual={scene.visual} sceneFrames={t.voFrames} />
            {scene.stickers.map((cue, k) => (
              <Sequence key={k} from={Math.round(cue.at * t.voFrames)} name={`sticker ${cue.file}`}>
                <Sticker cue={cue} />
              </Sequence>
            ))}
            <Subtitle words={scene.words} voFrames={t.voFrames} />
          </Sequence>
        );
      })}
      <Sequence from={0} durationInFrames={creditsFrom} name="brand">
        <Brand />
      </Sequence>
      <Sequence from={creditsFrom} durationInFrames={CREDITS_SECONDS * FPS} name="credits">
        <Credits />
      </Sequence>
    </AbsoluteFill>
  );
};
