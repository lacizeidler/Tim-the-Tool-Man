//! The responsibility of this module is to populate the JSX of the message form. 
//! This should include an input text box and a button that sends the message to the API. 
//! This should have the recipientId, senderId, requestId, read boolean, message string, and a Send button. 
import "./StatusMessageForm.css"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GetMessagesFromRequests, GetRegisterExistingUserCheck } from "../ApiManager"

export const StatusMessageForm = () => {
    const { requestId } = useParams()
    const [messages, modifyMessages] = useState([])
    const [users, modifyUsers] = useState([])
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const [message, modifyMessage] = useState({
        message: "",
        requestId: requestId
    })

    useEffect(
        () => {
            GetMessagesFromRequests(requestId)
                .then(modifyMessages)
        },
        [requestId]
    )
    useEffect(
        () => {
            GetRegisterExistingUserCheck()
                .then(modifyUsers)
        },
        []
    )

    const SendMessage = (event) => {
        event.preventDefault()
        const newMessage = {
            message: message.message,
            requestId: parseInt(message.requestId),
            senderId: currentUser
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }
        fetch("http://localhost:8088/messages", fetchOption)
            .then(GetMessagesFromRequests(requestId)
                .then(modifyMessages))
    }

    return (
        <>
            <h2 className="request__description">Request Description: {messages[0]?.request.description}</h2>
            {
                messages.map(
                    message => {
                        const findUserName = users.find(user => {
                            return user.id === message.senderId
                        })
                        return <div className={message.senderId === 1 ? "color" : "previous__messages"}>
                            <h2>From: {findUserName?.name}</h2>
                            <h2>{message.message}</h2>
                        </div>
                    }
                )
            }
            <div className="spacer"></div>
            <div className="message__form">
                <div className="message__textarea">
                    <label>Message: </label>
                    <textarea
                        onChange={
                            (evt) => {
                                const copy = { ...message }
                                copy.message = evt.target.value
                                modifyMessage(copy)
                            }
                        }
                        placeholder="Type message here..."
                        type="text"
                        required autoFocus
                    ></textarea>
                </div>
                <button
                    onClick={SendMessage}
                >Send</button>
            </div>
        </>
    )
}