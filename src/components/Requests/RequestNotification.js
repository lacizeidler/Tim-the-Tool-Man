import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsers } from "../ApiManager"
import "../Nav/NavBar.css"

export const RequestNotification = () => {
    const [requests, modifyRequests] = useState([])

    useEffect(
        () => {
            GetRequestsTopicsUsers()
            .then(modifyRequests)
        },
        []
    )

    const membersToRender = requests.filter(request => request.statusId === 1)
    const numRows = membersToRender.length
    return(
        <>
        <div className="numRows">{numRows}</div>
        </>
    )
}