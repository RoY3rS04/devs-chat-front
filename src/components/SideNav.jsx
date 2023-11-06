import { Link } from "react-router-dom";

export default function SideNav() {
    return (
        <nav>
            <ul className="flex flex-col gap-y-7 items-center">
                <Link to='/chats' className="text-sm font-medium">Chats</Link>
                <Link to='/your-groups' className="text-sm font-medium">Your Groups</Link>
                <Link to='/users' className="text-sm font-medium">Users</Link>
                <Link to='/groups' className="text-sm font-medium">Groups</Link>
                <Link to='/chat' className="text-sm font-medium">Global Chat</Link>
                <Link to='/profile' className="text-sm font-medium">Profile</Link>
            </ul>
        </nav>
    )
}