import { Outlet, Route , Routes } from "react-router-dom"
import { NavBar } from "../nav/NavBar.js"
import { EventList } from "../events/EventList.js"
import { EventForm } from "../events/EventForm.js"

import { CreatedEvents } from "../events/CreatedEvents.js"
export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>TunedIn</h1>
                    <NavBar />
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