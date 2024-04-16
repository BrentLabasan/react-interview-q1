/*
Implemented features:
- A debouncer function has been implemented on the isNameValid calling when updating the name input field because 1) if not implemented, then the Promises returned could be out of order 2) prevent over-working the backend. I realized I needed a debouncer because I QA tested the scenario where a user types in "invalid name" really quickly.
- user is able to tab through input fields and buttons on page
- Add and Clear button are on opposite sides of the layout, to avoid accidentally pressing one over the other
- Buttons when hovered are styled cursor: pointer
- Table rows alternate in colors, to distinguish one row from another.
- When hovering over table rows, row being hovered over turns different color.
- For responsive design, CSS breakpoint is: @media (max-width: 600px

Things that can implemented to the app to make it more usable:
- Before the app initially loads, display a message and animated image that the app is loading. An animated image lets the user know that the app or screen hasn't glitched out and frozen.
- If the API call to isNameValid is still running, prevent the Add button from adding a new object.
- Make the app ARIA compliant.
- When the user presses the "Clear" button, you might ask a confirmation message to clear the objects in the state.
- Make the 2 buttons different colors. Put different icons in them.
*/

import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';

function App() {
  const [objects, setObjects] = useState([]);
  const [objectName, setObjectName] = useState('');
  const [objectLocation, setObjectLocation] = useState('');
  const [stateIsNameValid, setStateIsNameValid] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);

  //  Runs only once.
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getLocations();
      setLocationOptions(response); // Assuming API response successfully returns is an array of location choices.
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const validateInput = async () => {
      const response = await isNameValid(objectName);
      setStateIsNameValid(response);
    };

    if (objectName !== '') {
      const getData = setTimeout(() => {
        validateInput();
      }, 500)

      return () => clearTimeout(getData)
    } else {
      setStateIsNameValid(true);
    }
  }, [objectName]);

  const handleNameChange = (e) => {
    setObjectName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setObjectLocation(e.target.value);
  };

  const handleAddObject = () => {
    if (objectName.trim() !== '' && locationOptions.includes(objectLocation)) {
      setObjects([...objects, { name: objectName, location: objectLocation }]);

      setObjectName('');
      setObjectLocation('');
    }
  };

  const handleClearObjects = () => {
    setObjects([]);
  };

  return (
    <div className="App">

      <h1>react-interview-q1 by Brent Labasan</h1>
      <div className="input-container">
        <label>Name:</label>
        <input type="text" value={objectName} onChange={handleNameChange} placeholder="object's name e.g. John Doe" />
      </div>
      <div className="warning-container">
        {!stateIsNameValid && <span>
          This name has already been taken.
        </span>}
        &nbsp;
      </div>
      <div className="input-container">
        <label>Location:</label>
        <select value={objectLocation} onChange={handleLocationChange}>
          <option value="">Select a country</option>
          {locationOptions.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div className="button-container">
        <button id="btn_add" disabled={objectName === "" || objectLocation === "" || !stateIsNameValid} onClick={handleAddObject}>+ Add</button>

        <button id="btn_clear" onClick={handleClearObjects}>Clear</button>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{obj.name}</td>
              <td>{obj.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {objects.length === 0 && <div id="infoMessage_noObjectsToDisplay">
        There are currently no objects to display.
        <br />
        Click the "Add" button to add an object.
        </div>}
    </div>
  );
}

export default App;