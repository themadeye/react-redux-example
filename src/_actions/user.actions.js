import { userService } from '../_services/';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout
};
// Here using reqres.in for login.
// return an access token : "QpwL5tke4Pnpja7X4"
function login(username, password){
    return dispatch => {
        let apiEndpoint = 'login';
        let payload = {
            username: username,
            password: password
        }
        userService.login(apiEndpoint, payload)
        .then((response)=>{
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('auth', response.data.auth);
                dispatch(setUserDetails(response.data));
                history.push('/vendor');
            }
        })
    };
}

function logout(){
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(user){
    return{
        type: "LOGIN_SUCCESS",
        auth: user.auth,
        token: user.token
    }
}

export function logoutUser(){
    return{
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ''
    }
}