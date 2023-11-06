import { useEffect } from "react";
import Aside from "../components/Aside";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const { authUser } = useAuth();
    const navigate = useNavigate();

    console.log(authUser)
        
    return (
        <>
            <Aside></Aside>
        </>
    )
}