import React from "react"
import { Route } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./Nav/NavBar"
import "./ToolMan.css"

export const ToolMan = () => {
    return (
        <>
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
                        return <Route exact path ="/">
                            <NavBar />
                            <ApplicationViews />
                        </Route>;
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