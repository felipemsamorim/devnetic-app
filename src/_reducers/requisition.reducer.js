import { requisitionConstants } from '../_constants';

export function requisitions(state = {}, action) {
  switch (action.type) {
    case requisitionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case requisitionConstants.GETALL_SUCCESS:
    return {
        items: action.requisition
      };
    case requisitionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

      case requisitionConstants.GETCONTAINS_REQUEST:
      return {
        loading: true
      };
    case requisitionConstants.GETCONTAINS_SUCCESS:
    return {
        items: action.requisition
      };
    case requisitionConstants.REQUISITIONS_GETCONTAINS_FAILURE:
      return { 
        error: action.error
      };

    case requisitionConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(requisition =>
            requisition.id === action.id
            ? { ...requisition, deleting: true }
            : requisition
        )
      };
    case requisitionConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(requisition => requisition.id !== action.id)
      };
    case requisitionConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (requisition.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...requisitionCopy } = requisition;
            // return copy of user with 'deleteError:[error]' property
            return { ...requisitionCopy, deleteError: action.error };
          }

          return requisition;
        })
      };
    default:
      return state
  }
}