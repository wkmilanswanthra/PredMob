import React, { createContext, useState } from 'react';

export const authContext = createContext(null);

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({ id: '', name: '', email: '', profileImg: '', authMethod: ''});
    const [bestChoiceData, setBestChoiceData] = useState({});
    const [altData, setAltData] = useState({});
    // const [data, setData] = useState({});

    return (
        <authContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, bestChoiceData, setBestChoiceData, altData, setAltData }}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;
