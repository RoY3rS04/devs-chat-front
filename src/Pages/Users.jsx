import { useEffect, useState } from "react"
import UserCard from "../components/UserCard"
import myAxios from "../utils/axios";
import useAuth from "../hooks/useAuth";

export default function Users() {

    const [users, setUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {

        async function getUsers() {

            try {
                const { data } = await myAxios.get('/users');

                setUsers(data.users.filter(user => user._id !== authUser._id));
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();

    }, []);

    return (
        <>
            <h1 className="text-2xl font-medium mb-5">Users</h1>
            <div className="grid grid-cols-2 gap-4">
                {users.map((user) => <UserCard key={user._id} user={user}></UserCard>)}
            </div>
        </>
    )   

}