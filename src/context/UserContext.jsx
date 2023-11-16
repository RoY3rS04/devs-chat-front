import { createContext, useEffect, useState } from "react";
import myAxios from "../utils/axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function authenticate() {
            await isAuthUser();
        };

        authenticate();
    }, [])

    async function isAuthUser() {

        const {token: sessionToken, ok: sessionOk} = await verifySession();
        const { token: localToken, ok: tokenOk } = verifyToken();
        
        let token;

        if (!sessionOk && !tokenOk) {
            setLoading(false);
            return setAuthUser(null);
        }

        if (localToken) {
            token = localToken;
        } else {
            token = sessionToken;
        }

        localStorage.setItem('token', token);

        try {
            
            const { data } = await myAxios.get('/auth', {
                headers: {
                    'x-token': token
                }
            });

            setAuthUser(data);

        } catch (error) {
            console.log(error);
        }

        setLoading(false);
        //window.location.replace('/');
    }

    async function verifySession() {

        const { data } = await myAxios.get('/auth/session');

        return {
            ok: data.ok,
            token: data.token
        };
    }

    function verifyToken() {

        const token = localStorage.getItem('token');

        if (!token) {
            return {
                ok: false
            };
        }

        return {
            ok: true,
            token
        };
    }

    return (
        <UserContext.Provider value={{
            setAuthUser,
            authUser,
            loading,
            isAuthUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserProvider
};

export default UserContext;