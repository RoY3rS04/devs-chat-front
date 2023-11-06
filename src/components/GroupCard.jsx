export default function GroupCard({ group }) {

    return (
        <div className="flex gap-x-4 items-center">
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
        </div>
    )
}