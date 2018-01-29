import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { SideBar } from '../SideBar';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ProfessionalPage } from '../ProfessionalPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        const routes = [
            {
                path: '/',
                exact: true,
                sidebar: SideBar,
                menu: HomePage
            },
            {
                path: '/professional',
                exact: true,
                sidebar: SideBar,
                menu: ProfessionalPage
            },
            
        ]
        return (
            <div>
                {alert.message &&
                    <div style={{position:"absolute",zIndex:"100",top:"10%",left:"46%"}}className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                   
                    <div className="row">
                    {routes.map((route, index) => (
                       //rotas sidebar
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.sidebar}
                        />
                    ))}
                    {
                        //Rotas main
                    }
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/professional" component={ProfessionalPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 