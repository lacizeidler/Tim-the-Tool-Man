import React from "react"
import { Route } from "react-router-dom"
import { Customers } from "./customers/Customers"
import { HomePage } from "./homePage/HomePage"
import { RequestForm } from "./Requests/RequestForm"
import { EditRequest } from "./Status/EditRequest"
import { StatusMessageForm } from "./Status/StatusMessageForm"
import { StatusRequest } from "./Status/StatusRequest"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path = "/form">
                <RequestForm />
            </Route >
            <Route path = "/requests/:userId(\d+)">
                <StatusRequest />
            </Route >
            <Route exact path = "/">
                <HomePage />
            </Route >
            <Route exact path = "/messageForm/:requestId(\d+)">
                <StatusMessageForm />
            </Route >
            <Route exact path = "/customers">
                <Customers />
            </Route >
            <Route exact path = "/requests/edit/:requestId(\d+)">
                <EditRequest />
            </Route >
        </>
    )
}