module.exports = {
    overrides: [
        {
            files: ['./**'],
            plugins: ['jest'],
            extends: ['plugin:jest/recommended'],
            rules: { 'jest/prefer-expect-assertions': 'off' }
        }
    ]
};
