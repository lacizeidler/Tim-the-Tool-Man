import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsers } from "../ApiManager"
import "../Status/StatusRequest.css"

export const RequestList = () => {
    const [requests, modifyRequests] = useState([])

    useEffect(
        () => {
            GetRequestsTopicsUsers()
            .then(modifyRequests)
        },
        []
    )

    return(
        <>
            {
                requests.map(
                    (request) => {
                        return <div className="status__request" key={`request-${request.id}`}>
                            <Link className="request__list" key={`/requests/${request.user.id}`} to={`/requests/${request.user.id}`}>Customer: {request.user.name}</Link>
                                <h4>Topic: {request.topic.name}</h4>
                                <h4>Description: {request.description}</h4>
                                <h4>Budget: ${request.budget}</h4>
                                <h4>Status: {request.status.status}</h4>
                                <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(request.timestamp)}</h4>
                        </div>
                    }
                )
            }
        </>
    )
}