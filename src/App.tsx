import CodeEditor from './components/CodeEditor';
import TextLintError from './components/TextLintError';

const App = () => {
	return (
		<div className="row">
			<CodeEditor />
			<TextLintError />
		</div>
	);
};

export default App;
