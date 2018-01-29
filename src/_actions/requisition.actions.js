import { requisitionConstants } from '../_constants';
import { requisitionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const requisitionActions = {
   /* insert,
    update,*/
    getAll,
    getById,
    getContains
    //delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        requisitionService.getAll()
            .then(
                requisition => dispatch(success(requisition)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: requisitionConstants.GETALL_REQUEST } }
    function success(requisition) { return { type: requisitionConstants.GETALL_SUCCESS, requisition } }
    function failure(error) { return { type: requisitionConstants.GETALL_FAILURE, error } }
}

function getById() {
    return dispatch => {
        dispatch(request());

        requisitionService.getById()
            .then(
                requisition => dispatch(success(requisition)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: requisitionConstants.GETBYID_REQUEST } }
    function success(requisition) { return { type: requisitionConstants.GETBYID_SUCCESS, requisition } }
    function failure(error) { return { type: requisitionConstants.GETBYID_FAILURE, error } }
}

function getContains(input) {
    return dispatch => {
        dispatch(request());

        requisitionService.getContains(input)
            .then(
                requisition => dispatch(success(requisition)),
                error => dispatch(failure(error))
            );
    };

    function request(input) { return { type: requisitionConstants.GETCONTAINS_REQUEST, input } }
    function success(requisition) { return { type: requisitionConstants.GETCONTAINS_SUCCESS, requisition } }
    function failure(error) { return { type: requisitionConstants.GETCONTAINS_FAILURE, error } }
}