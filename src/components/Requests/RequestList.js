import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRequestsTopicsUsers, GetStatuses } from "../ApiManager"
import "../Status/StatusRequest.css"

export const RequestList = () => {
    const [requests, modifyRequests] = useState([])
    const [statuses, modifyStatuses] = useState([])

    useEffect(
        () => {
            GetRequestsTopicsUsers()
            .then(modifyRequests)
        },
        []
    )

    useEffect(
        () => {
            GetStatuses()
            .then(modifyStatuses)
        },
        []
    )

    return(
        <>
        <div>
        <select className="status__filter">
            <option>Filter by Status... </option>
            {
                    statuses.map(status => <option className="status__option" key={`status--${status.id}`} value={status.id}>{status.status}</option>)
                }
        </select>
        </div>
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