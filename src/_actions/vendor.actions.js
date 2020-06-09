import { userService } from '../_services/';
import { history } from '../_helpers';

export const vendorAction = {
    getVendor,
    onChangeProps,
    createVendor,
    deleteVendorById
};

var  deletedID = [];

function getVendor(id){
    return dispatch => {
        let apiEndpoint = 'employees';
        userService.get(apiEndpoint)
        .then((response)=>{
            // Delete and update is impossible due to using fake API service.
            // This little function here is to check which id has been delete by user and then remove it from the list
            // BUT DO KEEP IN MIND: after refresh the page, all the deleted data will show again since now are using a fake API service, not own database server.
            if(id){
                deletedID.push(id);
                let data = response.data.data;
                data.map((k,v) => {
                    if(deletedID.includes(k.id)){
                        response.data.data.splice(v, 1) 
                    }
                })
            }else{
                deletedID = [];
            }

            dispatch(changeVendorsList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

// calling fake API here: http://dummy.restapiexample.com/api/v1/create
function createVendor(payload){
    return dispatch => {
        let apiEndpoint = 'create';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log('create employees',response);
            dispatch(createUserInfo());
            history.push('/vendor');
        }) 
    }
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function deleteVendorById(id){
    return dispatch => {
        let apiEndpoint = 'delete/' + id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            console.log("delete response", response);
            dispatch(deleteVendorsDetails());
            dispatch(vendorAction.getVendor(id));
        })
    };
}

export function changeVendorsList(vendor){
    return{
        type: "FETECHED_ALL_VENDOR",
        vendor: vendor
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function createUserInfo(){
    return{
        type: "USER_CREATED_SUCCESSFULLY"
    }
}

export function deleteVendorsDetails(){
    return{
        type: "DELETED_VENDOR_DETAILS"
    }
}