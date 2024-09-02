import { useNavigate } from "react-router";
import { useQuizContext } from "../services/QuizContext";
import { useEffect } from "react";
import { useSanitizeText } from "../services/types";

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
    const {health, setFinished } = useQuizContext();
    return (
        <div className='w-[70vw] h-[60vh] bg-zinc-50 rounded-3xl p-12 grid place-items-center'>
            <h1 className="text-white text-[38px] text-center bg-red-500 rounded-3xl shadow-sm p-4">
                Incorrect Answer!
                </h1>
            <p className="">
                Your Answer: {useSanitizeText(selectedAnswer)}
            </p>
            
            <p className="">
                Correct Answer: {useSanitizeText(correctAnswer)}
            </p>

            {
                health <=  0  || curNum >= 9 ? 
            <button onClick={noHealth} className={`w-56 h-24 bg-red-500 text-white rounded-2xl`}>
                SEE OVERVIEW
            </button>
                :            
            <button onClick={clickHandler} className={`w-56 h-24 bg-green-500 text-white rounded-2xl`}>
                NEXT QUESTION
            </button>
            }

        </div>
        )
}

export default Incorrect
