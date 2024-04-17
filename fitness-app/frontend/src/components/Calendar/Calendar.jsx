import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, Toast, locale, getJson } from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import style from "./Calendar.module.scss";
import { useAuthContext } from "../../context/AuthContext.js";
import { useLanguage } from "../../context/LanguageContext.js";

const calenderSettings = {
	locale: locale,
	theme: "ios",
	themeVariant: "light",
};
setOptions(calenderSettings)

export default function Calendar() {

	const { language } = useLanguage();
	//console.log(language);
	const [myEvents, setEvents] = useState([]),
		[isToastOpen, setToastOpen] = useState(false),
		[toastMessage, setToastMessage] = useState(),
		[themeChecked, setThemeChecked] = useState(false);
		const { loginState } = useAuthContext();

	const myView = useMemo(
		() => ({
			calendar: { type: "month" },
			agenda: { type: "month" },
		}),[]
	);

	const handleToastClose = useCallback((args) => {
		setToastOpen(false);
	}, []);

	const handleEventClick = useCallback((args) => {
		setToastMessage(args.event.title);
		setToastOpen(true);
	}, []);

	const handleLeaveEvent = useCallback((eventId) => {
		// Perform the necessary logic to leave the event
		// This could involve sending a request to your server to update the database
		
		// For demonstration purposes, let's assume myEvents is an array of events
		// You need to update this array to remove the event with the specified eventId
		const updatedEvents = myEvents.filter(event => event.id !== eventId);
		
		// Update the state with the updated events
		setEvents(updatedEvents);
	}, [myEvents]);
	
	// Add an event handler to handle leaving events
	const handleEventLeave = useCallback((args) => {
		const eventId = args.event.id;
		handleLeaveEvent(eventId);
	}, [handleLeaveEvent]);
	

	function handleThemeChange() {
		setThemeChecked(!themeChecked);
		const newThemeVariant = (themeChecked ? "dark" : "light");
		setOptions({
			...calenderSettings,
			themeVariant: newThemeVariant
		});
	}

	useEffect(() => {
		console.log(loginState.token)
		fetch("http://localhost:4000/api/posts/participant",
			{
				method: "GET",
				headers: {
					"Authorization": loginState.token,
					"Content-Type": "application/json",
				},
			})	



			.then(response => {
				if (response.ok) {
					return response.json(); // Parse the JSON data from the response
				}
				throw new Error('Network response was not ok.');
			})
			.then(data => {
				setEvents(data); // Update the state with the fetched data
				console.log(data);
			})
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
		// The empty dependency array means this effect will only run once when the component mounts
	}, []);

	return <aside className= {style["main-aside"]}>
		{/*<button onClick={handleThemeChange}>
				{themeChecked ? "Light" : "Dark"}</button>*/}
		<Eventcalendar className="eventcalendar"
					   clickToCreate={false}
					   dragToCreate={false}
					   dragToMove={false}
					   dragToResize={false}
					   eventDelete={false}
					   data={myEvents}
					   view={myView}
					   locale={locale[language]}
					   onEventClick={handleEventClick}
					   onEventDelete={handleEventLeave}
		/>
		<Toast message={toastMessage} isOpen={isToastOpen}
			   onClose={handleToastClose}/>
	</aside>
}
