"use client";
import React from "react";
import Calendar from "../../components/Calendar/Calendar.jsx";
import {NotificationCard} from "../../components/NotificationCard/NotificationCard";
import { useState, useEffect} from 'react';
import NavBar from '../../components/NavBar/NavBar';


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

  // First goes through the JSON list of events and
  // creates NotificationCards for each of them
  return (
      <div>
		  <header className="shifted-header">
			  <h1>Feed</h1>
		  </header>
          {list && Array.isArray(list) && list.map((event) => (
              <div>
                  {event && <NotificationCard key={event._id} event={event}/>}
              </div>
          ))}
		  <NavBar />
          {/* For fetch by id testing:
        {event && <NotificationCard key={event._id} event={event}/>}*/}
          <Calendar/>
      </div>
  );
};

const styles = {
  layout: {
    position: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}

export default NotificationFeed;
