import progress from 'cli-progress';

const { Bar, Presets } = progress;

export const cliProgress = async (total) => {
    const barProgress = new Bar(
        {
            format: 'Downloading [{bar}] {percentage}% | {value}/{total} | Time: {duration}s | ETA: {eta}s',
            // clearOnComplete: true,
            hideCursor: true,
            barsize: 25
        },
        Presets.legacy
    );

    barProgress.start(total, 0);

    return barProgress;
};
