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
    //*the current state and a function that updates it.
    const [topics, modifyTopics] = useState([])
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const [request, modifyRequest] = useState({
        description: "",
        topicId: 0,
        budget: "",
        statusId: 1
    })

    //*Placing useEffect inside the component lets us access the count state variable (or any props) right from the effect.
    useEffect(
        () => {
            GetTopics()
                .then(modifyTopics)
        },
        []
    )

    const SubmitForm = () => {
        //* Object that gets Posted to the API in the requests array.
        const newRequest = {
            description: request.description,
            topicId: request.topicId,
            userId: parseInt(localStorage.getItem("toolMan_customer")),
            timestamp: Date.now(),
            budget: request.budget,
            statusId: request.statusId
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }
        return fetch(`http://localhost:8088/requests`, fetchOption)
    }

    return (
        <>
            <h1 className="request__form">Request Form</h1>
            <div className="form">
                <select className="topic__select"
                    onChange={
                        (evt) => {
                            const copy = { ...request }
                            copy.topicId = parseInt(evt.target.value)
                            modifyRequest(copy)
                        }
                    }
                >
                    <option className="topic__option" value={0}>Select a topic...</option>
                    {
                        topics.map(topic => <option className="topic__option" key={`topic--${topic.id}`} value={topic.id}>{topic.name}</option>)
                    }
                </select>
                <div className="description">
                    <label>Description: </label>
                    <textarea
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.description = evt.target.value
                                modifyRequest(copy)
                            }
                        }
                        placeholder="Type a description of the job"
                        type="text"
                        required autoFocus
                    ></textarea>
                </div>
                <div className="budget">
                    <label>Budget: </label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.budget = evt.target.value
                                modifyRequest(copy)
                            }
                        }
                        placeholder="What's your budget?"
                        type="text"
                        required autoFocus
                    ></input>
                </div>
                <button type="submit" className="form__submit"
                    onClick={
                        () => {
                            SubmitForm()
                            history.push(`/requests/${currentUser}`)
                        }
                    }>
                    Submit Button
                </button>
            </div>
        </>
    )
}