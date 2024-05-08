import "./UpdateEvent.scss";
import '../../components/InputTag/InputTag.module.scss';
import InputTag from "../../components/InputTag/InputTag";
import FormTextElement from '../../components/FormTextElement';
import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../images/logo192.png";
//import NavBar from '../../components/NavBar/NavBar';
import i18n from "../../i18n/i18n.js";
import { useLanguage } from "../../context/LanguageContext.js";




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


const UpdateEvent = ({state, toastTC}) => {

    const { language } = useLanguage();
    useEffect(() => {
		const dir = i18n.dir(i18n.language);
		document.documentElement.dir = dir;
	 // eslint-disable-next-line react-hooks/exhaustive-deps
	 }, [language]);

	const { t } = i18n;

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    const { loginState } = useAuthContext();
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
  
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [category, setCategory] = useState(''); // Assuming single category selection for simplicity
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState('');


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

        // Check if any required fields are empty
        if (!eventName || !eventLocation || !start || !end || !category || !description || tags.length === 0) {
            // Set error message indicating required fields
            setFormError('Please fill in all required fields.');
            return; // Prevent form submission
        }

        // Reset form error
        setFormError('');

        const eventData = {
            title: eventName,
            description,
            start,
            end,
            location: eventLocation,
            categories: [category],
            tags,
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
                toastTC.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
                console.log('Event updated successfully');
                navigate('/');
            } else {
                toastTC.current.show({ severity: 'error', summary: 'Error', detail: 'No internet connection', life: 3000 });
                console.error('Failed to update event');
            }
        } catch (error) {
            toastTC.current.show({ severity: 'error', summary: 'Error', detail: 'No internet connection', life: 3000 });
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
                        <h1>{t("Create Event")} {event.title}</h1>
                    </header>
                    <form className="update-event-form" onSubmit={handleSubmit}>
                        <FormTextElement className={formGroupStyle}
                                         innerText= {t("Title")} id="eventName"
                                         name="eventName" placeholder={t("Enter event title")}
                                         stateValue={eventName} handlerFunction={setEventName} />

                        <div className={formGroupStyle}>
                            <label htmlFor="event-description">{t("Description")}</label>
                            <textarea cols={40} rows={5} id="event-description"
                                      value={description}
                                      name= {t("description")}
                                      placeholder={t("Enter event description")}
                                      onChange={e=>setDescription(e.target.value)}
                            >{event.description}</textarea>
                        </div>

                        <FormTextElement className={formGroupStyle}
                                         innerText= {t("Start Date")} id="event-start"
                                         name="start" inputType="date"
                                         stateValue={start} handlerFunction={setStart}/>

                        <FormTextElement className={formGroupStyle}
                                         innerText= {t("End Date" )} id="event-end"
                                         name="end" inputType="date"
                                         stateValue={end} handlerFunction={setEnd}
                        />

                        <FormTextElement className={formGroupStyle}
                                         innerText={t("Category" )} id="event-category"
                                         name="category"
                                         placeholder={t("Enter event category")}
                                         stateValue={category} handlerFunction={setCategory}
                        />

                        <div className={formGroupStyle}>
                            <label htmlFor="event-tags">{t("Tags:")}</label>
                            <InputTag tags={tags} setTags={setTags} />
                        </div>

                        <FormTextElement className={formGroupStyle}
                                         innerText={t("Location")} id="event-location"
                                         name="location"
                                         placeholder={t("Enter event location")}
                                         stateValue={eventLocation} handlerFunction={setEventLocation}
                        />

                        <button type="submit" className="update-event-button">
                        {t("Create Event")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateEvent;
