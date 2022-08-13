import type { ThemeOptions } from '@mui/material/styles';

export const githubRepoUrl = 'https://github.com/t-hamano/wp-translate-textlint' as const;

export const themeOptions: ThemeOptions = {
	typography: {
		fontFamily: '"Open Sans", sans-serif',
		h1: {
			fontSize: 30,
			fontWeight: 600,
		},
		h2: {
			fontSize: 24,
			fontWeight: 600,
		},
	},
	palette: {
		primary: {
			main: '#007cba',
			dark: '#007cba',
		},
	},
} as const;
