import "./StatusMessageForm.css"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GetMessagesFromRequests, GetRegisterExistingUserCheck } from "../ApiManager"
import { StatusMessageForm } from "./StatusMessageForm"

export const StatusMessageList = () => {
    const { requestId } = useParams()
    const [messages, modifyMessages] = useState([])
    const [users, modifyUsers] = useState([])

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
            <StatusMessageForm modifyMessages={modifyMessages}/>
        </>
    )
}