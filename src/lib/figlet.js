import { COLORS } from '#constants/colors.js';
import figlet from 'figlet';

const { BLUE } = COLORS;

export const initTitle = (title) => {
    return new Promise((resolve, reject) =>
        figlet.text(
            title,
            {
                font: 'ASCII New Roman',
                width: 100
            },
            (error, data) => {
                if (error) reject(error);
                else {
                    console.log(BLUE, data, '\n');
                    resolve(null);
                }
            }
        )
    );
};
