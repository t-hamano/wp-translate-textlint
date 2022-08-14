import type { ThemeOptions } from '@mui/material/styles';

export const githubRepoUrl = 'https://github.com/t-hamano/wp-translate-textlint' as const;

// @ts-ignore
import pluginMarkdown from 'textlint-plugin-markdown';
// @ts-ignore
import noTodo from 'textlint-rule-no-todo';
// @ts-ignore
import maxKanjiContinuousLen from 'textlint-rule-max-kanji-continuous-len';
// @ts-ignore
import noMixedZenkakuAndHankakuAlphabet from 'textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet';

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
			plugin: pluginMarkdown,
		},
	],
	rules: [
		// TODOという文字列が入っているかをチェックする
		// See: https://github.com/textlint-rule/textlint-rule-no-todo
		{
			ruleId: 'no-todo',
			rule: noTodo,
		},
		// 漢字が連続する最大文字数を制限する (最大5文字まで)
		// See: https://github.com/textlint-ja/textlint-rule-max-kanji-continuous-len
		{
			ruleId: 'max-kanji-continuous-len',
			rule: maxKanjiContinuousLen,
			options: {
				max: 5,
			},
		},
		// 全角アルファベットをチェックする
		// See: https://github.com/textlint-ja/textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet
		{
			ruleId: 'no-mixed-zenkaku-and-hankaku-alphabet',
			rule: noMixedZenkakuAndHankakuAlphabet,
		},
	],
};
