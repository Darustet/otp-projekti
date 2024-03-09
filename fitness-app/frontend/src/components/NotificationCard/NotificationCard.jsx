import React, { useState, useEffect} from 'react';
import { ellipsis } from 'polished';
import styled from 'styled-components';
import { useAuthContext } from "../../context/AuthContext"; 

// Test
//const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. 

// Gets JSON for one event as an argument
export const NotificationCard = ({event}) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const toggleReadMore = () => setIsShowMore(show => !show);
  const { loginState } = useAuthContext();
  const displayDate = event.start.substring(0, 10);

  // NotificationCard is structured here 
  // Gets event information from argument
  return (
    <div key={event.id}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.title}>{event.title}</span>
            <img style={styles.profileImage} src="path_to_image.jpg" alt="Profile" />
          </div>
          <div style={styles.timeAndLocation}>
            <span style={styles.headerText}>{displayDate}, {event.location}</span>
          </div>
          {/* Following implemets "Show more / show less" functionality. 
          Doesn't show content beyound 300 characters if "Show more" isn't clicked*/}
          <div style={styles.content}>
            <DescriptionText> {isShowMore ? event.description.slice(0, 300) : event.description} </DescriptionText>
            {event.description && event.description.length > 300 && (
              <ShowMoreText onClick={toggleReadMore}>
                {isShowMore ? "Show more..." : "Show less"}
            </ShowMoreText>
            )}
          </div>
          <div styles={styles.content}>
            <button style={styles.button}>Osallistu</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Styling for NotificationCard
const styles = {
  wrapper: {
    display: 'flex',
    height: '30vh', // Full viewport height
    width: '100%', // Full viewport width
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'flex-start',
    alignContent: 'felex-start',
  },
  card: {
    background: 'rgb(24, 86, 204)',
    borderRadius: '20px',
    padding: '20px',
    width: '30vw',
    maxWidth: '50%',
    color: 'white',
    fontFamily: '"Arial", sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    alignItems: 'auto',
    marginLeft: "20%",
    border: '10px',
  },
  timeAndLocation: {
    color: 'rgba(255, 255, 255, 0.81)',
    display: 'flex',
    alignItems: 'right',
    width: '100%',
    marginBottom: '15px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: '16px',
  },
  description: {
    flexGrow: 1,
    fontsize: '18px',
    padding: '20px',
    marginTop: '20px',
  },
  profileImage: {
    width: '40px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginLeft: '20px',
    display: 'relative',
  },
  content: {
    textAlign: 'left',
    width: '100%',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    outline: 'none',
    width: '50%', // Adjust button width as per design
    margin: 'auto', // Center button in the card
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
};

const DescriptionText = styled.div`
  font-size: 14px;
  margin-top: 20px;
  ${({ showMore }) => showMore && ellipsis(undefined, 3)}
`;

const ShowMoreText = styled.div`
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  text-decoration: underline;
`;

