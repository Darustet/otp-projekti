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

  const handleClick = () => {
    if (buttonText === 'Osallistu') {
      setButtonText('Peru osallistuminen');
    } else {
      setButtonText('Osallistu');
    }
  };

  function checkButton() {
    {if (source==="profile") {
      return (event && 
        <Link to={{ pathname: '/update-event', state: { event } }} >
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
          <span className={style.headerText}>{event.start}, {event.location}</span>
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
  max-height: 75px;
  overflow: scroll;
  ${({ showMore }) => showMore && ellipsis(undefined, 3)}
`;

const ShowMoreText = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  text-decoration: underline;
`;

