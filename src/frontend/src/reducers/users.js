import {  } from '../actions/users'

const initialState = {
    login: '',
    password: '',
    newClient: true,
    role: 'passenger',
}

function users (state = initialState, action) {
    switch (action.type){
        
        default:
            return {...state}
    }
}

export default users