// inferno module
import {render} from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './MyApp';
import VersionComponent from './VersionComponent';
import Flat1dComponent from './Flat1dComponent';
import Fold1dComponent from './Fold1dComponent';

if (module.hot) {
    require('inferno-devtools');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ MyApp }>
			<Route path="/" component={ VersionComponent } />
   <Route path="/flat1d" component={ Flat1dComponent } />
   <Route path="/fold1d" component={ Fold1dComponent } />
		</Route>
	</Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}
