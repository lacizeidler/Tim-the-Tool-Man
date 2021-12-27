//! The responsibility of this module is to populate the request on the DOM from the API. 
//! This should include the customer name, customer email, topic, description of the job, and a reply button.
//! The reply button should populate the message form underneath the request. 
import { useHistory } from "react-router"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsFromUser } from "../ApiManager"
import "./StatusRequest.css"

export const StatusRequest = () => {
    //* Transient state to access the requests. 
    const [requests, modifyRequests] = useState([])
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const { userId } = useParams()

    useEffect(
        () => {
            GetRequestsFromUser(userId)
                .then(modifyRequests)
        },
        [userId]
    )

    const deleteRequest = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                GetRequestsFromUser(userId)
                    .then(modifyRequests)
            })
    }

    return (
        <>
            <h1 className="repair__request">Repair Request(s)</h1>
            {
                requests.map(
                    request =>
                        currentUser === 1
                            ?
                            <div className="status__request" key={`request-${request.id}`}>
                                <h2> Customer: {request.user.name}</h2>
                                <h4>Topic: {request.topic.name}</h4>
                                <h4>Description: {request.description}</h4>
                                <h4>Budget: ${request.budget}</h4>
                                <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(request.timestamp)}</h4>
                                <div>
                            
                                </div>
                                <button
                                    key={`/requests/editstatus/${request.id}`}
                                    onClick={
                                        () => {
                                            history.push(`/requests/editstatus/${request.id}`)
                                        }
                                    }
                                    value={request.id}
                                >
                                    Status
                                </button>
                                <button
                                    key={`/messageForm/${request.id}`}
                                    onClick={
                                        () => {
                                            history.push(`/messageForm/${request.id}`)
                                        }
                                    }
                                    value={request.id}
                                >
                                    Messages
                                </button>
                                <button
                                    onClick={
                                        () => {
                                            deleteRequest(parseInt(request.id))
                                            history.push("/customers")
                                        }
                                    }
                                >Delete Request</button>
                            </div>
                            :
                            <div className="status__request" key={`request-${request.id}`}>
                                <h2> Customer: {request.user.name}</h2>
                                <h4>Topic: {request.topic.name}</h4>
                                <h4>Description: {request.description}</h4>
                                <h4>Budget: ${request.budget}</h4>
                                <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(request.timestamp)}</h4>
                                <button
                                    key={`/messageForm/${request.id}`}
                                    onClick={
                                        () => {
                                            history.push(`/messageForm/${request.id}`)
                                        }
                                    }
                                    value={request.id}
                                >
                                    Messages
                                </button>
                                <button
                                    onClick={
                                        () => {
                                            history.push(`/requests/edit/${request.id}`)
                                        }
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                )
            }
        </>
    )
}   