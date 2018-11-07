// Dependencias
import React from 'react';
//import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Routes
import AppRoutes from './routes';

//import App from './components/App';
//import * as serviceWorker from './serviceWorker';

// Assets
import './index.css';

/*ReactDOM.render(    
    <App />, document.getElementById('root')
);*/

render(    
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
