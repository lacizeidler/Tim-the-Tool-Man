//! This module is responsible for the routes that are connected to the NavBar. 
//! It should include a home link, a form link, a customers link, a requests link, and a logout link. 
import "./NavBar.css"
import wrench from "../../img/wrench.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { GetRegisterExistingUserCheck } from "../ApiManager"

export const NavBar = () => {
    const currentUser = parseInt(localStorage.getItem("toolMan_customer"))
    const [users, modifyUsers] = useState([])

    useEffect(
        () => {
            GetRegisterExistingUserCheck()
                .then(modifyUsers)
        },
        []
    )
    return (
        <>
            <div className="full-nav-bar">
                <div className="logo">
                <img src={wrench} alt="Tiny wrench"></img>
                    <h1>Tim the Tool Man</h1>
                    <div className="logo__right">
                        {
                            users.map(
                                (users) => {
                                if (users.id === currentUser) {
                                    return <h2>Welcome,  {users.name}</h2>
                                }
                            })
                        }
                    </div>
                </div>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/">Home</Link>
                    </li>
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/form">Form</Link>
                    </li>
                    {
                        currentUser === 1
                            ?
                            <li className="navbar__item">
                                <Link className="navbar__link" to="/customers">Customers</Link>
                            </li>
                            : <li className="navbar__item">
                                <Link className="navbar__link" to={`/requests/${currentUser}`}>Requests</Link>
                            </li>
                    }
                    <li className="navbar__item">
                        <Link className="navbar__link" to="#" onClick={
                            () => {
                                localStorage.removeItem("toolMan_customer")
                            }
                        }>Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}