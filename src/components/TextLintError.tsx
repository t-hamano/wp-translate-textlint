import { useContext } from 'react';

/**
 * External dependencies
 */
import { Stack, Alert, Card } from '@mui/material';

/**
 * internal dependencies
 */
import { TextLintContext } from '../App';

const TextLintError = () => {
	const { code, lintError } = useContext( TextLintContext );

	return (
		<Stack spacing={ 2 }>
			{ ! code && (
				<Card>
					<Alert severity="error">文章を入力して下さい。</Alert>
				</Card>
			) }
			{ code &&
				lintError.length > 0 &&
				lintError.map( ( error: any, index: number ) => (
					<Card key={ index }>
						<Alert severity="error">{ error.message }</Alert>
					</Card>
				) ) }
			{ code && lintError.length === 0 && (
				<Card>
					<Alert severity="success">エラーはありません。</Alert>
				</Card>
			) }
		</Stack>
	);
};

export default TextLintError;
