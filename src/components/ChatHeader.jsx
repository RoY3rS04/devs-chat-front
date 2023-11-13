import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function ChatHeader({ chat }) {
    const location = useLocation();

    const [name, setName] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {

        if (location.pathname.includes('group')) {
            setImg(chat.img.split('*')[0]);
            setName(chat.name);
        } else {
            setImg(chat.user.img.split('*')[0]);
            setName(chat.user.name);
        }

    }, [])

    return (
        <>
            <header className="flex items-center gap-x-5 mb-4">
                <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                    <img className="w-full h-full" src={img} alt="User Image" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-medium">{name}</h2>
                    <span>online</span>
                </div>
            </header>
        </>
    )
}