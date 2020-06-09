import axios from 'axios';
import config from '../config/config';


export const userService = {
    get,
    post,
    put,
    deleteDetail,
    login
};

function login(apiEndpoint, payload){
    return axios.post(config.loginUrl+apiEndpoint, payload, getOptions()).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function get(apiEndpoint){
    return axios.get(config.baseUrl+apiEndpoint).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    })
}

// Post function here, but now just using a fake API service so POST method here will never use
function post(apiEndpoint, payload){
    return axios.post(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function put(apiEndpoint, payload){
    return axios.put(config.baseUrl+apiEndpoint, payload).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function deleteDetail(apiEndpoint){
    return axios.delete(config.baseUrl+apiEndpoint).then((response)=>{
        return response;
    }).catch((err)=>{
        console.log(err);
    })
}

function getOptions(){
    let options = {}; 
    if(localStorage.getItem('token')){
        options.headers = { 'x-access-token': localStorage.getItem('token') };
    }
    return options;
}