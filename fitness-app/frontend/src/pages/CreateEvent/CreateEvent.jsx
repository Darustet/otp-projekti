
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import './CreateEvent.scss';
import React, { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"; 




const CreateEvent = () => {
    const navigate = useNavigate();
    const [tags, setTags] = React.useState([]);
    const { loginState } = useAuthContext();
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const eventData = {
            title: eventName,
            description,
            date,
            location,
            categories: category,
            tags,
        };

        try {
            const response = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  loginState.token,
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                console.log('Event created successfully');
                navigate('/');
                // Handle success response, maybe clear the form or show a success message
            } else {
                console.error('Failed to create event');
                // Handle errors, maybe show an error message
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Title:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Location:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter address for event"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Event description:</label>
                    <textarea
                        cols={40}
                        rows={5}
                        id="description"
                        name="description"
                        placeholder="Enter description of event"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="input-tag">
                    <InputTag  tags={tags} setTags = {setTags}  />
                    <br />
                </div>

                <div className="form-group">
                    <button type="submit">Create Event</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
