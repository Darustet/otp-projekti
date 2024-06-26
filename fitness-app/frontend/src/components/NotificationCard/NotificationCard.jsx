import React, { useState, useEffect} from 'react';
import { ellipsis } from 'polished';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../images/logo192.png";
import style from './NotificationCard.module.scss';
import i18n from '../../i18n/i18n';
import { useLanguage } from '../../context/LanguageContext';

export const NotificationCard = ({event, source}) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const toggleReadMore = () => setIsShowMore(show => !show);
  const { loginState } = useAuthContext();
  const [buttonText, setButtonText] = useState(('Participate'));
  const { t } = i18n;
  const [shortDate, setShortDate] = useState(event.start)
  const { language } = useLanguage();
  useEffect(()  => {
    //setButtonText(buttonText);
    if(event.start) {
        const dateSection = event.start.substring(0, 10);
        const [year, month, day] = dateSection.split('-');
        setShortDate(`${day}.${month}.${year}`);
    }
  }, [language]);

   

  

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
    if (buttonText === 'Participate') {
      joinEvent();
      setButtonText('Cancel participation');
    } else {
      leaveEvent();
      setButtonText('Participate');
    }
  };

  function checkButton() {
      if (source === "profile") {
          return (event &&
              <Link to={{pathname: '/update-event'}} state={{event}}
                    style={{color: 'inherit', textDecoration: 'inherit'}}>
                  <button className={style.button}>{t("Edit")}</button>
              </Link>
          );
      } else {
          return (
              <button onClick={handleClick} className={style.button}>{t(
                  buttonText)}</button>
          );
      }
  }

  return (
    <div key={event._id} className={style.wrapper}>
      <div className={isShowMore ? style.card: style.longCard}>
        <div className={style.header}>
          <span className={style.title}>{event.title}</span>
          <img className={style.profileImage} src={event.host?.profilePicture || logo} alt="Profile" />
        </div>
        <div className={style.timeAndLocation}>
          <span className={style.headerText}>{shortDate}, {event.location}</span>
        </div>
        <div className={style.content}>
          <DescriptionText>  {isShowMore ? (event?.description || "").slice(0, 50) : event.description} </DescriptionText>
          {event.description && event.description.length > 50 && (
            <ShowMoreText onClick={toggleReadMore}>
              {isShowMore ? t("Show more...") : t("Show less...")}
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
  //overflow: scroll;
  ${({ showMore }) => showMore && ellipsis(undefined, 3)}
`;

const ShowMoreText = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  text-decoration: underline;
`;
