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
		<AppBar position="static" className="header" sx={ { py: { xs: 2, md: 0 } } }>
			<Container maxWidth="lg">
				<Toolbar sx={ { flexFlow: { xs: 'column', md: 'row' }, justifyContent: 'center' } }>
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
