import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsersWithId } from "../ApiManager"

export const EditRequest = () => {
    const { requestId } = useParams()
    const [requests, modifyRequests] = useState([])
    const history = useHistory()
    const [request, modifyRequest] = useState({
        description: ""
    })

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
            topicId: request.topicId
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
            <div>
                {
                    requests.map(request => {
                        return <div>
                            <h2>{request.user.name}</h2>
                            <h2>{request.topic.name}</h2>
                            <textarea
                                onChange={
                                    (evt) => {
                                        const copy = { ...request }
                                        copy.description = evt.target.value
                                        modifyRequest(copy)
                                    }
                                }>{request.description}</textarea>
                        </div>
                    })
                }
                <button
                    onClick={
                        () => {
                            UpdatedRequest()
                            history.push(`/requests/${request.userId}`)
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


