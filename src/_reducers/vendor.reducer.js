const initialState = { anchor: 'left',
    vendor: [],
    open: false,
    id: '',  
    name: '',
    salary: '',
    age: ''
 };


export function vendor(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_VENDOR':
            return {
            ...state,
            vendor: action.vendor
            };
        case 'VENDOR_DETAIL':
            return {
                ...state,
                id: action.id,  
                name: action.name,
                salary: action.salary,
                age: action.age
            };
        case "USER_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };    
        default:
            return state
    }
  }