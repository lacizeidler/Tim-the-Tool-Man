import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetMessagesFromRequests } from "../ApiManager"

export const MessageNotifications = () => {
    const [messages, modifyMessages] = useState([])
    const { requestId } = useParams()

    useEffect(
        () => {
            GetMessagesFromRequests(requestId)
            .then(modifyMessages)
        },
        [requestId]
    )

    const membersToRender = messages.filter(message => message.read === false)
    const numRows = membersToRender.length
    return(
        <>
        {
            numRows === 0 
            ? ""
            : <div className="numRows">{numRows}</div>
        }
        </>
    )
}