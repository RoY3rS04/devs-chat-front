import clsx from "clsx"
import useAuth from "../hooks/useAuth"

export default function Message({ message }) {

    const { authUser } = useAuth();

    console.log(message);

    return (
        <div className={`flex gap-x-2 ${clsx({
            'justify-end': message.user._id === authUser._id
        })}`}>
            {message.user._id !== authUser._id ? (<div className="w-8 h-8 overflow-hidden rounded-full">
                <img className="w-full h-full" src={message.user.img.split('*')[0]} alt="User image" />
            </div>) : null}
            <div className={`p-2 rounded-[10px] text-sm ${clsx({
                'bg-blue-600 text-white': message.user._id === authUser._id,
                'bg-gray-200': message.user._id !== authUser._id
            })}`}>{message.content}</div>
        </div>
    )
}