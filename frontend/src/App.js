// import "./assets/styles/global.css";
import { useState, createContext, useEffect } from 'react';
import { ChartPage } from './app/pages/Chart/ChartPage';
import Dashboard from './app/pages/Dashboard';

export const DataContext = createContext();

function App() {
  const [dataContext, setDataContext] = useState({
    selectedType: '',
    selectedDate: {
      startDate: '',
      endDate: '',
    },
  });

  const ctx = { dataContext, setDataContext };

  useEffect(() => {
    console.log(JSON.stringify(dataContext, null, 2));
  }, [dataContext]);

  return (
    <div className='App'>
      <DataContext.Provider value={ctx}>
        <Dashboard />
        <ChartPage />
      </DataContext.Provider>
    </div>
  );
}

export default App;
