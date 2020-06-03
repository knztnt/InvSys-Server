import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";

class Sidebar extends Component {
    constructor(props) {
        super(props);

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
    render() {
        const { currentUser, showStudentBoard, showAcademicBoard, showNonacBoard, showAdminBoard } = this.state;

        return (

            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">

                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">

                        {showStudentBoard && (
                            <li className="nav-item">
                                <Link to={"/Student"} className="nav-link">Dashboard</Link>
                            </li>
                        )}

                        {showAcademicBoard && (
                            <li className="nav-item">
                                <Link to={"/academic"} className="nav-link">Dashboard</Link>
                            </li>
                        )}

                        {showNonacBoard && (
                            <li className="nav-item">
                                <Link to={"/non-academic"} className="nav-link">Dashboard</Link>
                            </li>
                        )}

                        {showNonacBoard && (
                            <li className="nav-item">
                                <Link to={"/add-item"} className="nav-link">Add Items</Link>
                            </li>
                        )}

                        {showNonacBoard && (
                            <li className="nav-item">
                                <Link to={"/view-items"} className="nav-link">View Items</Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">Dashboard</Link>
                            </li>
                        )}


                    </ul>
                </div>
            </nav >
        );

    }
}

export default withRouter(Sidebar);
