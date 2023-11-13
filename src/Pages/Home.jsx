import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Aside from "../components/Aside";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, 
} from "@chakra-ui/react";

export default function Home() {
    
    const { authUser, loading } = useAuth();
    const location = useLocation();
    const [groupModal, setGroupModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (loading) {
        return 'Loading...'
    }
    
    return (
        <>
            <div className="w-screen h-screen flex gap-x-10 font-[Rubik] p-3 relative md:block">
                {authUser?._id ?
                    (
                        <>
                            <Aside user={authUser} modalState={{deleteModal, setDeleteModal}}></Aside>
                            <main className="container mx-auto flex p-2 flex-col md:h-full">
                                <div className="absolute top-3 right-3">
                                    {!location.pathname.split('/')[2] && location.pathname.includes('groups') ? (
                                        <button onClick={() => setGroupModal(true)}>
                                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                            </svg>
                                        </button>
                                    ) : null}
                                </div>
                                <Outlet context={[groupModal, setGroupModal]}/>
                            </main>
                            {groupModal || deleteModal ? (<div className="bg-black opacity-60 absolute top-0 right-0 left-0 bottom-0">

                            </div>) 
                            : null }
                        </>
                    )
                    : <Navigate to='/login' />
                }
                <div onClick={() => setIsMenuOpen(true)} className="hidden md:block cursor-pointer bg-red-500 h-4 w-4 rounded-full absolute top-4 right-4">
                    <Drawer
                        className='z-10'
                        isOpen={isMenuOpen}
                        placement="right"
                        onClose={() => setIsMenuOpen(false)}
                        size='xs'
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton/>
                            <DrawerHeader></DrawerHeader>

                            <DrawerBody>
                                <h1>Hi</h1>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </>
    )
}