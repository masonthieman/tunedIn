import { Outlet, Route , Routes } from "react-router-dom"
import { EventList } from "../events/EventList"
export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>TunedIn</h1>

                    <Outlet />
                </>
            }>
                <Route path="events" element={ <EventList /> } />


            </Route>
        </Routes>
    )
    
}