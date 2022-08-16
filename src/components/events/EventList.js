import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button,List, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import "./Events.css"
export const EventList = () => {
    const [events, setEvents] = useState([])
    const [artists, setArtists] = useState([])
    const [states, setStates] = useState([])
    const [schedule, setSchedule] = useState([])
    const [showAttending, updateShowAttending] = useState([])
    const [attendingEvents, setAttendance] = useState([])
    const [modalEvent,setModalEvent] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () =>  setModal(!modal)

    

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

    // Function that retrieves all of the U.S. states
    const getAllStates = () => {
        fetch(`http://localhost:8088/states`)
        .then(response => response.json())
        .then(stateArray => {
            setStates(stateArray)
        })
    }

    // Function that retrieves all of the attending events for the logged in user
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
    
    // Function that retrieves the U.S. state name for an event
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

    // Tracks the state of the user when they toggle their schedule of attending events
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

    // Returns an add button that allows a user to select an event as "going"
    const addButton = (concert) => {
        return <Button
                color="primary"
                onClick={() => {
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
        >I'm Going</Button>
    } 

    // Returns a delete button that allows a user to remove an event from "going"
    const deleteButton = (goingId) => {
        return <Button color="primary" onClick={() => {
            fetch(`http://localhost:8088/going/${goingId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                getAllAttendance()

            })

            }} className="event__delete">Remove</Button>
        }
    
    
    // Function that conditionally renders an add or delete button depending on if the event is marked as "going"
    const addOrDeleteButton = (concert) => {
        const matchEvent = attendingEvents.find(attendingElement => attendingElement.eventId === concert.id
            && attendingElement.userId === tunedUserObj.id)

     return matchEvent
        ? deleteButton(matchEvent.id)
        : addButton(concert) 
    }

    
    return <>
    
        <h2 className="results__header">List of Local Concerts</h2>

        <div className="button__container">
        <Button color="primary" onClick={ () => { 
            if (showAttending) { updateShowAttending(false)}
            
            else { updateShowAttending(true) }

        }}>Toggle My Schedule</Button>
        </div>

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
                                {' '}
                                <Button color="primary" 
                                onClick={ () => {
                                    setModalEvent({...event})
                                    toggle()  }}>
                                    Show Details
                                </Button>
                            </footer>
                            </section>
                    }
                )
                }
        </article>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>
                                    {
                                        modalEvent.title
                                        ? `${modalEvent.title}: ${getArtistNames(modalEvent)}`
                                        : `${getArtistNames(modalEvent)}`
                                    }
                                    </ModalHeader>
                                <ModalBody>
                                    <List type="unstyled">
                                        <li>
                                            Artist(s): { getArtistNames(modalEvent)
                                            ? `${getArtistNames(modalEvent)}`
                                            : "N/A" }
                                        </li>
                                        <li>
                                            Venue: { modalEvent.venue
                                            ? `${modalEvent.venue}`
                                            : "N/A" }
                                        </li>
                                        <li>
                                           Street Address: { modalEvent.address
                                            ? `${modalEvent.address}`
                                            : "N/A" }
                                        </li>
                                        <li>
                                        Location: {modalEvent.city}, {getEventState(modalEvent)?.name}
                                        </li>
                                        <li>
                                           Time: {modalEvent.startTime
                                            ? `${modalEvent.startTime}`
                                            : "N/A" }
                                        </li>
                                        <li>
                                            Date: {modalEvent.startDate}
                                        </li>
                                        <li>
                                            Tickets: <a href={modalEvent.ticketsURL}>{modalEvent.ticketsURL}</a>
                                        </li>
                                        <li>
                                            {modalEvent.description 
                                            ? `Description: ${modalEvent.description}`
                                            : "" }
                                        </li>
                                        

                                    </List>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={toggle}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Modal>
                         
    
    
    
    </>
} 