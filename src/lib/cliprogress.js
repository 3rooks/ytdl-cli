import { COLORS } from '#constants/colors.js';
import progress from 'cli-progress';

const { Bar, Presets } = progress;

export const dlProgress = async (total) => {
    console.log('\n' + COLORS.GREEN, 'Progress:');
    const barProgress = new Bar(
        {
            format: 'Downloading [{bar}] {percentage}% | {value}/{total} | Time: {duration}s | ETA: {eta}s',
            hideCursor: true,
            barsize: 25
        },
        Presets.legacy
    );

    barProgress.start(total, 0);

    return barProgress;
};
