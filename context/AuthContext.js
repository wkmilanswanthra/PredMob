import React, { createContext, useState } from 'react';

export const authContext = createContext(null);

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({ id: '', name: '', email: '', profileImg: '', authMethod: ''});
    const [bestChoiceData, setBestChoiceData] = useState({});
    const [altData, setAltData] = useState({});
    const [players, setPlayers] = useState({});

    return (
        <authContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, bestChoiceData, setBestChoiceData, altData, setAltData, players, setPlayers }}>
            {props.children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;
