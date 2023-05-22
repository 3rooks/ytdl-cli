import figlet from 'figlet';

export const initTitle = async (title) => {
    return new Promise((resolve, reject) =>
        figlet.text(
            title,
            {
                font: 'Efti Water',
                width: 100
            },
            (error, data) => {
                if (error) reject(error);
                else resolve(data);
            }
        )
    );
};
