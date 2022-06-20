import React, { useContext, useState } from 'react';
import '../index.css';
import MyContext from '../myContexts/myContext';

function Form() {
  const [newSort, setNewSort] = useState([]);
  const [newSortColum, setNewSortColum] = useState([]);
  const { filterName, setfilterName, setfilterByNumericValues,
    filterByNumericValues, setSortReverce, setisSort } = useContext(MyContext);
  const { name } = filterName;

  const [filterInit, setfilterInit] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,

  });
  const mySortOrSortRevesceValues = () => {
    setisSort(true);
    const myOrderValues = { column: newSortColum, sort: newSort };
    setSortReverce(myOrderValues);
  };

  function handleValue({ target }) {
    const valueInput = target.value;
    setfilterInit((prevState) => ({
      ...prevState,
      name: valueInput,
      [target.name]: valueInput,
    }));
  }

  const [dPColumn, setdPColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const dropCompare = [
    'maior que',
    'menor que',
    'igual a',
  ];

  function handleFilter() {
    const { column } = filterInit;
    const indexOfremov = dPColumn.indexOf(column);
    setdPColumn(dPColumn.filter((_element, index) => index !== indexOfremov));
    setfilterByNumericValues((prevState) => (
      [...prevState, filterInit]
    ));
  }

  function handleChanger({ target }) {
    const valueInput = target.value;
    setfilterName((prevState) => ({
      ...prevState,
      name: valueInput,
    }));
  }
  return (
    <div>
      <form>
        <input
          value={ name }
          onChange={ handleChanger }
          data-testid="name-filter"
          type="text"
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleValue }
          value={ filterInit.column }
        >
          {dPColumn.map((element) => (
            <option key={ element }>
              {element}
            </option>
          ))}
        </select>
        <select
          name="comparison"
          onChange={ handleValue }
          value={ filterInit.comparison }
          data-testid="comparison-filter"
        >
          {dropCompare.map((operated) => (
            <option key={ operated }>
              {operated}
            </option>
          ))}
        </select>
        <input
          name="value"
          value={ filterInit.value }
          type="number"
          onChange={ handleValue }
          data-testid="value-filter"
        />
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="button-filter"
        >
          filtro
        </button>
        <label htmlFor="odern">
          Ordenar
          <select
            onChange={ ({ target }) => setNewSortColum(target.value) }
            value={ newSortColum }
            id="odern"
            data-testid="column-sort"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="asc">
          <input
            onClick={ () => setNewSort('Ascendente') }
            id="asc"
            data-testid="column-sort-input-asc"
            type="radio"
            name="myValueRadio"
            value="Ascendente"
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            onClick={ () => setNewSort('Descendente') }
            id="desc"
            type="radio"
            data-testid="column-sort-input-desc"
            name="myValueRadio"
            value="Descendente"
          />
          Descendente
        </label>
        <button
          onClick={ mySortOrSortRevesceValues }
          type="button"
          data-testid="column-sort-button"
        >
          ORDENAR
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setfilterByNumericValues([]);
          } }
        >
          Remover todas filtragens
        </button>
        {
          filterByNumericValues.map((element, index) => (

            <div
              data-testid="filter"
              key={ index }
            >
              <h1>
                {`Filtro Por ${element.column}`}
              </h1>
              <button
                onClick={ () => {
                  const newFilters = [...filterByNumericValues];
                  newFilters.splice(index, 1);
                  setfilterByNumericValues(newFilters);
                } }
                type="button"
              >
                <i>X</i>
              </button>
              {`${element.column} ${element.comparison} ${element.value}`}
            </div>
          ))
        }
      </form>
    </div>
  );
}
export default Form;
