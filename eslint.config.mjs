/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import esPrettier from 'eslint-config-prettier/flat';
import importX from 'eslint-plugin-import-x';
import yml from 'eslint-plugin-yml';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([

    globalIgnores([
        'out/*',
        'dist/*',
    ]),

    {
        files: [
            'src/**/*.ts',
            'scripts/**/*.ts',
            'test/**/*.ts'
        ],
        ...js.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked[0],

        languageOptions: {
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                ecmaFeatures: {
                    impliedStrict: true
                },
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
                ...globals.mocha
            }
        },

        plugins:{
            'import-x': importX, 
            '@typescript-eslint': tseslint.plugin
        },

        extends: [ 'import-x/flat/recommended', 'import-x/flat/typescript'],

        rules: {
            '@typescript-eslint/naming-convention': [
				'warn',
				{
					'selector': 'class',
					'format': [
						'PascalCase'
					],
					'leadingUnderscore': 'allow'
				}
			],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unused-expressions': [
                'error', 
                {
                    'allowShortCircuit': true,
                    'allowTernary': true, 
                }
            ],
            'curly': ['error', 'all'],
            'eqeqeq': 'error',
            'import-x/no-dynamic-require': 'error',
            'import-x/no-default-export': 'error',
            'import-x/no-self-import': 'error',
            'import-x/order': [ 'error',
                {
                    'alphabetize': {
                        'order': 'asc',
                        'orderImportKind': 'asc',
                        'caseInsensitive': true,
                    },
                    'named': true,
                    'sortTypesGroup': true,
                }
            ],
            'max-len': ['error', {
                'code': 120, // needs to be in sync w/ .prettierrc printWidth
                'ignoreUrls': true,
            }],
            'no-duplicate-imports': 'error',
            'no-var': 'warn',
            'prefer-const': 'error',
            'quotes': ['error', 'single', {
                'allowTemplateLiterals': true,
                'avoidEscape': true,
            }],
            // Use import-x sort rules instead
            'sort-imports': ['off'],
            'yoda': 'error',
        }
    },

    {
        // Turn off rules that will cause errors with chai
        files: [
            'test/*.ts',
        ],

        rules: {
           'no-unused-expressions': 'off',
           '@typescript-eslint/no-unused-expressions': 'off',
        }
    },

    // Lint JSON
    {
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        plugins: { json },
        language: 'json/json',
        ...json.configs.recommended,
        //extends: [ tseslint.configs.disableTypeChecked],   
    },

    // Lint JSONC
    {
        files: ['**/*.jsonc', '.vscode/*.json'],
        plugins: { json },
        language: 'json/jsonc',
        ...json.configs.recommended,
    },

    // Lint Markdown
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/gfm',
        extends: [ 'markdown/recommended' ],
    },

    // Lint YAML
    {
        files: [ '**/*.yaml', '**/*.yml' ],
        extends: [ yml.configs['flat/recommended'] ],
    },

    esPrettier,
])