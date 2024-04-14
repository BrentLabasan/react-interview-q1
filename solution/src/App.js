import React, { useState } from 'react';
import { isNameValid, getLocations } from 'react';

function App() {
  const [objects, setObjects] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isNameTaken, setIsNameTaken] = useState(null);

  const handleNameChange = (e) => {
    const targetValue = e.target.value;
    setName(targetValue);

    setIsNameTaken(isNameValid(targetValue));
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAddObject = () => {
    // TODO isNameTaken
    if (name.trim() !== '' && ['China', 'USA', 'Brazil'].includes(location)) {
      setObjects([...objects, { name, location }]);
      setName('');
      setLocation('');
    }
  };

  const handleClearObjects = () => {
    setObjects([]);
  };

  return (
    <div className="App">

      <h1>Object Management</h1>
      <div className="input-container">
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className="input-container">
        <label>Location:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={handleAddObject}>Add</button>
        <button onClick={handleClearObjects}>Clear</button>
      </div>
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
    </div>
  );
}

export default App;
