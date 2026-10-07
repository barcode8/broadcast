import axios from "axios"
import { useEffect, useState } from "react"

export const useGetAckReport = (messageID) => {
    const [report, setReport] = useState(null)

    useEffect(() => {
        if (!messageID) {
            setReport([])
            return
        }

        setReport(null)
        const getAckReport = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/ack/${messageID}`)

                setReport(res.data.ackRecord)
            } catch {
                setReport([])
            }
        }

        getAckReport()
    }, [messageID])

    return report
}
