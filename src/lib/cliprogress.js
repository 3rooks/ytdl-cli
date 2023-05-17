import progress from 'cli-progress';

const { Bar, Presets } = progress;

export const cliProgress = async (total) => {
    const barProgress = new Bar({}, Presets.shades_grey);

    barProgress.start(total, 0);

    return barProgress;
};
