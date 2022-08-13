import { useContext } from 'react';

/**
 * External dependencies
 */
import { Stack, Alert, Card, Typography } from '@mui/material';

/**
 * internal dependencies
 */
import { TextLintContext } from '../App';

const TextLintError = () => {
	const { lintError } = useContext( TextLintContext );

	return (
		<>
			{ lintError.length > 0 ? (
				<Stack spacing={ 2 }>
					{ lintError.map( ( error: any, index: number ) => (
						<Card key={ index }>
							<Alert severity="error">{ error.message }</Alert>
						</Card>
					) ) }
				</Stack>
			) : (
				<Typography>エラーはありません。</Typography>
			) }
		</>
	);
};

export default TextLintError;
