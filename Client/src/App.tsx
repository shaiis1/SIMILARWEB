import React, { useState } from 'react';
import './App.css';
import ChartSwitcher from './Components/ChartSwitcher';
import ChartView from './Components/ChartView';
import Navbar from './Components/NavBar';
import TableView from './Components/TableView';
import { useAppDispatch, useAppSelector } from './slices/hooks';
import { getProducts } from './slices/productsSlice';
import { viewsState } from './slices/viewSlice';

const App = () => {
  
  const dispatch = useAppDispatch()
  dispatch(getProducts())
  const { selectedView } = useAppSelector(viewsState)

  return (
    <div className="App">
      <Navbar />
      {selectedView === 'chart' ? <ChartView /> : <TableView />}
    </div>
  );
}

export default App;


//Ss7193522$ DB PASS