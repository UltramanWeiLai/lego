module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "vue/script-indent": ["error", 4, {  // script标签缩进设置
            "baseIndent": 1,
            "switchCase": 0,
            "ignores": []
        }],
        'indent': ['warn', 4],
        'semi': ['error', 'never'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    overrides: [
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off",
            }
        }
    ],
}
