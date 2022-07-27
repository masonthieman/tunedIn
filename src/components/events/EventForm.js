import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const EventForm = () => {
    const [event, update] = useState({
        title: "",
        venue: "",
        address: "",
        description: "",
        city: ""
    })
    const [artist, setArtist] = useState({
        name: ""
    })

    const localTunedUser = localStorage.getItem("tuned_user")
    const tunedUserObj = JSON.parse(localTunedUser)
    const navigate = useNavigate()
  
    const handleCreateButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        const createdEvent = {
            userId: tunedUserObj.id,

        }
        const createdArtist = {
            name: artist.name
        }

        fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdEvent)
        })
            .then(response => response.json())
            .then( () => {
               return fetch(`http://localhost:8088/artists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
               })
               .then(response => response.json())
               
            })
            .then(() => {
                navigate("/events/created")
            })
    }   
    
    return <form className="eventForm">
        <h2 className="eventForm__title">Create Event</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={event.title}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...event }
                            copy.title = changeEvt.target.value
                            update(copy)
                        }
                    }>{event.title}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="artist">Artist:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={artist.name}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...artist }
                            copy.name = changeEvt.target.value
                            setArtist(copy)
                        }
                    }>{artist.name}</textarea>
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={event.venue}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...event }
                            copy.venue = changeEvt.target.value
                            update(copy)
                        }
                    }>{event.venue}</textarea>
            </div>
        <div className="form-group">
            <label htmlFor="address">Street Address:</label>
            <textarea
                required autoFocus
                type="text"
                style={{
                    height: "1.5rem"
                }}
                className="form-control"
                value={event.address}
                onChange={
                    (changeEvt) => {
                        const copy = { ...event }
                        copy.address = changeEvt.target.value
                        update(copy)
                    }
                }>{event.address}</textarea>
        </div>
        <div className="form-group">
                <label htmlFor="city">City:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={event.city}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...event }
                            copy.city = changeEvt.target.value
                            update(copy)
                        }
                    }>{event.city}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "5rem"
                    }}
                    className="form-control"
                    value={event.description}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...event }
                            copy.description = changeEvt.target.value
                            update(copy)
                        }
                    }>{event.description}</textarea>
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleCreateButtonClick(clickEvent)}
            className="btn btn-primary">
            Create Event
            </button>
    </form>
}