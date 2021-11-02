import {ADD_CUP, SET_CUPS, SET_STATE} from "./actionTypes";

export function addCup(){
    return {
        type: ADD_CUP
    }
}

export function setCups(newAmount){
    return {
        type: SET_CUPS,
        payload: newAmount
    }
}

export function setState(newState){
    return {
        type: SET_STATE,
        payload: newState
    }
}
