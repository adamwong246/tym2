// inferno module
import {render} from 'inferno';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// app components
import MyApp from './MyApp';
import MainComponent from './MainComponent';
import Flat1dComponent from './Flat1dComponent';
import Flat2dComponent from './Flat2dComponent';
import Fold1dComponent from './Fold1dComponent';
import Fold2dComponent from './Fold2dComponent';
import Fold2dComponent2 from './Fold2dComponent2';

import Flat from './Flat';
import Fold from './Fold';

if (module.hot) {
    require('inferno-devtools');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Router history={ browserHistory }>
		<Route component={ MyApp }>
			<Route path="/" component={ MainComponent } />
   <Route path="/flat1d" component={ Flat1dComponent } />
   <Route path="/fold1d" component={ Fold1dComponent } />
   <Route path="/flat2d" component={ Flat2dComponent } />
   <Route path="/fold2d" component={ Fold2dComponent } />
   <Route path="/fold2d2" component={ Fold2dComponent2 } />
   <Route path="/flat" component={ Flat } />
   <Route path="/fold" component={ Fold } />

		</Route>
	</Router>
);

render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}
