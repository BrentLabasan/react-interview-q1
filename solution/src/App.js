import React, { useState } from 'react';

function App() {
  const [objects, setObjects] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleAddObject = () => {
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
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Location:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Select Location</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
        </select>
      </div>
      <button onClick={handleAddObject}>Add</button>
      <button onClick={handleClearObjects}>Clear</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((obj, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
              <td>{obj.name}</td>
              <td>{obj.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
