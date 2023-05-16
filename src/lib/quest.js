import inquirer, { createPromptModule } from 'inquirer';

const prompt = createPromptModule();

prompt([{
    
}])

export const quest = async () => {
    const ans = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'download',
            message: 'Download?',
            choices: ['Video', 'Image', 'Channel']
        }
    ]);

    return ans;
};
