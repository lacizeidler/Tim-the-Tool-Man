//! This module is to make the customer list so that when Tim clicks on a customer link, it directs Tim to all the requests associated with that customer. 
import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react/cjs/react.development"
import { GetRegisterExistingUserCheck } from "../ApiManager"
import "./Customers.css"

export const Customers = () => {
    //* Use state variables to store the transient state. users is the array of objects and the modifyUsers is so that we can edit the data (add a new object to the array)
    const [users, modifyUsers] = useState([])
    useEffect(
        () => {
            //*http://localhost:8088/users
            //? What is a smart way to describe what is going on here? I think that this connects the useState variables to the array in the database that it needs access to. Its a promise to its loading data, right? 
            GetRegisterExistingUserCheck()
                .then(modifyUsers)
        },
        []
    )
    return (
        <>
            <h2 className="name__title">Customer List</h2>
            {
                users.map(user =>
                    //* Ternary statement that only shows the customer links that don't have the user.manager of true since Tim doesn't request orders obviously. 
                    user.manager === true
                        ? ""
                        :
                        <div key={`user__list__${user.id}`} className="user__list">
                            <Link className="user__name" key={`/requests/${user.id}`} to={`/requests/${user.id}`}>{user.name}</Link>
                        </div>
                )
            }
        </>
    )
}
