import myAxios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.target);

        const info = {
            name: form.get('name'),
            password: form.get('password'),
            email: form.get('email')
        };

        try {
            const { data } = await myAxios.post('auth/register', info);

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            navigate('/');

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center font-[Rubik]">
                <div>
                    <h1 className="text-4xl font-bold">Welcome to DevsChat!</h1>
                    <p className="text-lg font-medium text-gray-500 text-center">Please register to enter the app</p>
                    <form onSubmit={handleSubmit} className="mt-10 space-y-3 w-">
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="name">Name</label>
                            <input
                                className="rounded-sm border py-2 px-3"
                                id="name"
                                placeholder="Your name"
                                name="name"
                                type="name"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="email">Email</label>
                            <input
                                className="rounded-sm border py-2 px-3"
                                id="email"
                                placeholder="Your email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="pass">Password</label>
                            <input
                                className="rounded-sm border py-2 px-3"
                                id="pass"
                                placeholder="Your password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <a href='http://localhost:8080/auth/google' className="flex gap-x-3 justify-center border py-2 px-3 text-gray-400 w-full">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
                            Register with Google
                        </a>
                        <button className="w-full py-2 px-3 rounded-md text-white bg-blue-600 font-semibold">Register</button>
                    </form>
                </div>
            </div>
        </>
    )

}