import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Aside from "../components/Aside";
import { useLocation } from "react-router-dom";

export default function Home() {
    
    const { authUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return 'Loading...'
    }

    return (
        <>
            <div className="w-screen h-screen flex gap-x-10 font-[Rubik] p-3">
                {authUser?._id ?
                    (
                        <>
                            <Aside user={authUser}></Aside>
                            <main className="container mx-auto overflow-y-scroll">
                                <h1 className="font-medium text-3xl mb-10">{location.pathname !== '/' ? location.pathname.slice(1)[0].toUpperCase() + location.pathname.slice(2) : ''}</h1>
                                <Outlet />
                            </main>
                        </>
                    )
                    : <Navigate to='/login' />
                }
            </div>

        </>
    )
}