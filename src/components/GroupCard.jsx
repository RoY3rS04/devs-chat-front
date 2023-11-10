import { useLocation } from "react-router-dom";
import myAxios from "../utils/axios"
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function GroupCard({ group }) {

    const location = useLocation();
    const { authUser } = useAuth();

    function isAuthAdmin(users) {

        return users[0] === authUser._id;
    }

    async function joinToGroup() {

        const { data } = await myAxios.put(`/groups/${group._id}/users`, null, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    async function leaveGroup() {

        const { data } = await myAxios.delete(`/groups/${group._id}/users`, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    async function deleteGroup() {

        const { data } = await myAxios.delete(`/groups/${group._id}`, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    return (
        <div className="flex flex-col gap-y-2">
            <Link to={`/groups/${group._id}`} className="flex items-center gap-x-3">
                <div className="rounded-full overflow-hidden w-8 h-8 ">
                    {group.img
                        ? <img className="w-full h-full" src={group.img.split('*')[0]} alt="Group image" />
                        : <></>
                    }
                </div>
                <div>
                    <h2 className="font-medium">{group.name}</h2>
                    <p className="text-sm font-ligth">Members:
                        <span className="font-medium"> {group.users.length}</span>
                    </p>
                </div>
            </Link>
            <div className="flex items-center gap-x-3">
                {location.pathname === '/groups' ? <button onClick={joinToGroup} className="rounded-xl py-1 px-3 bg-blue-600 text-xs font-medium text-white">Join Group</button> : null}
                {location.pathname.includes('you') ? <button onClick={leaveGroup} className="rounded-xl py-1 px-3 bg-red-600 text-xs font-medium text-white">Leave Group</button> : null}
                {isAuthAdmin(group.users) ? <button onClick={deleteGroup} className="rounded-xl py-1 px-3 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" fill="currentColor" /></svg>
                </button> : null}
            </div>
        </div>
    )
}