import React, { createContext, useState } from "react";

// Create a new context
export const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);


    // Pass the login state and login/logout functions to the context provider
    return (
        <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
            </LoginContext.Provider>
    );
};
