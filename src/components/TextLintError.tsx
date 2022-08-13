/**
 * External dependencies
 */
import { Stack, Alert, Card } from '@mui/material';

const TextLintError = () => {
	return (
		<Stack spacing={ 2 }>
			{ [ 0, 1, 2, 3, 4, 5 ].map( ( item, index ) => (
				<Card key={ index }>
					<Alert severity="error">{ item }エラーメッセージが入ります。</Alert>
				</Card>
			) ) }
		</Stack>
	);
};

export default TextLintError;
