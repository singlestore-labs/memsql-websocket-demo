import React, { useEffect, useState } from 'react';
import './App.css';
 
import { Connection, ConnectionConfig } from 'memsql-websockets-js';
 
function App() {
 const [rows, setRows] = useState([]);
 
 useEffect(() => {
  const conn = new Connection({
   config: new ConnectionConfig({
    host: '192.168.184.156',
    port: 7000,
    user: 'root',
    password: 'password',
    endpoint: 'proxy',
    database: 'demo',
    typeCast: true,
    ssl: false
   })
  });
  console.log('querying...');
  
  conn.query('select name, id from demo.table1', [], (err, rowResults) => {
   if (err) {
    console.error({err});
   } else {
    console.log('results:', rowResults);
    setRows(rowResults);
   }
  })
 }, []);
 
 return (
  <div className="App">
   <h1>MemSQL Web Sockets</h1>
   <ul>
    {rows.map(row => (
     <li key={row.id}>
      <b>id:</b> {row.id},&nbsp;
      <b>name:</b> {row.name}
     </li>
    ))}
   </ul>
  </div>
 );
}
 
export default App;
