import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { tymtuApp } from './actionsAndReducers'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import createBrowserHistory from 'history/createBrowserHistory';
import MainComponent from './components/MainComponent';
import DebugComponent from './components/DebugComponent';
import reactDatetime from 'react-datetime/css/react-datetime.css';

let store = createStore(tymtuApp)

// Log the initial state
// console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

window.store = store;

// const browserHistory = createBrowserHistory();

// const routes = (
// 	<Router history={ browserHistory }>
// 			<Route path="/" component={ MainComponent } />
// 	</Router>
// );

// render(routes, document.getElementById('app'));
// console.log("index: " + store.getState())
// console.log(store.getState().get('events'))

render(
 <Provider store={store}>
   <MainComponent />
   {/* <DebugComponent/> */}
 </Provider>,
 document.getElementById('app')
)

if (module.hot) {
    module.hot.accept()
}
