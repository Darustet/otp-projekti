import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import styles from "./CreateEvent.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; 
import logo from "../../images/logo192.png";

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

    return (
        <div className={styles["create-event-page"]}>
            <div className={styles["create-event-container"]}>
                <div className={styles["create-event-content"]}>
                    <header className={styles["create-event-header"]}>
                        <img src={logo} alt="Logo" className={styles["create-event-logo"]} />
                        <h1>Create Event</h1>
                    </header>
                    <form className={styles["create-event-form"]} onSubmit={handleSubmit}>
                        {/* Event Name Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-name">Title:</label>
                            <input
                                type="text"
                                id="event-name"
                                value={eventName}
                                name="eventName"
                                placeholder="Enter event name"
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        {/* Event Description Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-description">Description:</label>
                            <textarea
                                id="event-description"
                                value={description}
                                name="description"
                                placeholder="Enter event description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {/* Start Date Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-start">Start Date:</label>
                            <input
                                type="date"
                                id="event-start"
                                value={start}
                                name="start"
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </div>
                        {/* End Date Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-end">End Date:</label>
                            <input
                                type="date"
                                id="event-end"
                                value={end}
                                name="end"
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </div>
                        {/* Event Category Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-category">Category:</label>
                            <input
                                type="text"
                                id="event-category"
                                value={category}
                                name="category"
                                placeholder="Enter event category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        {/* Event Tags Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-tags">Tags:</label>
                            <InputTag tags={tags} setTags={setTags} />
                        </div>
                        {/* Event Location Input */}
                        <div className={styles["input-group"]}>
                            <label htmlFor="event-location">Location:</label>
                            <input
                                type="text"
                                id="event-location"
                                value={location}
                                name="location"
                                placeholder="Enter event location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles["create-event-button"]}>
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
