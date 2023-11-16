import { Link } from "react-router-dom";
import Modal from "./Modal";
import myAxios from "../utils/axios";

export default function SideNav({modalState}) {

    const { deleteModal, setDeleteModal } = modalState;

    function onDeleteClick() {
        setDeleteModal(true);
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
                <form className="space-y-3">
                    <h2 className="text-lg font-medium text-center">We will send you an email with the instructions to delete your account</h2>
                    <button className="w-full py-2 px-3 rounded-md text-white bg-red-600 font-semibold">Send Email</button>
                </form>
            </Modal>
        </nav>
    )
}