import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Events.css"
export const EventList = () => {
    const [events, setEvents] = useState([])
    const [eventArtists, setEventArtists] = useState([])
    const navigate = useNavigate()
    

    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)

    const getAllEvents = () => {
        fetch(`http://localhost:8088/events`)
        .then( response => response.json())
        .then( eventArray => {
            setEvents(eventArray)
        })
    }

    const getArtistNames = (concert) => {

        const artistNames = eventArtists.map(eventArtist => {
            return  eventArtist.artist.name
            })
        return artistNames.join(", ")
       
    }
    

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
                            <header>
                                {
                                    event.title
                                    ? `${event.title}: ${getArtistNames(event)}`
                                    : `${getArtistNames(event)}`
                                }
                            </header>


                    </section>
                    }
                )
            }
        </article>
    
    
    
    </>
}