import { useEffect, useState } from "react"
import myAxios from "../utils/axios";
import ChatCard from "../components/ChatCard";

export default function Chats() {

    const [chats, setChats] = useState();

    useEffect(() => {

        async function getChats() {

            try {
                const { data } = await myAxios.get('/chats', {
                    headers: {
                        'x-token': localStorage.getItem('token')
                    }
                });

                setChats(data.chats);
            } catch (error) {
                console.log(error);
            }

        }

        getChats();

    }, []);

    return (
        <>
            {chats?.map(chat => <ChatCard key={chat._id} chat={chat}></ChatCard>)}
        </>
    )
}