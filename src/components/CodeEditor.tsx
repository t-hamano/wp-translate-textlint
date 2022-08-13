/**
 * External dependencies
 */
import { TextlintKernel } from '@textlint/kernel';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

const textlintKernel = new TextlintKernel();

const options = {
	ext: '.md',
	plugins: [
		{
			pluginId: 'markdown',
			plugin: require( 'textlint-plugin-markdown' ),
		},
	],
};

const code = `## Title

\`\`\`jsx
function Demo() {
  return <div>demo</div>
}
\`\`\`

\`\`\`bash
# Not dependent on uiw.
npm install @codemirror/lang-markdown --save
npm install @codemirror/language-data --save
\`\`\`

[weisit ulr](https://uiwjs.github.io/react-codemirror/)

\`\`\`go
package main
import "fmt"
func main() {
  fmt.Println("Hello, 世界")
}
\`\`\`
`;

const CodeEditor = () => {
	textlintKernel.lintText( 'TODO: text', options ).then( () => {} );

	return (
		<div className="code-editor">
			<CodeMirror
				value={ code }
				extensions={ [ markdown( { base: markdownLanguage, codeLanguages: languages } ) ] }
			/>
		</div>
	);
};

export default CodeEditor;
