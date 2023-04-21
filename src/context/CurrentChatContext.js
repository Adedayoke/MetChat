import { createContext, useContext, useEffect, useReducer, useState } from "react";
import React from "react";

export const CurrentChatContext = createContext();

export const CurrentChatContextProvider = ({children})=>{
    const INITIAL_STATE = {
        currentChat: null
    }
    const currentChatReducer = (state, action)=>{

        if(action.type === "CHANGE_CURRENT_CHAT"){
            console.log(action.type)
            return{
                ...state,
                currentChat: action.payload
            }
        }
        return state;
    }

    const [state, dispatch] = useReducer(currentChatReducer, INITIAL_STATE)


    return(
        <CurrentChatContext.Provider value={{currentdata: state, currentdispatch: dispatch}}>
            {children}
        </CurrentChatContext.Provider>
    )
}