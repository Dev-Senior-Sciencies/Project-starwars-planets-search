import React from 'react';
import Table from './components/table';
import Form from './components/form';
import Provide from './myProvide/provide';
import './App.css';

function App() {
  return (
    <Provide>
      <Form />
      <Table />
    </Provide>

  );
}

export default App;
