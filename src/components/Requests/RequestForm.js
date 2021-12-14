//! The responsibility of this module is to populate the request form on JSX. 
//! Needs to POST the value of the form to the API. 
//! This form needs a dropdown of the topics, an input field for the description, and the button that sends the data to the API. 
import React, { useState, useEffect } from "react"
import "./RequestForm.css"
import { GetTopics } from "../ApiManager"
import { useHistory } from "react-router"
import "./RequestForm.css"

export const RequestForm = () => {
    const history = useHistory()
    const [ topics, modifyTopics ] = useState([])
    const [ request, modifyRequest ] = useState({
        description: "",
        topicId: 0
    })

    useEffect (
        () => {
            GetTopics()
            .then(modifyTopics)
        },
        []
    )

    const SubmitForm = () => {
        const newRequest = {
            description: request.description,
            topicId: request.topicId,
            userId: parseInt(localStorage.getItem("toolMan_customer"))
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        return fetch("http://localhost:8088/requests", fetchOption)
        .then(response => response.json())
        .then(()=> {
            history.push("/status")
        })
    }

    return (
        <>
        <h1 className="request__form">Request Form</h1>
        <div className="form">
        <select className ="topic__select"
            onChange={
                (evt) => {
                    const copy = {...request}
                    copy.topicId = parseInt(evt.target.value)
                    modifyRequest(copy)
                }
            }
        >
            <option className="topic__option" value={0}>Select a topic...</option>
            {
                topics.map(topic => <option className="topic__option" value={topic.id}>{topic.name}</option>)
            }
        </select>
        <div className="description">
            <label>Description: </label>
            <textarea
                onChange={
                    (evt) => {
                        const copy = {...request}
                        copy.description = evt.target.value
                        modifyRequest(copy)
                    }
                }
                placeholder="Type a description of the job"
                type="text"
                required autoFocus
            ></textarea>
        </div>
        <button className="form__submit"
            onClick={SubmitForm}
        >Submit Request</button>        
        </div>
        </>
    )
}