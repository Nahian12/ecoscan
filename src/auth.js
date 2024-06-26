import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabase";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import React from 'react'


const authContext = createContext();

export const AuthProvider = ({children}) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const {error, user} = await supabase.auth.signInWithPassword({email,password})
    
        if(error) {
            console.log(error)
        }

        return {error, user}
    }

    const logout = async () => {
        const {error} = await supabase.auth.signOut()

        if(error) {
            console.log(error)
        }

        setUser(null);
    }

    // useEffect(() => {
    //     const user = supabase.auth.getUser()
    //     setUser(user)

    //     const auth = supabase.auth.onAuthStateChange((event, session) => {
    //         if(event === 'SIGNED_IN') {
    //             setUser(session.user)
    //         }

    //         if(event === 'SIGNED_OUT') {
    //             setUser(null)
    //         }
    //     })

    //     return () => auth.data.unsubscribe();
    // }, [])

    return {
        user, login, logout
    }
}