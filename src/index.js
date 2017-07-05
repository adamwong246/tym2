import { render } from 'react-dom';

// routing modules
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './MyApp';
import MainComponent from './MainComponent';
import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';
import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';

import Flat from './Flat';
import Fold from './Fold';

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
