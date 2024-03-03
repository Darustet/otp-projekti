import React from 'react';
import Calendar from "../../components/Calendar/Calendar";
import NotificationCard from "../../components/NotificationCard/NotificationCard";

const NotificationFeed = () => {

  return (
    <div>
      <div>
        {/* Example card, idea to change to a feed consisting of similar cards */}
        <NotificationCard/>
        <Calendar/>
      </div>
    </div>
  )
}

/*
const NotificationCard = () => {
  return (
    <>
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.title}>Neighbourhood basketball</span>
          <img style={styles.profileImage} src="path_to_image.jpg" alt="Profile" />
        </div>
        <div style={styles.timeAndLocation}>
          <span style={styles.headerText}>Silver · Today @ 9pm</span>
        </div>
        <div style={styles.content}>
          <text tyle={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</text>
        </div>
        <div styles={styles.content}>
          <button style={styles.button}>Osallistu</button>
        </div>

      </div>
    </div>
    	<Calendar /> </>
  );
};*/

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh', // Full viewport height
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
    width: '600px',
    maxWidth: '50%',
    maxHeight: '300px',
    color: 'white',
    fontFamily: '"Arial", sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
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
    fontsize: '18px',
    padding: '20px',
    marginTop: '20px',
  },
  profileImage: {
    width: '40px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
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
    width: '100%', // Adjust button width as per design
    margin: 'auto', // Center button in the card
  },
};

export default NotificationFeed;
