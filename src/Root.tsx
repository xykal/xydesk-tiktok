import { Composition, staticFile } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { CREDITS_SECONDS, FPS, HEIGHT, SCENES, VO_RATE, WIDTH } from './script';
import { Video, type Timing, type VideoProps } from './Video';

// Durasi tiap adegan diukur dari file suara saat render, bukan ditulis tangan.
const computeTiming = async (): Promise<Timing[]> => {
  const timing: Timing[] = [];
  let cursor = 0;
  for (const scene of SCENES) {
    const seconds = await getAudioDurationInSeconds(staticFile(`audio/${scene.vo}`));
    const voFrames = Math.ceil((seconds / VO_RATE) * FPS);
    const frames = voFrames + Math.round(scene.gapAfter * FPS);
    timing.push({ from: cursor, frames, voFrames });
    cursor += frames;
  }
  return timing;
};

export const Root = () => (
  <Composition
    id="Main"
    component={Video}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={60 * FPS}
    defaultProps={{ timing: [] } satisfies VideoProps}
    calculateMetadata={async () => {
      const timing = await computeTiming();
      const last = timing[timing.length - 1];
      return {
        durationInFrames: last.from + last.frames + CREDITS_SECONDS * FPS,
        props: { timing },
      };
    }}
  />
);
