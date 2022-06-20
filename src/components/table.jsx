import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import MyContext from '../myContexts/myContext';

function Table() {
  const [sortedPlanet, setsortedPlanet] = useState([]);
  const { data, filterName,
    filterByNumericValues, mySort, isSort } = useContext(MyContext);
  const dados = [
    'name',
    'rotation period',
    'orbital period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface water',
    'population',
    'films',
    'created',
    'edited',
    'url',
  ];
  const mySortByname = (a, b) => {
    const valueA = a.name.toLowerCase();
    const valueB = b.name.toLowerCase();
    const numberReturn = -1;
    if (valueA < valueB) {
      return numberReturn;
    }
    if (valueB < valueA) {
      return 1;
    }
    return 0;
  };

  const mySortOrSortRevesce = () => {
    let planets = data.sort(mySortByname);
    if (isSort) {
      const unknown = data.filter((planet) => planet[mySort.column] === 'unknown');
      const known = data.filter((planet) => planet[mySort.column] !== 'unknown');
      let newknown;
      if (mySort.sort === 'Ascendente') {
        newknown = known.sort((a, b) => a[mySort.column] - b[mySort.column]);
      } else if (mySort.sort === 'Descendente') {
        newknown = known.sort((a, b) => b[mySort.column] - a[mySort.column]);
      }
      planets = [...newknown, ...unknown];
    }
    setsortedPlanet(planets);
  };

  useEffect(() => {
    if (data.length > 0) {
      mySortOrSortRevesce();
    }
  }, [mySort, data]);

  const filterButtonName = (chave, valor) => {
    const array = [];
    if (valor) {
      const { column, comparison, value } = valor;
      switch (comparison) {
      case 'maior que': {
        chave.forEach((elem) => {
          if (parseInt(elem[column], 10) > parseInt(value, 10)) {
            array.push(elem);
          }
        });
        return array;
      }
      case 'igual a': {
        chave.forEach((elem) => {
          if (elem[column] === value) {
            array.push(elem);
          }
        });
        return array;
      }
      case 'menor que': {
        chave.forEach((elem) => {
          if (parseInt(elem[column], 10) < parseInt(value, 10)) {
            array.push(elem);
          }
        });
        return array;
      }
      default:
        return chave;
      }
    }
    return chave;
  };

  function filterwithNumber(myList) {
    let listPlanets = [...myList];
    filterByNumericValues.forEach((items) => {
      const newListPlanet = filterButtonName(listPlanets, items);
      listPlanets = [...newListPlanet];
    });
    return listPlanets;
  }

  return (
    <div className="main">
      <table className="blueTable">
        <thead>
          <tr>
            {dados.map((element) => (
              <th key={ element }>
                { element }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { filterwithNumber(
            sortedPlanet.filter((element) => element.name.toLowerCase()
              .includes(filterName.name.toLowerCase())),
          ).map((element) => (
            <tr key={ element.name }>
              <td
                data-testid="planet-name"
              >
                { element.name }
              </td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>
                { element.films.map((url) => (
                  <p key={ url }>{ url }</p>
                ))}
              </td>
              <td>{ element.created }</td>
              <td>{ element.edited }</td>
              <td>{ element.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
