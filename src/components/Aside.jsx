import UserCard from "./UserCard";
import SideNav from "./SideNav";

export default function Aside({ user, modalState }) {

    return (
        <aside className="min-w-[200px] h-full flex flex-col items-center gap-y-10">
            <UserCard user={user}></UserCard>
            <SideNav modalState={modalState}></SideNav>
        </aside>
    )
}