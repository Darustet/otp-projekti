import "./CreateEvent.scss";
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import FormTextElement from '../../components/FormTextElement';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../images/logo192.png";
import NavBar from '../../components/NavBar/NavBar';

const CreateEvent = () => {

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const { loginState } = useAuthContext();
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState(''); // Assuming single category selection for simplicity
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            title: eventName,
            description,
            start,
            end,
            location,
            categories: [category], // Convert to array to match schema
            tags,
            //host: loginState.user.id, // Ensure you have the host ID from login state or context
        };

        try {
            const response = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: loginState.token,
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                console.log('Event created successfully');
                navigate('/');
            } else {
                console.error('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const formGroupStyle = "input-group";
    return (
        <>
        <div className="create-event-page">
            <div className="create-event-container">
                <div className="create-event-content">
                    <header className="create-event-header">
                        <img src={logo} alt="Logo" className="create-event-logo"/>
                        <h1>Create Event</h1>
                    </header>
                    <form className="create-event-form" onSubmit={handleSubmit}>
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
                            />
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
                                         stateValue={location} handlerFunction={setLocation}
                        />

                        <button type="submit" className="create-event-button">
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
