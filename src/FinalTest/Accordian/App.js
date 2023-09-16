import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [result, setResult] = useState([]);
  const [toggle, setToggle] = useState([]);

  async function fetchData() {
    const response = await axios({
      method: 'get',
      url: 'https://training.virash.in/faqs'
    });
    setResult(response.data);

    setToggle(response.data.map(() => false));
    // console.log(response.data);
    // console.log(toggle);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (index) => {

    const updatedToggle = [...toggle];
    updatedToggle[index] = !updatedToggle[index];
    setToggle(updatedToggle);
  }

  return (
    <div className='container'>
      {result.map((data, index) => {
        return (
          <>
            <div className={toggle[index] ? "item onclick" : 'item'}>
              <div
                key={data.faq_id}
                className='flex'
                onClick={() => handleClick(index)}
              >
                <p className={toggle[index] ? "green" : 'gray'}> {"0" + data.faq_id} </p>
                <p> {data.question} </p>
                <p> {toggle[index] ? "-" : "+"} </p>
              </div>
              {toggle[index] && <div>
                <p className='black'> {data.answer} </p>
              </div>}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default App;
