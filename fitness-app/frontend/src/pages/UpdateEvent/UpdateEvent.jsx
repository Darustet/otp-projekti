import "./UpdateEvent.scss";
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import FormTextElement from '../../components/FormTextElement';
import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../images/logo192.png";
import NavBar from '../../components/NavBar/NavBar';

function formatDate(dateString) {
    const date = new Date(dateString);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns month from 0-11
    let day = date.getDate();

    // Pad month and day with a leading zero if they are less than 10
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}


const UpdateEvent = ({state}) => {

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const { loginState } = useAuthContext();
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
  
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState(''); // Assuming single category selection for simplicity
    const [description, setDescription] = useState('');

    const location = useLocation()
  const { event } = location.state
    console.log(event);
    console.log("event: " + JSON.stringify(event));

useEffect(() => {
    setEnd(formatDate(event.end));
setStart(formatDate(event.start));
setEventName(event.title);
setEventLocation(event.location);
setCategory(event.categories[0]);
setTags(event.tags);
setDescription(event.description);
}, [event]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            title: eventName,
            description,
            start,
            end,
            location: eventLocation,
            categories: [category], // Convert to array to match schema
            tags,
            //host: loginState.user.id, // Ensure you have the host ID from login state or context
        };

        try {
            const response = await fetch('http://localhost:4000/api/posts/' + event._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: loginState.token,
                },
                body: JSON.stringify(eventData),
            });
console.log(eventData);
            if (response.ok) {
                console.log('Event updated successfully');
                navigate('/');
            } else {
                console.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const formGroupStyle = "input-group";
    return ( event &&
        <div className="update-event-page" key={event._id}>
            <div className="update-event-container">
                <div className="update-event-content">
                    <header className="update-event-header">
                        <img src={logo} alt="Logo" className="update-event-logo"/>
                        <h1>Update Event {event.title}</h1>
                    </header>
                    <form className="update-event-form" onSubmit={handleSubmit}>
                        <FormTextElement className={formGroupStyle}
                                         innerText="Title" id="eventName"
                                         name="eventName" placeholder="Enter event name"
                                         stateValue={eventName} handlerFunction={setEventName} />

                        <div className={formGroupStyle}>
                            <label htmlFor="event-description">Description:</label>
                            <textarea cols={40} rows={5} id="event-description"
                                      value={description}
                                      name="description"
                                      placeholder="Enter event description"
                                      onChange={e=>setDescription(e.target.value)}
                            >{event.description}</textarea>
                        </div>

                        <FormTextElement className={formGroupStyle}
                                         innerText="Start Date" id="event-start"
                                         name="start" inputType="date"
                                         stateValue={start} handlerFunction={setStart}/>

                        <FormTextElement className={formGroupStyle}
                                         innerText="End Date" id="event-end"
                                         name="end" inputType="date"
                                         stateValue={end} handlerFunction={setEnd}
                        />

                        <FormTextElement className={formGroupStyle}
                                         innerText="Category" id="event-category"
                                         name="category"
                                         placeholder="Enter event category"
                                         stateValue={category} handlerFunction={setCategory}
                        />

                        <div className={formGroupStyle}>
                            <label htmlFor="event-tags">Tags:</label>
                            <InputTag tags={tags} setTags={setTags} />
                        </div>

                        <FormTextElement className={formGroupStyle}
                                         innerText="Location" id="event-location"
                                         name="location"
                                         placeholder="Enter event location"
                                         stateValue={eventLocation} handlerFunction={setEventLocation}
                        />

                        <button type="submit" className="update-event-button">
                            Update Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateEvent;
