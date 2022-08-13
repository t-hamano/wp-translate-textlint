/**
 * External dependencies
 */
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

/**
 * Internal dependencies
 */
import HeaderNav from './HeaderNav';

const Header = () => {
	return (
		<AppBar position="static" className="header">
			<Container maxWidth="lg">
				<Toolbar>
					<Typography variant="h1" sx={ { flexGrow: 1 } }>
						WP Translate Textlint
					</Typography>
					<HeaderNav />
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
