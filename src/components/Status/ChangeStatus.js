import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsersWithId, GetStatuses } from "../ApiManager"
import "./EditRequest.css"

export const ChangeStatus = () => {
    const { requestId } = useParams()
    const [requests, modifyRequests] = useState([])
    const history = useHistory()
    const [statuses, modifyStatuses] = useState([])
    const [request, modifyRequest] = useState({
        statusId: 0
    })


     //*Placing useEffect inside the component lets us access the state variable right from the effect.
    useEffect(
        () => {
            GetRequestsTopicsUsersWithId(requestId)
                .then(modifyRequests)
        },
        [requestId]
    )

    useEffect(
        () => {
            GetStatuses()
            .then(modifyStatuses)
        },
        []
    )

    const UpdatedRequest = () => {
        const updateRequest = {
            description: request.description,
            userId: request.userId,
            topicId: request.topicId,
            statusId: request.statusId,
            budget: request.budget,
            timestamp: request.timestamp
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
            <div className="edit__request">
                {
                    requests.map(request => {
                        return <div key={`requestlist__${request.id}`}>
                            <h2>{request.user.name}</h2>
                            <h2>{request.topic.name}</h2>
                            <h2>{request.description}</h2>
                            <select
                            onChange={
                                (evt) => {
                                    const copy = { ...request }
                                    copy.statusId = parseInt(evt.target.value)
                                    modifyRequest(copy)
                                }
                            }>
                                {
                                    statuses.map(
                                        (status) => {
                                            return <option className="status__option" key={`statusupdate--${status.id}`} value={status.id}>{status.status}</option>
                                        }
                                    )
                                }   
                            </select>
                        </div>
                    })
                }
                <button
                    onClick={
                        () => {
                            UpdatedRequest()
                            history.push(`/requestList`)
                            GetRequestsTopicsUsersWithId(requestId)
                            .then(modifyRequests)
                        }
                    }
                >
                    Save
                </button>
            </div>
        </>
    )
}