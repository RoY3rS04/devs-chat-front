import { useEffect, useState } from "react"
import GroupCard from "../components/GroupCard";
import myAxios from "../utils/axios";
import { useLocation, useOutletContext } from "react-router-dom";
import Modal from "../components/Modal";

export default function Groups() {

    const [groups, setGroups] = useState([]);
    const [image, setImage] = useState('https://ik.imagekit.io/4ztt7kzzm/default_group_image.png?updatedAt=1699391215031');
    const location = useLocation();
    const [modal, setModal] = useOutletContext();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const { data } = await myAxios.post('/groups', formData, {
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    function handleImageOnChange(e) {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {

        setGroups([]);

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
            <Modal modal={modal} setModal={setModal} title='Create Group'>
                <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img className="w-full h-full object-center" src={image} alt="Group image" />
                    </div>
                    <div className="relative">
                        <label className="absolute bottom-0 right-0 cursor-pointer isolate" htmlFor="image">
                            <svg className="w-5 h-5 z-[-1]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                            </svg>
                        </label>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-10 space-y-3">
                        <input onChange={handleImageOnChange} type="file" hidden name="image" id="image" />
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="name">Group Name</label>
                            <input
                                className="rounded-sm border py-2 px-3"
                                id="name"
                                placeholder="The group name"
                                name="name"
                                type="text"
                            />
                        </div>
                        <button className="w-full py-2 px-3 rounded-md text-white bg-blue-600 font-semibold">Create</button>
                    </form>
            </Modal>
        </div>
    )   

}