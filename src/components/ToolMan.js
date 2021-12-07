import React from "react"
import { Route, Redirect } from "react-router"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ToolMan = () => {
    return (
        <>
        <h1>Tim the Tool Man</h1>
            <Route
                render={ () => {
                    if (localStorage.getItem("toolMan_customer")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </>

    )
}