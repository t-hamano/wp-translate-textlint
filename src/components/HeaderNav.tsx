/**
 * External dependencies
 */
import { useState } from 'react';
import { Button, Link, Modal, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

/**
 * Internal dependencies
 */
import { githubRepoUrl } from '../constants';
import packageJson from '../../package.json';

const modalStyle = ( theme: any ) => ( {
	position: 'absolute',
	width: '500px',
	maxWidth: '100%',
	backgroundColor: theme?.palette?.background?.paper,
	top: `50%`,
	left: `50%`,
	transform: `translate(-50%, -50%)`,
	boxShadow: theme?.shadows?.[ 5 ],
	padding: theme?.spacing?.( 3 ),
	boxSizing: 'border-box',
} );

const HeaderNav = () => {
	const [ isHelpOpen, setIsHelpOpen ] = useState( false );

	const handleHelpOpen = () => setIsHelpOpen( true );
	const handleHelpClose = () => setIsHelpOpen( false );

	return (
		<>
			<Stack direction="row" alignItems="center" spacing={ 2 }>
				<Button color="inherit" onClick={ handleHelpOpen }>
					HELP
				</Button>
				<Link color="inherit" underline="none" href={ githubRepoUrl } target="_blank">
					<Button color="inherit">
						GitHuB
						<OpenInNewIcon sx={ { ml: 1 } } />
					</Button>
				</Link>
				{ packageJson.version && (
					<Typography variant="caption">{ `version: ${ packageJson.version }` }</Typography>
				) }
			</Stack>
			<Modal
				open={ isHelpOpen }
				onClose={ handleHelpClose }
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Stack sx={ modalStyle } spacing={ 2 }>
					<Typography variant="h2">WP Translate Textlint について</Typography>
					<Typography>
						「WP Translate Textlint」は、日本語文が WordPress
						の翻訳スタイルガイドに沿っているかをチェックするツールです。
					</Typography>
					<Typography>
						<Link href="https://github.com/textlint/textlint" target="_blank">
							textlint
						</Link>
						というツールを使い、WordPress 独自のルールを追加しています。
					</Typography>
					<Typography>
						機械的なチェックのため、誤検出される場合もあります。最終的な調整は、以下のドキュメントを確認して行って下さい。
					</Typography>
					<ul>
						<li>
							<Link
								href="https://ja.wordpress.org/team/handbook/translation/translation-style-guide/"
								target="_blank"
							>
								翻訳スタイルガイド
							</Link>
						</li>
						<li>
							<Link
								href="https://translate.wordpress.org/locale/ja/default/glossary/"
								target="_blank"
							>
								日本語翻訳向け用語集
							</Link>
						</li>
					</ul>
				</Stack>
			</Modal>
		</>
	);
};

export default HeaderNav;
