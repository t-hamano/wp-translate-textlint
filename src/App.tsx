import CodeEditor from './components/CodeEditor';
import TextLintError from './components/TextLintError';
import LintButton from './components/LintButton';

const App = () => {
	return (
		<>
			<div className="row">
				<CodeEditor />
				<TextLintError />
			</div>
			<LintButton />
		</>
	);
};

export default App;
