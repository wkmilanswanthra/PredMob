import React, { createContext, useState } from 'react';

export const authContext = createContext(null);

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({ id: '', name: '', email: '', profileImg: '', authMethod: ''});

    return (
        <authContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo }}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;
