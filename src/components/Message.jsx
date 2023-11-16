import clsx from "clsx"
import useAuth from "../hooks/useAuth"
import { format } from "timeago.js";
import { useLocation } from "react-router-dom";

export default function Message({ message }) {

    const location = useLocation();

    const { authUser } = useAuth();
    
    return (
        <div className={`flex ${clsx({
            'justify-end': message.user._id === authUser._id
        })}`}>
            <div className="max-w-[70%]">
                <div className={`flex gap-x-3`}>
                {message.user._id !== authUser._id ? (<div className="min-w-[32px] h-8 overflow-hidden rounded-full">
                    <img className="w-full h-full" src={message.user.img.split('*')[0]} alt="User image" />
                </div>) : null}
                <div className={`p-2 rounded-[10px] flex gap-x-5 text-sm ${clsx({
                    'bg-blue-600 text-white': message.user._id === authUser._id,
                    'bg-gray-200': message.user._id !== authUser._id
                })}`}>
                    <div className="space-y-2">
                            {location.pathname.includes('group') && authUser._id !== message.user._id ? <span className="text-xs block font-medium">{message.user.name}</span> : null}
                            {message.content}
                    </div>
                </div>
            </div>
                <span className="text-xs block text-end">{format(message.createdAt)}</span>
            </div>
        </div>
    )
}