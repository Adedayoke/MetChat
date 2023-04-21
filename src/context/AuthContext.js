import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import React from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children })=>{
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            setCurrentUser({...user});
        })
    
        
        unsub()
    }, [])
    
    

    return(
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}