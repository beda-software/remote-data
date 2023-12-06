module.exports = {
    semi: false,
    arrowParens: 'always',
    bracketSameLine: false,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    printWidth: 120,
    overrides: [
        {
            files: ['*.yaml', '*.json'],
            options: {
                tabWidth: 2,
            },
        },
    ],
}
