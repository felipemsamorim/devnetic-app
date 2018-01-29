import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { requisitionActions, userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.search = this.search.bind(this)
        this.collapseAll = this.collapseAll.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(requisitionActions.getAll());
        this.props.dispatch(userActions.getById());
    }

    search(e) {
        e.preventDefault();
        return this.props.dispatch(requisitionActions.getContains(e.target.value));
    }

    collapseAll(e){
        this.refs[e.target.id].className = ''
        this.refs['vtab'+e.target.id].className = 'tab-pane fade'
    }


    render() {
        const { user, users, requisitions} = this.props;
        return (
            <div className="col-md-8">
                <h3>DEMANDAS:</h3>
                <form style={{ paddingBottom: '3%' }}>
                    <label htmlFor="search">Pesquisa </label>
                    <input onKeyUp={this.search} type="text" name="search" placeholder="pesquisa por palavra-chave" className="form-control" />
                </form>
                {requisitions.items &&
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="nav nav-tabs nav-tabs-left">
                                    {requisitions.items.map((r, index) =>
                                        <li ref={r._id} key={index}><a href={"#vtab" + r._id} data-toggle="tab">{r.categoria}
                                            <i style={{ position: 'absolute', right: '0%' }} className="fa fa-fw fa-arrow-circle-right"></i></a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="col-md-7">
                                <div className="tab-content">
                                    {requisitions.items.map((r, index) =>
                                        <div key={index}className="tab-pane fade" id={"vtab" + r._id} ref={"vtab" + r._id}>
                                            <ul style={{ listStyleType: 'none' }}>
                                                <h3 className="block-title text-weight-strong text-uppercase">Requisitos necessários</h3>
                                                {r.especificacoes.map((e, i) => <li key={i} className="list-group-item">{e}</li>)}
                                                <div style={{marginTop:"2%"}}>
                                                <button type="button" className="btn btn-info" >Aceitar demanda</button>
                                                <button style={{marginLeft:"2%"}} type="button" className="btn btn-danger" id={r._id} onClick={this.collapseAll}>Cancelar</button>
                                                </div>
                                                
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, requisitions } = state;
    const { user } = authentication;
    return {
        user,
        users,
        requisitions
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };