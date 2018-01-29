import config from 'config';

export const requisitionService = {
    getAll,
    getById,
    getContains
};
function getAll(){
    return fetch(`${config.apiRoot}reqprofproj/`).then(handleResponse);
}

function getById(id){
    return fetch(`${config.apiRoot}reqprofproj/`+id).then(handleResponse);
}

function getContains(input){
    return fetch(`${config.apiRoot}reqprofproj/`+input).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}