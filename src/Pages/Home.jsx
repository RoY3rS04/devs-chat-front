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

    console.log(authUser)

    if (loading) {
        return 'Loading...'
    }
    
    return (
        <>
            <div className="w-screen h-screen flex gap-x-10 font-[Rubik] p-3 isolate relative md:block">
                {authUser?._id ?
                    (
                        <>
                            <div className="md:hidden">
                                <Aside user={authUser} modalState={{deleteModal, setDeleteModal}}></Aside>
                            </div>
                            <main className="container mx-auto flex p-2 flex-col md:h-full">
                                <div className="absolute top-3 md:top-auto md:bottom-5 right-3">
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
                            {groupModal || deleteModal ? (<div className="bg-black opacity-60 absolute top-0 right-0 left-0 bottom-0 z-10">

                            </div>) 
                            : null }
                        </>
                    )
                    : <Navigate to='/login' />
                }
                <div onClick={() => setIsMenuOpen(true)} className="hidden md:block cursor-pointer absolute top-5 right-[20px]">
                    <div className="space-y-1">
                        <div className="w-5 h-1 rounded-sm bg-gray-400"></div>
                        <div className="w-5 h-1 rounded-sm bg-gray-400"></div>
                        <div className="w-5 h-1 rounded-sm bg-gray-400"></div>
                    </div>
                    <Drawer
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        placement="right"
                        size="xs"
                    >
                        <DrawerOverlay />
                        <DrawerContent className="p-4 bg-white">
                            <DrawerCloseButton className="mb-5"/>
                            <DrawerHeader></DrawerHeader>

                            <DrawerBody>
                                <Aside user={authUser} modalState={{deleteModal, setDeleteModal}}></Aside>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </>
    )
}