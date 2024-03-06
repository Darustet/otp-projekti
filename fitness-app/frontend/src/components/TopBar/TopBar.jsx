import React from 'react';
import styles from './TopBar.module.scss'; // Oletetaan, että tämä SCSS-tiedosto on olemassa
import SettingsIcon from '../Icons/SettingsIcon/SettingsIcon';

const TopBar = () => {

  return (
    <div className={styles.topBar}>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
      </div>
      <div className={styles.userSettings}>
        {/* Esimerkiksi käyttäjän kuva ja nimi, asetuspainike jne. */}
        <div className={styles.userDetails}>
          {/* Käyttäjän kuva ja nimi voisi tulla tähän */}
        </div>
        <button className={styles.settingsButton}>
        <SettingsIcon />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
