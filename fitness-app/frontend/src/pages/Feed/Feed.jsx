"use client";
import {NotificationCard} from "../../components/NotificationCard/NotificationCard";
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "./Feed.module.scss";
import TopBar from "../../components/TopBar/TopBar.jsx";
import i18n from "../../i18n/i18n";
import PostIcon from "../Profile/PostIcon.svg";
import SVGImg from '../../components/Icons/SVGImg';

export default function NotificationFeed() {
  const { t } = i18n;
  const [list, setList] = useState([]);
  //const searchInput = "Leikki";
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (term) => {
    setSearchTerm(term);
    // You can do whatever you want with the search term here, like updating state or making API calls
};

// Fetches all events and puts them in a list
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/posts/");
            const eventList = await response.json();
            setList(eventList);
            //console.log(eventList);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

  // First goes through the JSON list of events and
  // creates NotificationCards for each of them
  return (
    <>
    <TopBar location = {t("Feed")} setSearchTerm={handleSearch} />

    <div className={styles["container"]}>
      <div className={styles["layout"]}>
          {searchTerm !== "" ? (list &&
              Array.isArray(list) &&
              list.filter((event) => event.categories.some(category =>
                      category.toLowerCase().includes(searchTerm.toLowerCase()))) // Only shows events containing searched category
                  .map((event) => (
                      <div key={event._id}>
                          {event && <NotificationCard key={event._id} event={event}/>}
                      </div>
                  ))
          ) :(
                      list &&
              Array.isArray(list) &&
              list.map((event) => (
                      <div key={event._id}>
                          {event && <NotificationCard key={event._id} event={event}/>}
                      </div>
                  )))}
      </div>
    </div>
        <SVGImg svgFile={PostIcon} imgAlt="post icon"
                styleClass="post-icon"
                handlerFunction={navigate} stateValue="/create-event"/>
    </>
  );
};
