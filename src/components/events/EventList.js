import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Events.css"
export const EventList = () => {
    const [events, setEvents] = useState([])
    const [artists, setArtists] = useState([])
    const [states, setStates] = useState([])
    const navigate = useNavigate()
    

    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)

    // Function that retrieves all the concert events
    const getAllEvents = () => {
        fetch(`http://localhost:8088/events?_sort=startDate`)
        .then( response => response.json())
        .then( eventArray => {
            setEvents(eventArray)
        })
    }

    const getAllStates = () => {
        fetch(`http://localhost:8088/states`)
        .then(response => response.json())
        .then(stateArray => {
            setStates(stateArray)
        })
    }

    // Function that returns all the artist names for a concert
    const getArtistNames = (concert) => {
        const filteredArtists = artists.filter(artist => {
            return artist.eventId === concert.id
        })
        const artistNames = filteredArtists.map(eventArtist => {
            return  eventArtist.name
            })
        return artistNames.join(", ")
       
    }
    
    const getEventState = (concert) => {
        const foundState = states.find(state => state.id === concert.stateId)

        return foundState
    }

    // Gets all the concert events along with the artists upon initial state
    useEffect(
        () => {
            getAllEvents()

            getAllStates()

            fetch(`http://localhost:8088/artists`)
            .then(response => response.json())
            .then(artistArray => {
                setArtists(artistArray)
            })
        },
        []
    )


    return <>
    
        <h2>List of Local Concerts</h2>

        <article className="events">
            {
                events.map(
                    (event) => {
                        return <section className="event" key={`event--${event.id}`}>
                            <header>{event.startDate}</header>
                            <section>
                                {
                                    event.title
                                    ? `${event.title}: ${getArtistNames(event)}`
                                    : `${getArtistNames(event)}`
                                }
                            </section>
                            
                            <section>{event.venue} - {event.city}, {getEventState(event)?.name}</section>
                            <footer>
                                <label htmlFor="going">Going?</label>
                                <input
                                type="checkbox"
                                />

                            </footer>

                    </section>
                    }
                )
            }
        </article>
    
    
    
    </>
}