import React from "react"
import { Route } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Customers } from "./customers/Customers"
import { HomePage } from "./homePage/HomePage"
import { RequestForm } from "./Requests/RequestForm"
import { RequestList } from "./Requests/RequestList"
import { ChangeStatus } from "./Status/ChangeStatus"
import { EditRequest } from "./Status/EditRequest"
import { StatusMessageList } from "./Status/StatusMessageList"
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
                <StatusMessageList />
            </Route >
            <Route exact path = "/customers">
                <Customers />
            </Route >
            <Route exact path = "/requests/edit/:requestId(\d+)">
                <EditRequest />
            </Route >
            <Route exact path = "/login">
                <Login />
            </Route >
            <Route exact path = "/register">
                <Register />
            </Route >
            <Route exact path = "/requests/editstatus/:requestId(\d+)">
                <ChangeStatus />
            </Route >
            <Route exact path = "/requestList">
                <RequestList />
            </Route >
        </>
    )
}