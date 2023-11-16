import useAuth from "../hooks/useAuth"
import myAxios from "../utils/axios";

export default function UserCard({ user }) {

    const { authUser } = useAuth();

    async function createChat() {
        const { data } = await myAxios.post('/chats/create', {
            receiver: user._id
        }, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    return (
        <div className="flex gap-x-4 items-center md:gap-y-2">
            <div className="rounded-full overflow-hidden w-8 h-8 ">
                <img className="w-full h-full" src={user.img.split('*')[0]} alt="User image" />
            </div>
            <div>
                <h2 className="font-medium">{user.name}</h2>
                {authUser._id !== user._id ?
                    <button onClick={createChat} className="bg-blue-600 px-3 rounded-xl text-xs font-medium text-white">Chat</button>
                : null}
            </div>
        </div>
    )
}