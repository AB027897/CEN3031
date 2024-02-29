import React, { useState, useEffect } from 'react'
//import './App.css';

function App() {
  
  const [data, setData] = useState([{}])
  
  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []) // [] ensures useEffect only runs once

  return (
    <div>
        {(typeof data.members === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}
    </div>
  );
}

export default App;
