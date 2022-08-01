import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Events.css"
export const EventList = () => {
    const [events, setEvents] = useState([])
    const [artists, setArtists] = useState([])
    const [states, setStates] = useState([])
    const [schedule, setSchedule] = useState([])
    const [showAttending, updateShowAttending] = useState([])
    const [attendingEvents, setAttendance] = useState([])
    const navigate = useNavigate()
    

    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)

    // Function that retrieves all the concert events
    const getAllEvents = () => {
        fetch(`http://localhost:8088/events?_sort=startDate`)
        .then( response => response.json())
        .then( eventArray => {
            setEvents(eventArray)
            setSchedule(eventArray)
        })
    }

    const getAllStates = () => {
        fetch(`http://localhost:8088/states`)
        .then(response => response.json())
        .then(stateArray => {
            setStates(stateArray)
        })
    }

    const getAllAttendance = () => {
        fetch(`http://localhost:8088/going?userId=${tunedUserObj.id}&_expand=event`)
        .then(response => response.json())
        .then(attendanceArray => {
            setAttendance(attendanceArray)
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

            getAllAttendance()

            fetch(`http://localhost:8088/artists`)
            .then(response => response.json())
            .then(artistArray => {
                setArtists(artistArray)
            })
        },
        []
    )

    useEffect(
        () => {

            if (showAttending) {
                setSchedule(events)
            }
            else {
                const matchingEvents = attendingEvents.map(oneEvent => {
                    return oneEvent.event
                })
                setSchedule(matchingEvents)


            }
        },
        [showAttending]
    )

    
    const addButton = (concert) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/going`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: tunedUserObj.id,
                    eventId: concert.id
                })
            })
            .then(response => response.json())
            .then( () => {
                getAllAttendance()
            })
        }}
        >I'm Going</button>
    } 

    const deleteButton = (goingId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/going/${goingId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                getAllAttendance()

            })

            }} className="event__delete">Remove</button>
        }
    

    const addOrDeleteButton = (concert) => {
        const matchEvent = attendingEvents.find(attendingElement => attendingElement.eventId === concert.id
            && attendingElement.userId === tunedUserObj.id)

     return matchEvent
        ? deleteButton(matchEvent.id)
        : addButton(concert) 
    }


    return <>
    
        <h2>List of Local Concerts</h2>

        <button onClick={ () => { 
            if (showAttending) { updateShowAttending(false)}
            
            else { updateShowAttending(true) }

        }}>Toggle My Schedule</button>

        <article className="events">
            {
                schedule.map(
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
                                {
                                addOrDeleteButton(event)
                                }
                            </footer>
                                
                    </section>
                    }
                )
            }
        </article>
    
    
    
    </>
}