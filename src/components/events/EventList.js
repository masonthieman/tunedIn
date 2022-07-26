import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Events.css"
export const EventList = () => {
    const [events, setEvents] = useState([])
    const [eventArtists, setEventArtists] = useState([])
    const navigate = useNavigate()
    

    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)

    // Function that retrieves all the concert events
    const getAllEvents = () => {
        fetch(`http://localhost:8088/events`)
        .then( response => response.json())
        .then( eventArray => {
            setEvents(eventArray)
        })
    }

    // Function that returns all the artist names for a concert
    const getArtistNames = (concert) => {
        const filteredArtists = eventArtists.filter(eventArtist => {
            return eventArtist.eventId === concert.id
        })
        const artistNames = filteredArtists.map(eventArtist => {
            return  eventArtist.artist.name
            })
        return artistNames.join(", ")
       
    }
    

    // Gets all the concert events along with the artists upon initial state
    useEffect(
        () => {
            getAllEvents()

            fetch(`http://localhost:8088/artistevents?_expand=artist`)
            .then(response => response.json())
            .then(artistEventArray => {
                setEventArtists(artistEventArray)
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
                            <footer>{event.venue} - {event.city}, {event.state}</footer>

                    </section>
                    }
                )
            }
        </article>
    
    
    
    </>
}