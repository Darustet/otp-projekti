import "./CreateEvent.module.scss";
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import FormTextElement from '../../components/FormTextElement';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../images/logo192.png";

const CreateEvent = () => {
    const formGroupStyle = "form-group";

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
        <div className="form-container">
            <h2>Create Event</h2>
            <FormTextElement className={formGroupStyle}
                             innerText="Event name" id="eventName"
                             name="eventName" placeholder="Enter event name"/>

            <FormTextElement className={formGroupStyle}
                             innerText="Address" id="address"
                             name="address" placeholder="Enter address for event"/>

            <FormTextElement className={formGroupStyle}
                             innerText="City" id="city"
                             name="city" placeholder="Enter city"/>

            <FormTextElement className={formGroupStyle}
                             innerText="Country" id="country"
                             name="country" placeholder="Enter county"/>

            <FormTextElement className={formGroupStyle}
                             innerText="ZIP" id="zip"
                             name="zip" placeholder="Enter ZIP code"/>

            <div className="form-group">
                <label htmlFor="description">Event description:</label>
                <textarea cols={40} rows={5} id="description" name="description"
                          placeholder="Enter description of event"/>
            </div>

            <div className="input-tag">
                <InputTag/>
                <br/>
            </div>

            <div className="form-group">
                <button type="button">Create Event</button>
            </div>
        </div>
    );
}

export default CreateEvent;
