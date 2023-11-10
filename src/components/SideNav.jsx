import { Link } from "react-router-dom";
import Modal from "./Modal";
import myAxios from "../utils/axios";

export default function SideNav({modalState}) {

    const { deleteModal, setDeleteModal } = modalState;

    function onDeleteClick() {
        setDeleteModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const { data } = await myAxios.delete('/users', {
                headers: {
                    'x-token': localStorage.getItem('token')
                },
                data: formData
            })

            location.href = '/login';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav>
            <ul className="flex flex-col gap-y-7 items-center">
                <Link to='/chats' className="text-sm font-medium">Chats</Link>
                <Link to='/your-groups' className="text-sm font-medium">Your Groups</Link>
                <Link to='/users' className="text-sm font-medium">Users</Link>
                <Link to='/groups' className="text-sm font-medium">Groups</Link>
                <Link to='/groups/654bb4e174e4c8639b09406a' className="text-sm font-medium">Global Chat</Link>
                <Link to='/profile' className="text-sm font-medium">Profile</Link>
                <button onClick={onDeleteClick} className="text-sm font-bold text-red-600">Delete Account</button>
            </ul>
            <Modal modal={deleteModal} setModal={setDeleteModal} title='Delete Account'>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="password">Your password</label>
                        <input
                            className="rounded-sm border py-2 px-3"
                            id="password"
                            placeholder="Your password"
                            name="password"
                            type="password"
                        />
                    </div>
                    <button className="w-full py-2 px-3 rounded-md text-white bg-red-600 font-semibold">Delete Account</button>
                </form>
            </Modal>
        </nav>
    )
}