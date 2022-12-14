import { useContext } from 'react';

/**
 * External dependencies
 */
import { TextlintKernel } from '@textlint/kernel';
import Button from '@mui/material/Button';

/**
 * internal dependencies
 */
import { TextLintContext } from '../App';
import { textlintOptions } from '../constants';

const textlintKernel = new TextlintKernel();

const LintButton = () => {
	const { code, setLintError } = useContext( TextLintContext );

	const handleOnClick = () => {
		if ( ! code ) return;
		textlintKernel.lintText( code, textlintOptions ).then( ( result ) => {
			setLintError( result.messages );
		} );
	};

	return (
		<Button variant="contained" color="primary" size="large" onClick={ handleOnClick }>
			翻訳文をチェックする
		</Button>
	);
};

export default LintButton;
