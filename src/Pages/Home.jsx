import { useEffect } from "react";
import myAxios from "../utils/axios"
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        isAuthUser();
    })

    async function isAuthUser() {

        console.log(await verifySession(), verifyToken())

        if (!await verifySession() && !verifyToken()) {
            navigate('/login');
        }

    }

    async function verifySession() {

        const { data } = await myAxios.get('auth/session');

        console.log(data);

        return data.ok;
    }

    function verifyToken() {

        const token = localStorage.getItem('token');

        if (!token) {
            return false;
        }

        return true;
    }
        
    return (
        <>
            <h1>WELCOME HOMIE!</h1>
        </>
    )
}