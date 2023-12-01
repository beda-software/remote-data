module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['standard-with-typescript', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', '@stylistic'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['index', 'sibling', 'parent']],
                'newlines-between': 'always',
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
    },
}
