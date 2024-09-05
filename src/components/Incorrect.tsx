import { useNavigate } from "react-router";
import { useQuizContext } from "../services/QuizContext";
import { useEffect } from "react";
import { useSanitizeText } from "../services/types";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";


interface QuestionComponentProps {
    selectedAnswer: string;
    curNum: number;
    correctAnswer: string;
    updateCurNum: (newNum: number) => void;
    }
function Incorrect({
    curNum,
    updateCurNum,
    selectedAnswer,
    correctAnswer,
}: QuestionComponentProps)
{
    const navigate = useNavigate();

    const clickHandler = () => {
        updateCurNum(curNum + 1);
    }

    const noHealth = () => {
        setFinished(true);
        navigate('/overview');
    }
    useEffect(() => {
        if(health <= 0){
            setFinished(true);
        }
    })

    const btnVariants = {
        hover:{
            scale: 1.1,
            inset: 10,
            cursor: 'pointer',
            border: '3px dashed white'
        },
        start: {
            scale: 0.8,
            opacity: 0,
            y: 500,
            border: 'none'
            },
        animate: { 
            scale: 1,
            opacity: 1,
            y: 0,
            border: 'none',
            transition:{
            duration: .3,
            type: "spring"
            }
        },
      }

    const {health, setFinished } = useQuizContext();
    return (
        <div className='w-[70vw] h-[60vh] bg-zinc-50 rounded-3xl p-12 grid place-items-center'>

<motion.div className="rounded-full bg-red-500 p-10 shadow-lg"
        initial={{ 
            opacity: 0,
            scale: 0.5,
            y: -500,
        }}
        animate={{
            scale: [1.2 ,1],
            opacity: 1,
            y: 0,
        }}
        transition={{
            duration: .3,
            type: "spring"
        }}
        >
            <ImCross size={75} color="#f2f2f2"/>
        </motion.div>
            
            <motion.div className="text-center"
            initial={{
                opacity: 0,
                scale: 0
            }}
            animate={{ 
                opacity: 1,
                scale: 1.1,
            }}
             transition={{ 
                duration: 1,
                type: "spring"
            }}
            >
                <p className="font-pixelFont text-[52px] text-red-500 decoration-dashed line-through">
                    Your Answer: {useSanitizeText(selectedAnswer)}
                </p>
                <p className="font-pixelFont text-[32px] text-green-500 ">
                    Correct Answer: {useSanitizeText(correctAnswer)}
                </p>
            </motion.div>


            {
                health <=  0  || curNum >= 9 ? 
            <motion.button onClick={noHealth}
            className={` relative font-pixelFont text-[24px] w-56 h-20 bg-green-500 text-white rounded-2xl shadow-sm shadow-zinc-900`}
            variants={btnVariants}
            whileHover="hover"
            initial="start"
            animate="animate"
            exit="start"
            >
                SEE OVERVIEW
            </motion.button>
                :            
            <motion.button onClick={clickHandler}
            className={` relative font-pixelFont text-[24px] w-56 h-20 bg-green-500 text-white rounded-2xl shadow-sm shadow-zinc-900`}
            variants={btnVariants}
            whileHover="hover"
            initial="start"
            animate="animate"
            exit="start"
            >
                NEXT QUESTION
            </motion.button>
            }

        </div>
        )
}

export default Incorrect
