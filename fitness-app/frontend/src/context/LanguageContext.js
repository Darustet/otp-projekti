import React, { createContext, useContext, useReducer } from 'react';
import i18n from '../i18n/i18n';

// Define the initial state
const initialState = {
  language: 'en' // Default language is English
};

// Define action types
const actionTypes = {
  SET_LANGUAGE: 'SET_LANGUAGE'

};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

// Create the context
const LanguageContext = createContext();

// Create the custom hook for accessing the language context
export const useLanguage = () => useContext(LanguageContext);

// Create the LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action creator function for setting the language
  const setLanguage = (language) => {
    i18n.changeLanguage(language);
    dispatch({
      type: actionTypes.SET_LANGUAGE,
      payload: language
    });
  };

  // Expose the context value
  const value = {
    language: state.language,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
