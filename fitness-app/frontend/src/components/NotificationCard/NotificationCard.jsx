import { useState} from 'react';
import { ellipsis } from 'polished';
import styled from 'styled-components';


const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisiLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisi`;


const NotificationCard = () => {
  const [isShowMore, setIsShowMore] = useState(true);
  const toggleReadMore = () => setIsShowMore(show => !show);


    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.title}>Neighbourhood basketball</span>
            <img style={styles.profileImage} src="path_to_image.jpg" alt="Profile" />
          </div>
          <div style={styles.timeAndLocation}>
            <span style={styles.headerText}>9.3.2024, Lincoln Park Basketball Court</span>
          </div>
          <div style={styles.content}>
            <DescriptionText> {isShowMore ? text.slice(0, 300) : text} </DescriptionText>
            {text && text.length > 300 && (
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
      background: 'rgb(24, 86, 204)',
      borderRadius: '20px',
      padding: '20px',
      width: '1000px',
      maxWidth: '50%',
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

export default NotificationCard