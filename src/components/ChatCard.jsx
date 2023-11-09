import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function ChatCard({ chat }) {

    const { authUser } = useAuth();
    const { sender, receiver } = chat;

    const user = [sender, receiver].find(user => user._id !== authUser._id);
    const lastMessage = chat.messages[chat.messages.length - 1];

    return (
        <Link to={`/chats/${chat._id}`} className="flex items-center gap-x-3">
            <div className="w-7 h-7 rounded-full overflow-hidden">
                <img className="w-full h-full" src={user.img.split('*')[0]} alt="User image" />
            </div>
            <div className="space-y-1">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm">
                    {lastMessage?.content} 
                    <span className="text-gray-400 text-xs">{lastMessage?.createdAt}</span>
                </p>
            </div>
        </Link>
    )
}