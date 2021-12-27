import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsersWithId, GetStatuses } from "../ApiManager"

export const ChangeStatus = () => {
    const [statuses, modifyStatuses] = useState([])
    const [request, modifyRequest] = useState({})
    const { requestId } = useParams()
    const[requests, modifyRequests] = useState([])


    useEffect(
        () => {
            GetStatuses()
            .then(modifyStatuses)
        },
        []
    )

    useEffect(
        () => {
            GetRequestsTopicsUsersWithId(requestId)
                .then(modifyRequests)
        },
        [requestId]
    )

    const UpdatedRequest = () => {
        const updateRequest = {
            description: request.description,
            userId: request.userId,
            topicId: request.topicId,
            statusId: request.statusId
        }
        fetch(`http://localhost:8088/requests/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateRequest)
        })
    }

    return (
        <>
            <select
            // onChange={
            //     () => {}
            //     const copy = {...request}

            // }
            >
                {
                    statuses.map(status => <option className="status__option" key={`status--${status.id}`} value={status.id}>{status.status}</option>)
                }
            </select>
        </>
    )
}