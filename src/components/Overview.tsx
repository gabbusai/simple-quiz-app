import { useEffect, useState } from 'react'
import { useQuizContext } from '../services/QuizContext'
import { useNavigate } from 'react-router';
import CircularProgress from './CircularProgress';
import { BiSolidParty } from "react-icons/bi";
import { FaFaceSadCry } from "react-icons/fa6";
import { IoMdAlert } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import { GrScorecard } from "react-icons/gr";
import { motion } from 'framer-motion';
function Overview() {
  const {points, userName, difficulty, resetContext} = useQuizContext();
  const [passed, setPassed] = useState<boolean>(false);
  const [passingValue, setPassingValue] = useState(0)
  const [maxValue, setMaxValue ] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const navigate = useNavigate();
  
  let multiplier = 0;
  multiplier = difficulty === 'easy' ? 1 : 
  difficulty === 'medium' ? 2 : 
  difficulty === 'hard' ? 3 : 1;

  let colorValue = difficulty === 'easy' ? '#22c55e' : 
  difficulty === 'medium' ? '#f97316' : 
  difficulty === 'hard' ? '#ef4444' : '#22c55e';

  const calculatePassingValue = () => {



    setMaxValue(multiplier * 200 * 10 );
    setPassingValue((multiplier * 200 * 10 )/ 2);
    setPercentage((points / maxValue) * 100);
  }

  const restart = () => {
    resetContext();
    navigate('/')
  }
  useEffect(() => {
    calculatePassingValue()
    if (points >= passingValue) {
      setPassed(true);
    } else {
      setPassed(false);
    }
  })
  //data we can use userName, points, passed (from context)
  //variables we created here, maxValue, passingValue, percentage
  return (
    <div className='w-screen h-screen bg-zinc-950 grid'>

      <div className=" p-8 h-[80vh] w-[80vw] bg-zinc-50 mx-auto my-12 grid place-items-center shadow-lg rounded-2xl"
      >
      <h1 className="text-[65px] font-pixelFont font-semibold italic tracking-widest flex text-zinc-800">
      <IoMdAlert size={95} />
        {userName}, Your Quiz Results:
      </h1>

        <div className="grid grid-cols-2">
          <CircularProgress percentage={percentage} passed={passed}/>
          <div className="flex flex-col items-center gap-y-4">
                {
                  passed ? 
                    <div className="capitalize font-pixelFont text-[52px] font-semibold 
                    text-green-500 decoration-dashed underline flex align-middle">
                    <BiSolidParty size={80}/>You Passed!
                    </div>
                    :
                    <div className="capitalize font-pixelFont text-[52px] font-semibold 
                    text-red-500 decoration-dashed line-through flex align-middle">
                    <FaFaceSadCry size={80}/> You Failed!
                    </div>
                }

              <div className={`capitalize flex gap-x-2 font-pixelFont 
                ${passed ? 'text-green-500' : 'text-red-500'}
                `}>
                <GrScorecard size={48}/>
                <p className="text-[38px]">
                {points} / {maxValue} points
                </p>
              </div>

              <div className={`capitalize flex gap-x-2 font-pixelFont`}
              style={{color: colorValue}}>
                <SiLevelsdotfyi size={48}/>
                <p className="text-[38px]">
                  {difficulty} Mode
                </p>
              </div>
              
          </div>
        </div>


        <motion.button className="py-3 px-10 rounded-md text-white text-[40px]
        bg-green-500 hover:bg-green-700 font-pixelFont h-24 w-44"
          onClick={restart}
          initial={{ 
            border: '0px dashed white',
            scale: 1,
            fontWeight: 'normal'
            
           }}
          whileHover={{
            border: '4px dashed white',
            scale: [0.9, 1.04],
            fontWeight: 'semiBold',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)'
           }}
          >
              Replay
        </motion.button>
      </div>
    </div>
  )
}

export default Overview
