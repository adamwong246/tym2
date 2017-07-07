import { render } from 'react-dom';

// routing modules
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import MainComponent from './MainComponent';
const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
			<Route path="/" component={ MainComponent } />
	</Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}
