import { useEffect } from "react";
import { useQuizContext } from "../services/QuizContext";
import { useNavigate } from "react-router";
import { useSanitizeText } from "../services/types";

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
    useEffect(() => {
        if(curNum >= 9){
            setFinished(true);
        }else{
            setFinished(false);
        }
    })
    return (
    <div className='w-[70vw] h-[60vh] bg-zinc-50 rounded-3xl p-12 grid place-items-center'>
        <h1 className="text-white text-[38px] text-center bg-green-500 rounded-3xl shadow-sm p-4">Correct Answer!</h1>
        <p className="">
            Correct Answer: {useSanitizeText(selectedAnswer)}
        </p>
        {
            curNum >= 9
            ? <button onClick={finishedHandler} className={` w-56 h-24 bg-green-500 text-white rounded-2xl`}>
            SEE OVERVIEW
            </button>
            :
            <button onClick={clickHandler} className={` w-56 h-24 bg-green-500 text-white rounded-2xl`}>
            NEXT QUESTION
            </button>

        }

    </div>
    )
}

export default Correct
