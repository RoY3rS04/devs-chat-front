import useAuth from "../hooks/useAuth"

export default function Welcome() {

    const { authUser } = useAuth();

    return (
        <div className="flex items-center justify-center w-full h-full">
            <h1 className="font-bold text-3xl text-center">{`Hello Again,  ${authUser.name}!`}</h1>
        </div>
    )
}