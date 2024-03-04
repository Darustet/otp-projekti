import React from 'react';
import Calendar from "../../components/Calendar/Calendar.jsx";


const NotificationCard = () => {
  return (
    <>
    <Calendar/>
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.headerText}>Silver · Today @ 9pm</span>
          <img style={styles.profileImage} src="path_to_image.jpg" alt="Profile" />
        </div>
        <div style={styles.content}>
          <h2 style={styles.title}>watch party, let's go</h2>
          <button style={styles.button}>Osallistu</button>

        </div>

      </div>
    </div>
    	 </>
  );
};

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
    background: '#7C5AC2',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '300px',
    maxHeight: '300px',
    color: 'white',
    fontFamily: '"Arial", sans-serif',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
  },
  headerText: {
    fontSize: '16px',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  content: {
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    outline: 'none',
    width: '80%', // Adjust button width as per design
    margin: 'auto', // Center button in the card
  },
};

export default NotificationCard;
