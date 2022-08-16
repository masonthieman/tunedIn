import { Link, useNavigate } from "react-router-dom"
import { Button } from 'reactstrap'
import "./NavBar.css"
import { Navbar, NavbarBrand,NavLink, Nav, NavItem } from 'reactstrap'
export const UserNavBar= () => {
    const navigate = useNavigate()

    return (
        <Navbar className="navbar">
            <NavbarBrand href="/">
                        tunedIn
                        <img
                            alt="logo"
                            src="../../images/tunedIn.jpeg"
                            style={{
                                height: 80,
                                width: 120
                            }}
                        />
                        
                    </NavbarBrand>
            <Nav fill pills>
                <NavItem className="navbar__item">
                    <NavLink href="/events">Find Events</NavLink>
                </NavItem>
                <NavItem className="navbar__item">
                    <NavLink href="/events/created">My Events</NavLink>
                </NavItem>
                
                {
                localStorage.getItem("tuned_user")
                ? <NavItem className="navbar__item">
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
        
    )
}
