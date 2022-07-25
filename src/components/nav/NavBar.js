import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar= () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Find Events</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events/upcoming">My Schedule</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events/created">My Events</Link>
            </li>
            {
                localStorage.getItem("tuned_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("tuned_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
