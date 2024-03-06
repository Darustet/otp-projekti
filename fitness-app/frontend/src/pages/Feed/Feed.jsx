"use client";
import React from "react";
import Calendar from "../../components/Calendar/Calendar.jsx";
import { NotificationCard } from "../../components/NotificationCard/NotificationCard";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";

const NotificationFeed = () => {
	const [list, setList] = useState(null);
	//const [event, setEvent] = useState(null);

	// Fetches all events and puts them in a list
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:4000/api/posts/");
				const eventList = await response.json();
				setList(eventList);
				console.log(eventList);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Fetches a single event by id and puts in a const
	// For testing so currently no functionality to choose id
	// If used, also uncomment const [event, setEvent]
	/*
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts/65e366fa566a227827773db8');
        const eventData = await response.json();
        setEvent(eventData);
        {console.log(eventData)}
      } catch(error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
    
  }, []);
  */

	// First goes through the JSON list of events and
	// creates NotificationCards for each of them
	return (
		<div>
			<div>
				{list && Array.isArray(list) && list.map((event) => <div>{event && <NotificationCard key={event._id} event={event} />}</div>)}
				{/* For fetch by id testing:
        {event && <NotificationCard key={event._id} event={event}/>}*/}
        <NavBar />

				<Calendar />
			</div>
		</div>
	);
};

export default NotificationFeed;
