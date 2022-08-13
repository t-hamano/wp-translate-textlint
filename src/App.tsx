import { createContext, useState } from 'react';
/**
 * External dependencies
 */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Box } from '@mui/material';

/**
 * internal dependencies
 */
import { themeOptions } from './constants';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import TextLintError from './components/TextLintError';
import LintButton from './components/LintButton';

export const TextLintContext = createContext< any >( {
	code: '',
	lintError: [],
	setLintError: () => undefined,
} );

const App = () => {
	const [ code, setCode ] = useState();
	const [ lintError, setLintError ] = useState( [] );
	const theme = createTheme( themeOptions );
	// const test = createTheme();
	// console.log( test );

	return (
		<ThemeProvider theme={ theme }>
			<Box mb={ 6 }>
				<Header />
			</Box>
			<TextLintContext.Provider value={ { code, setCode, lintError, setLintError } }>
				<Container maxWidth="xl">
					<Box display="flex" mb={ 6 } alignItems="flex-start">
						<Box sx={ { flex: 1 } }>
							<CodeEditor />
						</Box>
						<Box sx={ { width: 300, ml: 3 } }>
							<TextLintError />
						</Box>
					</Box>
					<LintButton />
				</Container>
			</TextLintContext.Provider>
		</ThemeProvider>
	);
};

export default App;
