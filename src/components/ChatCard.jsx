import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { format } from 'timeago.js';

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
                {lastMessage ? <p className="text-sm">
                    {`${lastMessage.user === authUser._id ? 'You: ' : `${user.name}: `} ${lastMessage.content}` + ' '}
                    <span className="text-gray-400 text-xs">{format(lastMessage.createdAt)}</span>
                </p> : null }
            </div>
        </Link>
    )
}