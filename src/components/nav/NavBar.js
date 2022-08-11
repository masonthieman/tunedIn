import { Link, useNavigate } from "react-router-dom"
import { Button } from 'reactstrap'
import { Navbar, NavLink, Nav, NavItem } from 'reactstrap'
export const UserNavBar= () => {
    const navigate = useNavigate()

    return (
        <Navbar>
            <Nav fill pills>
                <NavItem>
                    <NavLink href="/events">Find Events</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/events/created">My Events</NavLink>
                </NavItem>
                
                {
                localStorage.getItem("tuned_user")
                ? <NavItem>
                    <NavLink href="" onClick={() => {
                        localStorage.removeItem("tuned_user")
                        navigate("/", {replace: true})
                    }}>
                        Logout
                    </NavLink>
                </NavItem>
                : ""
                }

                    
                
            </Nav>

        </Navbar>
        /*
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="navbar__link" to="/events">Find Events</Link>
            </li>
            
            <li className="nav-item">
                <Link className="navbar__link" to="/events/created">My Events</Link>
            </li>
            {
                localStorage.getItem("tuned_user")
                    ? <li className="nav-item nav-logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("tuned_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
        */
    )
}
