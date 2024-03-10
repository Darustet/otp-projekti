import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, Toast, localeFi, getJson } from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import style from "./Calendar.module.scss";

const calenderSettings = {
	locale: localeFi,
	theme: "ios",
	themeVariant: "light",
};

const Calendar = () => {
	const [myEvents, setEvents] = useState([]),
		[isToastOpen, setToastOpen] = useState(false),
		[toastMessage, setToastMessage] = useState(),
		[themeChecked, setThemeChecked] = useState(false);

	const myView = useMemo(
		() => ({
			calendar: { type: "month" },
			agenda: { type: "month" },
		}),
		[]
	);

	const handleToastClose = useCallback((args) => {
		setToastOpen(false);
	}, []);

	const handleEventClick = useCallback((args) => {
		setToastMessage(args.event.title);
		setToastOpen(true);
	}, []);

	function handleThemeChange() {
		setThemeChecked(!themeChecked);
		const newThemeVariant = (themeChecked ? "dark" : "light");
		setOptions({
			...calenderSettings,
			themeVariant: newThemeVariant
		});
	}

	useEffect(() => {
		fetch("http://localhost:4000/api/posts")
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

	return (
		<aside className= {style["main-aside"]}>
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
						   onEventClick={handleEventClick}
			/>
			<Toast message={toastMessage} isOpen={isToastOpen}
				   onClose={handleToastClose}/>
		</aside>
	);
};

export default Calendar;