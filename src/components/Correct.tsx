import { useEffect } from "react";
import { useQuizContext } from "../services/QuizContext";
import { useNavigate } from "react-router";
import { useSanitizeText } from "../services/types";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

interface QuestionComponentProps {
    //currentQuestion: QuestionType;
    curNum: number;
    updateCurNum: (newNum: number) => void;
    selectedAnswer: string;
  }
function Correct({curNum, updateCurNum, selectedAnswer}: QuestionComponentProps) {
    const {setFinished} = useQuizContext()
    const navigate = useNavigate();
    const clickHandler = () => {
        updateCurNum(curNum + 1);
    }
    const finishedHandler = () => {
        setFinished(true);
        navigate('/overview');
    }

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
    useEffect(() => {
        if(curNum >= 9){
            setFinished(true);
        }else{
            setFinished(false);
        }
    })
    return (
    <div className='w-[70vw] h-[60vh] bg-zinc-50 rounded-3xl p-12 grid place-items-center'>
        <motion.div className="rounded-full bg-green-500 p-10 shadow-lg"
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
            <FaCheck size={75} color="#f2f2f2"/>
        </motion.div>
        <p className="font-pixelFont text-[42px] text-green-500">
            Correct Answer: {useSanitizeText(selectedAnswer)}
        </p>
        {
            curNum >= 9
            ? <motion.button onClick={finishedHandler} 
                className={` relative font-pixelFont text-[24px] w-56 h-20 bg-green-500 text-white rounded-2xl`}
                variants={btnVariants}
                whileHover="hover"
                initial="start"
                animate="animate"
                exit="start"
            >
            SEE RESULTS
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

export default Correct
