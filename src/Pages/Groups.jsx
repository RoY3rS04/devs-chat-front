import { useEffect, useState } from "react"
import GroupCard from "../components/GroupCard";
import myAxios from "../utils/axios";
import { useLocation } from "react-router-dom";

export default function Groups() {

    const [groups, setGroups] = useState([]);
    const location = useLocation();

    useEffect(() => {

        async function getGroups() {

            let path;

            if (!location.pathname.includes('your')) {
                path = '/groups';   
            } else {
                path = '/groups/auth'
            }

            try {
                const { data } = await myAxios.get(path, {
                    headers: {
                        'x-token': localStorage.getItem('token')
                    }
                });

                setGroups(data.groups);
            } catch (error) {
                console.log(error);
            }
        }

        getGroups();

    }, [location.pathname]);

    return (
        <div className="grid grid-cols-2 gap-5">
            {groups.map((group) => <GroupCard key={group._id} group={group}></GroupCard>)}
        </div>
    )   

}