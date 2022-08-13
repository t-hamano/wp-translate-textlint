import type { ThemeOptions } from '@mui/material/styles';

export const githubRepoUrl = 'https://github.com/t-hamano/wp-translate-textlint' as const;

export const themeOptions: ThemeOptions = {
	typography: {
		fontFamily: '"Open Sans", sans-serif',
		h1: {
			fontSize: 28,
			fontWeight: 600,
		},
		h2: {
			fontSize: 20,
			fontWeight: 600,
		},
		h3: {
			fontSize: 18,
			fontWeight: 600,
		},
		caption: {
			fontSize: 14,
		},
	},
	palette: {
		primary: {
			main: '#007cba',
			dark: '#007cba',
		},
	},
} as const;

export const textlintOptions = {
	ext: '.md',
	plugins: [
		{
			pluginId: 'markdown',
			plugin: require( 'textlint-plugin-markdown' ),
		},
	],
	rules: [
		{
			ruleId: 'no-todo',
			rule: require( 'textlint-rule-no-todo' ).default,
		},
		{
			ruleId: 'no-todo',
			rule: require( 'textlint-rule-no-todo' ).default,
		},
		{
			ruleId: 'ja-space-between-half-and-full-width',
			rule: require( 'textlint-rule-ja-space-between-half-and-full-width' ),
		},
		{
			ruleId: 'max-kanji-continuous-len',
			rule: require( 'textlint-rule-max-kanji-continuous-len' ),
		},
		{
			ruleId: 'no-mixed-zenkaku-and-hankaku-alphabet',
			rule: require( 'textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet' ),
		},
	],
};
