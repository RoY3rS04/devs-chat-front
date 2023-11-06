import UserCard from "./UserCard";
import SideNav from "./SideNav";

export default function Aside({ user }) {
    return (
        <aside className="min-w-[200px] flex flex-col items-center gap-y-10">
            <UserCard user={user}></UserCard>
            <SideNav></SideNav>
        </aside>
    )
}