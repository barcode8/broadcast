import axios from "axios"
import { useEffect, useState } from "react"

export const useGetAllMessages = () => {
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        const getAllMessages = async () => {
            try {
                const res = await axios.get("http://localhost:5000/broadcast")

                setMessages(res.data.messages)
            } catch {
                setMessages([])
            }
        }

        getAllMessages()
    }, [])

    return messages
}
