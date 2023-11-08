import { useEffect, useState } from "react"
import Message from "../components/Message"
import myAxios from "../utils/axios";

export default function Chat({ chat, type }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        async function getChatMessages() {
            if (!chat) {
                const { data } = await myAxios.get('/messages/group/654bb4e174e4c8639b09406a', {
                    headers: {
                        'x-token': localStorage.getItem('token')
                    }
                })

                setMessages(data.messages);
            } else {
                if (type === 'group') {
                    const { data } = await myAxios.get(`/messages/group/${chat}`, {
                        headers: {
                            'x-token': localStorage.getItem('token')
                        }
                    })

                    setMessages(data.messages);
                }

                if (type === 'private') {
                    const { data } = await myAxios.get(`/messages/chat/${chat}`, {
                        headers: {
                            'x-token': localStorage.getItem('token')
                        }
                    })

                    setMessages(data.messages);
                }
            }
        }

        getChatMessages();
    }, [])

    return (
        <section className="flex flex-col gap-y-3 h-full">
            <div className="flex-1 space-y-3">
                {messages.map(message => <Message key={message._id} message={message}></Message>)}
            </div>
            <form className="flex items-center gap-x-4">
                <div className="flex flex-col flex-1 gap-y-2">
                    <input
                        className="rounded-sm border py-2 px-3"
                        placeholder="Your messsage"
                        name="content"
                        type="text"
                    />
                </div>
                <button className="py-2 px-3 rounded-md text-white bg-blue-600 font-semibold"></button>
            </form>
        </section>
    )
}