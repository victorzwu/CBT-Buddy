import React from 'react'
import { createContext, useContext, useState } from 'react';
import { getFromDB } from '../Firebase/firestore';

const JournalContext = createContext();

function JournalProvider({children}) {

  const [formData, setFormData] = useState({
    mood: "",
    detail: "",
    photo: "",
    location: "",
    date: "",
  });
  const [data, setData] = useState([]);

  const getData = () => {
    getFromDB().then((res) => {
      setData(res);
    });
  };


  return (
    <JournalContext.Provider value={{ formData, setFormData, data, setData, getData }}>
      {children}
    </JournalContext.Provider>
  )
}

const useJournal = () => useContext(JournalContext);

export {JournalProvider, useJournal};