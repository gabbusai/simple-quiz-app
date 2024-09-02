import { useEffect, useState } from 'react'
import { useQuizContext } from '../services/QuizContext'
import { useNavigate } from 'react-router';


function Overview() {
  const {points, userName, resetContext} = useQuizContext();
  const [passed, setPassed] = useState<boolean>();
  const navigate = useNavigate();
  useEffect(() => {
    if (points >= 1000) {
      setPassed(true);
    } else {
      setPassed(false);
    }
  })
  return (
    <div className='w-screen h-screen bg-zinc-950 grid m-auto '>
      <div className=" p-8 h-[40vh] w-[600px] bg-slate-500 mx-auto my-12 grid place-items-center shadow-lg rounded-lg">
      <h1 className='text-white text-[32px]'>Hello, {userName},</h1>
      <h2 className='text-white text-[24px]'>Your score is: {points}</h2>
      {
        passed ? 
        <h1 className='text-black bg-green-300 p-5 text-center w-[150px] m-auto rounded-2xl text-[32px]'>You passed</h1> : 
        <h1 className='text-white bg-red-500 p-5 w-[100%] m-auto rounded-2xl text-center text-[32px]'>You failed</h1>
      }

      <button onClick={() => {
        resetContext();
        navigate('/')
      }}
      className={`w-32 h-12 bg-green-500 text-white rounded-2xl my-4 mx-auto`}>
        Restart
      </button>
      </div>



    </div>
  )
}

export default Overview
