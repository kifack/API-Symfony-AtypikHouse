import{LOAD_END} from "./../actions/types";
const initialState = {
    load:false
}

export default function (state = initialState, action){

    const { type, payload} = action;
    switch(type){
        case 'LOAD_END':
            return{
                ...state,
                load: true
            }
        default:
            return state;
    }
}