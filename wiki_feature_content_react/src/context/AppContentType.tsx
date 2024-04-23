import React, { createContext, useContext, useState } from 'react';
import { ContentItem } from '../pages/ContentPage';

interface AppContextType {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  content: ContentItem[];
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [content, setContent] = useState<ContentItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedLanguage,
        setSelectedLanguage,
        content,
        setContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
