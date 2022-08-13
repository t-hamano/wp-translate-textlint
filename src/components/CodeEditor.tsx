import { useContext } from 'react';

/**
 * External dependencies
 */
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

/**
 * internal dependencies
 */
import { TextLintContext } from '../App';

const CodeEditor = () => {
	const { code, setCode, setLintError } = useContext( TextLintContext );

	const handleOnChange = ( value: string ) => {
		setCode( value );

		if ( ! value ) {
			setLintError( [] );
		}
	};

	return (
		<div className="code-editor">
			<CodeMirror
				value={ code }
				extensions={ [ markdown( { base: markdownLanguage, codeLanguages: languages } ) ] }
				onChange={ handleOnChange }
			/>
		</div>
	);
};

export default CodeEditor;
