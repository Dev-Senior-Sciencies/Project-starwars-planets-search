import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MyContext from '../myContexts/myContext';
import api from '../Services/api';

function Provide({ children }) {
  const [data, setData] = useState([]);
  const [filterName, setfilterName] = useState({ name: '' });
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);
  const [filterInit, setfilterInit] = useState([]);
  const [mySort, setSortReverce] = useState({ column: 'population', sort: 'Ascendente' });
  const [isSort, setisSort] = useState(false);

  useEffect(() => {
    const myApi = async () => {
      const resultsApi = await api();
      setData(resultsApi);
    };
    myApi();
  }, []);

  const contextValue = {
    data,
    setData,
    filterName,
    setfilterName,
    filterByNumericValues,
    setfilterByNumericValues,
    filterInit,
    setfilterInit,
    mySort,
    setSortReverce,
    isSort,
    setisSort,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      {
        children
      }
    </MyContext.Provider>

  );
}

Provide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provide;
