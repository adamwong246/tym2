import {version} from 'inferno';
import {DB} from './data.js'

function showVersion() {
	alert(`The version is: ${ version }!`);
}

export default function VersionComponent() {
	return (
		<div>
			<p>This is an Inferno Boilerplate example using <em>Inferno { version }</em>.</p>
			<button onClick={ showVersion }>Show version</button>
			<pre><code>{JSON.stringify(DB, null, 2)}</code></pre>
		</div>
	);
}
