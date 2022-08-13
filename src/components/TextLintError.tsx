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
	const { lintError } = useContext( TextLintContext );

	return (
		<Stack spacing={ 2 }>
			{ lintError.length > 0 ? (
				lintError.map( ( error: any, index: number ) => (
					<Card key={ index }>
						<Alert severity="error">{ error.message }</Alert>
					</Card>
				) )
			) : (
				<Card>
					<Alert severity="success">エラーはありません。</Alert>
				</Card>
			) }
		</Stack>
	);
};

export default TextLintError;
