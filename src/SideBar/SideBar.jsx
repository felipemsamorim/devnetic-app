import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SideBar extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(userActions.getById());
    }


    render() {
        const { user } = this.props;
        return (
                <nav style={{height:"100vh"}} className="navbar navbar-default sidebar" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                                <h4>{user.user[0].nome}</h4><Link to="/login">Logout</Link>
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
                            <ul className="nav navbar-nav" style={{width:"100%"}}>
                            <li><Link to="/professional">Cadastro <span style={{ fontSize: "25px", position: "absolute", top: "20%", right: "10%" }} className="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></Link></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Demandas <span className="caret"></span><span style={{ fontSize: "25px", position: "absolute", top: "20%", right: "10%" }} className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></a>
                                    <ul className="dropdown-menu forAnimate" role="menu">
                                        <li><Link to="/">em aberto</Link></li>
                                        <li><a href="#">em curso</a></li>
                                        <li><a href="#">fechadas</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar };