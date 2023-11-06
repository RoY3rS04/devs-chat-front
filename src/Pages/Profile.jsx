import { useState } from "react";
import useAuth from "../hooks/useAuth"
import myAxios from "../utils/axios";

export default function Profile() {

    const { authUser } = useAuth();

    const [name, setName] = useState(authUser.name);


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const { data } = await myAxios.patch('users', formData, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        console.log(data);
    }

    return (
        <section className="flex flex-col items-center">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <img className="w-full h-full" src={authUser.img.split('*')[0]} alt="User image" />
            </div>
            <form onSubmit={handleSubmit} className="mt-10 space-y-3 min-w-[400px]">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name">Name</label>
                    <input
                        className="rounded-sm border py-2 px-3"
                        id="name"
                        placeholder="Your name"
                        name="name"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="pass">Last Password</label>
                    <input
                        className="rounded-sm border py-2 px-3"
                        id="pass"
                        placeholder="Your password"
                        name="password"
                        type="password"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="new_password">New Password</label>
                    <input
                        className="rounded-sm border py-2 px-3"
                        id="new_password"
                        placeholder="Your new password"
                        name="new_password"
                        type="password"
                    />
                </div>
                <button className="w-full py-2 px-3 rounded-md text-white bg-blue-600 font-semibold">Update Info</button>
            </form>
        </section>
    )
}