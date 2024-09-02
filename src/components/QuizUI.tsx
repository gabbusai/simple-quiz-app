
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaFlagCheckered, FaHashtag } from "react-icons/fa6";
import { useQuizContext } from '../services/QuizContext';
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { useEffect, useState } from 'react';


interface QuizUIProps {
    curNum: number;
}
function QuizUI({curNum}: QuizUIProps) {
const { points, userName, category, difficulty, health, profileImageUrl} = useQuizContext();
const [displayPoints, setDisplayPoints] = useState(0);
const [prevHealth, setPrevHealth] = useState(health);
const [isHit, setIsHit] = useState(false);
const [triggerAnimation, setTriggerAnimation] = useState(false);
const springCount = useSpring(0, {
    bounce: 0,
    duration: 500
});

springCount.on("change", (value) => {
    setDisplayPoints(Math.round(value));
    setTriggerAnimation(true);
})

useEffect(() => {
if(prevHealth > health){
    setIsHit(true);

}
setPrevHealth(health);
springCount.set(points);
}, [points, health])

  return (
    <div className='w-[70vw] h-[30vh] bg-white rounded-3xl shadow-xl m-auto mb-5'>
        <br />
        <div className="grid grid-cols-2">
            <div className="grid grid-cols-5 relative">
                <AnimatePresence>
                    {
                        isHit && (
                            <motion.div className="absolute h-[220px] w-[220px] p-3 ml-[20px] border-[4px] self-center
                            bg-red-600 rounded-full mix-blend-multiply z-20"
                            initial={{ 
                                opacity: 0,
                            }}
                            animate={{ 
                                opacity: isHit ? 1 : 0,
                                scale: isHit ? 1.1 :1,
                            }}
                            transition={{ 
                                duration: 0.4,
                                type: "spring"
                            }}
                            exit={{ 
                                opacity: 0,
                            }}
                            onAnimationComplete={()=> setIsHit(false)}
                            />
                        )
                    }
            </AnimatePresence>

                <motion.img src={profileImageUrl} alt={userName} height="220px" width="220px" className='bg-zinc-900 rounded-full  p-3 
                ml-[20px] border-[4px] self-center border-zinc-700 col-span-2 z-10'
                initial={{

                }}
                animate={{ 
                    rotateZ: isHit ? ['-40deg','40deg', '0deg'] : '0deg',
                    scale: isHit ? 1.1 : 1,
                    transition: { duration: 0.4 },
                    rotateY: triggerAnimation ? '180deg' : '0deg',
                    background: triggerAnimation ? 'green' : '',
                    border: triggerAnimation ? 'none' : '',
                 }}
                 transition={{ 
                    duration: 0.4
                  }}
                />

                <div className="col-span-3 w-full h-full">
                    <span className='flex gap-x-10 text-zinc-900 items-center'>
                    <FaUserCircle size={40}/>
                    <p className="text-[34px] capitalize self-center font-pixelFont">{userName}</p>
                    </span>

                    <span className='flex gap-x-10 text-red-600 my-6 items-center'>
                    <FaHeart size={40}/>
                    <div className="bg-zinc-950 rounded-3xl w-[300px]">
                    <motion.div className="rounded-3xl bg-red-600" 
                    initial={{ 
                        scale: 0.5,
                        opacity: 0,
                        width: 0,
                        height: 30
                    }}
                    animate={{ 
                        scale: 1,
                        height: 30,
                        opacity: 1,
                        width: health * 70,
                        transition: { duration: 0.5 },
                    }}
                    />
                    </div>
                    </span>


                    <span className='flex gap-x-10 text-zinc-900 text-[40px] items-center my-4'>
                    {category.icon}
                    <p className="text-[34px] capitalize font-pixelFont">{category.name}</p>
                    </span>

                    <span className='flex gap-x-10 text-zinc-900 text-[40px] items-center my-4'>
                    <FaGamepad />
                    <p className="text-[34px] capitalize font-pixelFont">{difficulty}</p>
                    </span>
                </div>
            </div>

            <div className="mx-5 flex items-center justify-center">
                <motion.span className='flex gap-x-10 text-zinc-900 text-[60px] items-center my-4 mx-5'
                initial={{ 
                    scale: 1
                 }}
                animate={{ 
                    scale: triggerAnimation ? 1.1 : 1,
                    transition: { duration: 0.5 },
                    color: triggerAnimation ? "green" : "#18181b"
                 }}
                onAnimationComplete={() => setTriggerAnimation(false)}>
                    <FaFlagCheckered />
                    <p className=" capitalize font-pixelFont"
                    >{displayPoints}</p>
                </motion.span>

                <span className='flex gap-x-10 text-zinc-900 text-[60px] items-center my-4 mx-5'>
                    <FaHashtag />
                    <p className=" capitalize font-pixelFont">{curNum}</p>
                </span>
            </div>

        </div>
    </div>
  )
}

export default QuizUI
