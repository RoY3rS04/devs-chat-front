import { useState } from "react";
import useAuth from "../hooks/useAuth"
import myAxios from "../utils/axios";

export default function Profile() {

    const { authUser } = useAuth();
    const [image, setImage] = useState(authUser.img);

    const [name, setName] = useState(authUser.name);

    function handleOnChangeImage(e) {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const { data } = await myAxios.patch('/users', formData, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })

        console.log(data);
    }

    return (
        <>
            <h1 className="text-2xl font-medium mb-5">Profile</h1>
            <section className="flex flex-col items-center">
                <div className="relative">
                    <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover object-center" src={image.split('*')[0]} alt="User image" />
                    </div>
                    <label className="absolute bottom-2 right-4 cursor-pointer isolate" htmlFor="image">
                        <svg className="w-5 h-5 z-[-1]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                        </svg>
                    </label>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3 mt-10 md:w-[90%]">
                    <div className="flex flex-col gap-y-2 w-full">
                        <input onChange={handleOnChangeImage} type="file" name="image" id="image" hidden/>
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
                    {authUser.hasPassword
                        ? (
                            <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="pass">Last Password</label>
                                <input
                                    className="rounded-sm border py-2 px-3"
                                    id="pass"
                                    placeholder="Your password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                        )
                        : null}
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="new_password">{authUser.hasPassword ? 'New Password' : 'Set Password'}</label>
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
        </>
    )
}