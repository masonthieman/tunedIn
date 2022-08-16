import { Outlet, Route , Routes } from "react-router-dom"
import { UserNavBar } from "../nav/NavBar.js"
import { EventList } from "../events/EventList.js"
import { EventForm } from "../events/EventForm.js"
import "./header.css"
import { CreatedEvents } from "../events/CreatedEvents.js"
import { ListInlineItem } from "reactstrap"
export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    
                    
                    
                    <UserNavBar />
                    
                    
                    
                   
                    
                    
                    <div className="image__container">
                    <img className="tunedIn__image" src="../../images/concert.jpeg" style={{
                        width: 600,
                        height: 300}}/>
                    </div>
                    <Outlet />
                </>
            }>
                <Route path="events" element={ <EventList /> } />
                
                <Route path="events/created" element={ <CreatedEvents /> } />
                <Route path="events/create" element={ <EventForm /> } />

            </Route>
        </Routes>
    )
    
}