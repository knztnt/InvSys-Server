import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../navbar-brand-dark.png";

import AuthService from "../services/auth.service";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showStudentBoard: false,
            showAcademicBoard: false,
            showNonacBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showStudentBoard: user.roles.includes("ROLE_STUDENT"),
                showAcademicBoard: user.roles.includes("ROLE_ACADEMIC"),
                showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">
                    <img
                        src={logo}
                        height="30"
                        width="120"
                        alt="Logo"
                    />
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {currentUser ? (
                    <div className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm">
                                    LogOut
                                    <i className="fas fa-sign-out-alt fa-fw"></i>
                                </button>
                            </a>
                        </li>
                    </div>
                ) : (
                        <div className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <a href={"/login"} className="nav-link">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm">
                                        Login
                                        <i className="fas fa-sign-in-alt fa-fw"></i>
                                    </button>
                                </a>
                            </li>
                        </div>

                        /* <div className="navbar-nav px-3">
                            <li className="nav-item text-nowrap">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div> */

                    )
                }
            </nav>
        );
    }
}

export default withRouter(Navbar);
