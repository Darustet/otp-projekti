import React, { useState, useEffect} from 'react';
import { ellipsis } from 'polished';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { useAuthContext } from "../../context/AuthContext"; 
import logo from "../../images/logo192.png";
import style from './NotificationCard.module.scss';

export const NotificationCard = ({event, source}) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const toggleReadMore = () => setIsShowMore(show => !show);
  const { loginState } = useAuthContext();
  const [buttonText, setButtonText] = useState('Osallistu');
  const shortDate = event.start.substring(0, 10);
  const [year, month, day] =  shortDate.split('-');
  const date = `${day}.${month}.${year}`;
  

const joinEvent = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/join/${event._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: loginState.token,
        },
      });
      if (response.ok) {
        console.log('Joined event successfully');
      } else {
        console.error('Failed to join event');
      }
    }
    catch (error) {
      console.error('Error joining event:', error);
    }
  };

   const leaveEvent = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/leave/${event._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: loginState.token,
        },
      });
      if (response.ok) {
        console.log('Left event successfully');
      } else {
        console.error('Failed to leave event');
      }
    }
    catch (error) {
      console.error('Error leaving event:', error);
    }
  };


  const handleClick = () => {
    if (buttonText === 'Osallistu') {
      joinEvent();
      setButtonText('Peru osallistuminen');
    } else {
      leaveEvent();
      setButtonText('Osallistu');
    }
  };

  function checkButton() {
    {if (source==="profile") {
      return (event && 
        // <Link to={{ pathname: '/update-event' }} state=  {{ event }} style={{ textDecoration: 'none', textDecorationColor: 'white' }}>
        <Link to={{ pathname: '/update-event' }} state=  {{ event }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <button className={style.button}>Muokkaa</button>
        </Link>
      );
    } else {
      return (
      <button onClick={handleClick} className={style.button}>{buttonText}</button>
      );
    }}
  };


  return (
    <div key={event._id} className={style.wrapper}>
      <div className={isShowMore ? style.card: style.longCard}>
        <div className={style.header}>
          <span className={style.title}>{event.title}</span>
          <img className={style.profileImage} src={event.host?.profilePicture || logo} alt="Profile" />
        </div>
        <div className={style.timeAndLocation}>
          <span className={style.headerText}>{date}, {event.location}</span>
        </div>
        <div className={style.content}>
          <DescriptionText> {isShowMore ? (event?.description || "").slice(0, 50) : event.description} </DescriptionText>
          {event.description && event.description.length > 50 && (
            <ShowMoreText onClick={toggleReadMore}>
              {isShowMore ? "Show more..." : "Show less"}
            </ShowMoreText>
          )}
        </div>
        <div className={style.content}>
          {checkButton()}
        </div>
      </div>
    </div>
  );
};



const DescriptionText = styled.div`
  font-size: 14px;
  margin-top: 20px;
  max-height: 250px;
  overflow: scroll;
  ${({ showMore }) => showMore && ellipsis(undefined, 3)}
`;

const ShowMoreText = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  text-decoration: underline;
`;

