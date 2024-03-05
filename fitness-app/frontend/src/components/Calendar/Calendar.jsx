import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, setOptions, localeFi } from "@mobiscroll/react";
import { useCallback, useEffect, useState } from "react";
import "./Calender.module.scss";

setOptions({
	locale: localeFi,
	theme: "ios",
	themeVariant: "dark"
});

const Calendar = () => {
	const [myEvents, setEvents] = useState([]);

	const myView = {
		calendar: { type: "week" }, // Viikkonäkymä voi olla parempi aikavälin valintaan
	};

	const handleEventCreated = useCallback(
		(event) => {
			console.log("Event created:", event);
			setEvents([
				...myEvents,
				{
					...event.event,
					id: Math.random().toString(36).substr(2, 9), // Luodaan yksilöllinen ID uudelle tapahtumalle
				},
			]);
		},
		[myEvents]
	);

	useEffect(() => {
		fetch("http://localhost:4000/api/posts")
			.then((response) => (response.ok ? response.json() : Promise.reject("Failed to load.")))
			.then((data) => setEvents(data))
			.catch((error) => console.error("Fetch error:", error));
	}, []);

	return (
		<aside className="main-aside">
			<Eventcalendar
				className="eventcalendar"
				clickToCreate={true}
				dragToCreate={true}
				dragToMove={true}
				dragToResize={true}
				data={myEvents}
				view={myView}
				onEventCreated={handleEventCreated}
			/>
		</aside>
	);
};

export default Calendar;
