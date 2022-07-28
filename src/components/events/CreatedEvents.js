import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const CreatedEvents = () => {
    const [createdEvents, setCreatedEvents] = useState([])
    const [allArtists, setAllArtists] = useState([])
    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)
    const navigate = useNavigate()

    const getAllEvents = () => {
        fetch(`http://localhost:8088/events?userId=${tunedUserObj.id}`)
        .then( response => response.json())
        .then( eventArray => {
            setCreatedEvents(eventArray)
        })
    }

    const getArtistNames = (concert) => {
        const filteredArtists = allArtists.filter(eventArtist => {
            return eventArtist.eventId === concert.id
        })
        const artistNames = filteredArtists.map(eventArtist => {
            return  eventArtist.name
            })
        return artistNames.join(", ")
       
    }

     // Gets all the concert events along with the artists upon initial state
    useEffect(
        () => {
            getAllEvents()

            fetch(`http://localhost:8088/artists`)
            .then(response => response.json())
            .then(artistArray => {
                setAllArtists(artistArray)
            })
        },
        []
    )

    const handleCreateButtonClick = (event) => {
        event.preventDefault()

        navigate("/events/create")
    }

    return <>
    
        <h2>List of Created Events</h2>
        <button
        onClick={(click) => handleCreateButtonClick(click)}
        className="btn btn-primary"
        >Add Event</button>
        <article className="events">
        
            {
                createdEvents.map(
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
                            <footer>{event.venue} - {event.city}, {event.state}</footer>

                    </section>
                    }
                )
            }
        
        </article>
        
    
    
    </>

    
}