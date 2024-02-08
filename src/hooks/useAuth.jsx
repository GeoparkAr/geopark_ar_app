import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc } from "firebase/firestore";

const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser && !authUser.isAnonymous) {
                const docRefResponse = doc(db, "users", authUser.uid);
                setData({
                    user: authUser,
                    docRef: docRefResponse
                });
            } else {
                const docRefResponse = doc(db, "visitors", authUser.uid);
                setData({
                    user: authUser,
                    docRef: docRefResponse
                });
            }

            
        });
    
        return () => unsubscribe();
      }, []);
    return (<AuthContext.Provider value={{data}}>{children}</AuthContext.Provider>)
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
};

