import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import {imgConstants} from '../_constants/img.constants'

class ProfessionalPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                user: '',
                password: '',
                email: '',
                pid: '',
                file: '',
                imagePreviewUrl: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files ? e.target.files[0] : '';
        var image = new Image();
        image.src = 'data:image/png;base64,' + imgConstants.userDefault;
        if (file == '') {
            this.setState({
                file: file,
                imagePreviewUrl: image.src
            });
            return false
        }else{
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file)
        }
        
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.user && user.password && user.email) {
            dispatch(userActions.register(user));
        }
    }


    render() {
        const { registering } = this.props;
        const { user, submitted, imagePreviewUrl } = this.state;
        let $imagePreview = null;
        $imagePreview = imagePreviewUrl ? (<img style ={{width: '90px', height:'90px'}} src={imagePreviewUrl} />) : '';

        return (
            <div className="col-md-8">
                <div className="wizard-inner">
                    <div className="connecting-line"></div>
                    <ul className="nav nav-tabs" role="tablist">

                        <li role="presentation" className="active">
                            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                                <span className="round-tab">
                                    <i className="glyphicon glyphicon-folder-open"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation">
                            <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                                <span className="round-tab">
                                    <i className="glyphicon glyphicon-pencil"></i>
                                </span>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                                <span className="round-tab">
                                    <i className="glyphicon glyphicon-picture"></i>
                                </span>
                            </a>
                        </li>

                        <li role="presentation">
                            <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                <span className="round-tab">
                                    <i className="glyphicon glyphicon-ok"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <form role="form" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                    <div className="tab-content">
                        <div className="tab-pane active" role="tabpanel" id="step1">
                            <h3>Informações pessoais</h3>
                            <div className="imgPreview">{$imagePreview}</div>
                            <input ref="file" className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} />
                            <button type="button" onClick={(e) => this._handleImageChange(e)} className="btn btn-default btn-md">Remover</button>
                            <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" className="form-control" name="fullName" value={user.name} onChange={this.handleChange} />
                                {submitted && !user.name &&
                                    <div className="help-block">Full Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.pid ? ' has-error' : '')}>
                                <label htmlFor="fullName">ID</label>
                                <input type="text" className="form-control" name="pid" value={user.pid} onChange={this.handleChange} />
                                {submitted && !user.pid &&
                                    <div className="help-block">ID is required</div>
                                }
                            </div>
                            <ul className="list-inline pull-right">
                                <li><button type="button" className="btn btn-primary next-step">Salvar e continuar</button></li>
                            </ul>
                        </div>
                        <div className="tab-pane" role="tabpanel" id="step2">
                            <h3>Informações academicas</h3>
                            <p>Informações academicas</p>
                            <ul className="list-inline pull-right">
                                <li><button type="button" className="btn btn-default prev-step">Anterior</button></li>
                                <li><button type="button" className="btn btn-primary next-step">Salvar e continuar</button></li>
                            </ul>
                        </div>
                        <div className="tab-pane" role="tabpanel" id="step3">
                            <h3>Step 3</h3>
                            <p>This is step 3</p>
                            <ul className="list-inline pull-right">
                                <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                                <li><button type="button" className="btn btn-default next-step">Skip</button></li>
                                <li><button type="submit" className="btn btn-primary btn-info-full next-step">Finalizar</button></li>
                            </ul>
                        </div>
                        <div className="tab-pane" role="tabpanel" id="complete">
                            <h3>Complete</h3>
                            <p>You have successfully completed all steps.</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedProfessionalPage = connect(mapStateToProps)(ProfessionalPage);
export { connectedProfessionalPage as ProfessionalPage };