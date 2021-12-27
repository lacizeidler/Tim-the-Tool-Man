//! The responsibility of this module is to populate the JSX of the message form. 
//! This should include an input text box and a button that sends the message to the API. 
//! This should have the recipientId, senderId, requestId, read boolean, message string, and a Send button. 
import "./StatusMessageForm.css"
import React, { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GetMessagesFromRequests } from "../ApiManager"

//*When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.
export const StatusMessageForm = ({ modifyMessages }) => {
    const { requestId } = useParams()
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const [message, modifyMessage] = useState({
        message: "",
        requestId: requestId,
        read: false
    })

    const SendMessage = (event) => {
        //*The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault()
        const newMessage = {
            message: message.message,
            requestId: parseInt(message.requestId),
            senderId: currentUser,
            timestamp: Date.now(),
            read: message.read
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }
        fetch("http://localhost:8088/messages", fetchOption)
            .then(
                () => {
                    GetMessagesFromRequests(requestId)
                        .then(modifyMessages)
                        .then(modifyMessage(emptyMessage))
                }
            )
    }
    const emptyMessage = {message: ""}

    //* ? is a conditional operator.
    return (
        <>
            <div className="message__form">
                <div className="message__textarea">
                    <label>Message: </label>
                    <input
                    value={message.message}
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
                    ></input>
                </div>
                <button onClick={SendMessage}
                >Send</button>
            </div>
        </>
    )
}