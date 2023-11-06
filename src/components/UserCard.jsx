export default function UserCard({user}) {
    return (
        <div className="flex gap-x-4 items-center">
            <div className="rounded-full overflow-hidden w-8 h-8 ">
                <img className="w-full h-full" src={user.img.split('*')[0]} alt="User image" />
            </div>
            <h2 className="font-medium">{user.name}</h2>
        </div>
    )
}