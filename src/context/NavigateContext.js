import { createContext, useContext, useEffect, useReducer, useState } from "react";
import React from "react";

export const NavigateContext = createContext();

export const NavigateProvider = ({children})=>{
    const INITIAL_STATE = {
        viewingChat: true
    }
    const chatViewReducer = (state, action)=>{

        if(action.type === "CHANGE_VIEWING_STATE_TRUE"){
            console.log("set to true")
            return{
                ...state,
                viewingChat: true
            }
        }
        if(action.type === "CHANGE_VIEWING_STATE_FALSE"){
            console.log("set to false")
            return{
                ...state,
                viewingChat: false
            }
        }
        return state;
    }

    const [state, dispatch] = useReducer(chatViewReducer, INITIAL_STATE)


    return(
        <NavigateContext.Provider value={{viewingState: state, changeViewdispatch: dispatch}}>
            {children}
        </NavigateContext.Provider>
    )
}