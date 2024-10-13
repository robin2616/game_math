
import React, { useState, useEffect } from 'react';
import './App.css';

const generateMathQuestion = () => {
  const num1=Math.floor(Math.random()*10)+1
  const num2=Math.floor(Math.random()*10)+1
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2,
  };
};

const Box = ({ id, onClick, isClickable }) => {
  return (
    <div
      onClick={() => isClickable && onClick(id)}
      className="w-16 h-16 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex justify-center items-center cursor-pointer"
    >
      ?
    </div>
  );
};

function App() {
  const [gameact, updgameact] = useState(false);
  const [g, updg] = useState(Array(25).fill(null)); 
  const [score, updScore] = useState(0);
  const [timerem, updtimerem] = useState(60); 
  const [tempques, updtempques] = useState(null);
  const [userans, upduserans] = useState('');
  const [timer, updtimer] = useState(null);
  const [a,b]=useState("");
  const [statarray,updstatarray]=useState([]);
  const [sortstatarray,sortupdstatarray]=useState([]);
  const [namearray,upnamearray]=useState([]);


  useEffect(() => {
    if (gameact && timerem > 0) {
      const timer = setInterval(() => updtimerem(timerem - 1), 1000);
      return () => clearInterval(timer);
    } else if (timerem === 0) {
      updgameact(false);
      alert('Game over! Final Score: ' + score + 'Refresh page to see position in leaderboard');
    }
  }, [gameact, timerem]);

  useEffect(() => {
  if(timerem===0){
    window.alert('Game over! Final Score: ' + score);
    
    const fetchserver=async()=>{
      const j = { s: score }

      const response = await fetch('http://localhost:3000/store', {
          method: 'POST',
          body: JSON.stringify(j),
          headers: { 'Content-Type': 'application/json' }
      })
      const b=await response.json();
    }
      fetchserver();
  }},[timerem])



  useEffect(()=>{
    const fetchserver2=async()=>{
    const g={d:1}
      const response = await fetch('http://localhost:3000/stat', {
          method: 'POST',
          body: JSON.stringify(g),
          headers: { 'Content-Type': 'application/json' }
      })
      const c=await response.json();
      updstatarray(c.score)
     sortupdstatarray(c.score)
       upnamearray(c.name)
    
    }
    fetchserver2();
  },[])

  const handleStartGame = async() => {
    updgameact(true);
    updtimerem(60);
    updScore(0);
    updg(Array(25).fill(null));
    updtempques(null);
    upduserans('');

    const items = { username: a }

            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                body: JSON.stringify(items),
                headers: { 'Content-Type': 'application/json' }
            })


            const v=await response.json();
            
          
            
          
  };

  const handleBoxClick = (id) => {
    const randomOutcome = Math.random(); 
    if (randomOutcome < 0.4) {
      updg((prevg) => {
        const newg = [...prevg];
        newg[id] = 'X';
        return newg;
      });
      updScore((prevScore) => prevScore - 10);
    } else {
      const { question, answer } = generateMathQuestion();
      updtempques({ id, question, answer });
      updtimer(10);
      const countdown = setInterval(() => {
        updtimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            updScore((prevScore) => prevScore - 5); 
            updtempques(null);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const handleSubmitAnswer = () => {
    if (parseInt(userans) === tempques.answer) {
      updScore((prevScore) => prevScore + 20);
    } else {
      updScore((prevScore) => prevScore - 5);
    }
    updtempques(null);
    upduserans('');
  };

  
console.log(statarray)
console.log(sortstatarray.sort())
console.log(namearray)



  return (
    <div className='w-[100vw] bg-gray-900 overflow-x-hidden flex flex-col ml-0 pl-0 '>
      <h1 id='heading' className="text-4xl shadow-inner text-white w-[30vw] text-center fixed top-[5vh] left-[35vw] ">Break The Block: Math Challenge</h1>

{!gameact &&(<>
<div className=' w-[100vw] h-[80vh] fixed top-[14vh] flex flex-row gap-[10vw] items-center'>

<div className="flex flex-col p-8 ml-[2vw] shadow-2xl">
  <span className=' text-black w-[25vw] border-2 shadow-sm shadow-blue-100 text-2xl border-gray-200 py-3 text-center font-bold rounded-xl bg-white'>LeaderBoard</span>
        {sortstatarray.reverse().map(i => (
          <div key={i.id} className="flex items-center shadow-md shadow-blue-200 w-[25vw] border-2 rounded-lg p-3 font-semibold justify-between py-2 border-b border-gray-200">
            <span className="text-2xl mr-2 text-white">{namearray[statarray.indexOf(i)]}</span>
            {/* <span className="flex-1 text-left text-white">{i}</span> */}
            <span className="font-bold text-white">{i}</span>
          </div>
        ))}
      </div>

<div className=' flex flex-col items-center'>
              
<div class="relative rounded-full overflow-hidden bg-white shadow-xl w-72">
  <input
     onChange={(e)=>{b(e.target.value)}} value={a}
    class="input bg-transparent outline-none border-red-200 border-2 pl-6 pr-10 py-5 w-full font-sans text-lg font-semibold"
    placeholder="Write username"
    name="text"
    type="text"
  />
  <div class="absolute right-2 top-[0.4em]">
  
  </div>
</div>

       
   
<button className=' bg-white w-32 h-16 font-semibold text-3xl mt-5 p-4 border-red-300 border-2 shadow-sm shadow-blue-100'
onClick={handleStartGame}>
   
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    width="36px"
    height="36px"
  >
    <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
    <path
      fill="#e53935"
      d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"
    ></path>
    <path
      fill="#b71c1c"
      d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"
    ></path>
    <path
      fill="#212121"
      d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"
    ></path>
    <path
      fill="#01579b"
      d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"
    ></path>
    <path
      fill="#212121"
      d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"
    ></path>
    <path
      fill="#81d4fa"
      d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"
    ></path>
    <path
      fill="#212121"
      d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"
    ></path>
    <path
      fill="#e1f5fe"
      d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"
    ></path>
  </svg>
  <span class="now">now!</span>
  <span class="play">Start</span>
</button>

</div>


<div className='text-black shadow-md shadow-blue-100 m-5 w-[40vw]  h-auto border-2  border-black rounded-xl p-7 justify-evenly bg-white '>
<span className=' font-bold'>Instructions for ShatterQuest: Math Challenge</span><br/><br/>
Start the Game: Click "Start Game" to begin. You have 60 seconds to play!
<br/>
<span className=' font-bold'>Gameplay:</span>
<br/>
Click on boxes in the 5x5 g.<br/>
40% Chance: Get a cross (X) and lose 10 points.<br/>
60% Chance: Answer a math question!<br/>
<span className=' font-bold'>Math Questions:</span><br/>

You have 10 seconds to answer.<br/>
Type your answer and click "Submit Answer".<br/>
Correct answers earn you 20 points; no answer deducts 5 points.<br/>
End of Game: The game ends after 1 minute. Your final score will be displayed.<br/>


</div>



 

</div>






</>)}

  

      {gameact && (
        <>
         
             
             <div className="flex items-center justify-center  ">
      <div className="grid grid-cols-5 gap-3 p-4 bg-white shadow-lg rounded-lg">
        {g.map((cell, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer ${
              cell === null ? "bg-blue-100" : "bg-blue-300"
            }`}
            onClick={() => handleBoxClick(index)}
          >
            <span className="text-xl font-semibold">{cell}</span> {/* Center the text */}
          </div>
        ))}
      </div>
    </div>
 

          <div className='flex flex-col gap-2 absolute top-48 right-20'>
          <div className="mt-4 text-2xl bg-white p-4 text-black font-bold rounded-xl text-center">Score: {score}</div>
          <div className="text-white text-3xl font-semibold ">Time Left: {timerem} seconds</div>
          </div>

          {tempques && (
            <div className="mt-6 flex flex-col gap-1  bg-blue-900 p-3 rounded-xl text-white w-[25vw] m-14 absolute top-[30vh]">
              <div className="text-md bg-white  text-black p-4 font-semibold  rounded-lg ">
                Solve: {tempques.question} (Time left: {timer} seconds)
              </div>
              <input
                type="number"
                value={userans}
                placeholder='    write your answer here '
                onChange={(e) => upduserans(e.target.value)}
                className=" text-black rounded p-3"
              />
              <button
                onClick={handleSubmitAnswer}
                className=" bg-green-500 p-3 font-semibold hover:bg-green-700 text-white  rounded"
              >
                Submit Answer
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
