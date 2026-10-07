import axios from "axios"
import { useState } from "react"

export const useBroadcastMessage = () => {
    const [formData, setFormData] = useState({
        content : "",
        clearance : ""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = async() => {
        try {
            const data = formData

            const res = await axios.post("http://localhost:5000/broadcast", data, {
                headers : {
                    'Content-Type' : "application/json"
                },
            })

            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    return {formData, handleChange, handleSubmit}
}
