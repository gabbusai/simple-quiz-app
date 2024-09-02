import { useEffect, useState } from 'react'
import { QuestionType, shuffleArray, useSanitizeText } from '../services/types'
import { useQuizContext } from '../services/QuizContext';
import Correct from './Correct';
import Incorrect from './Incorrect';
import { motion } from 'framer-motion';



interface QuestionComponentProps {
    currentQuestion: QuestionType;
    curNum: number;
    updateCurNum: (newNum: number) => void;
  }
function QuestionComponent({currentQuestion, updateCurNum, curNum}: QuestionComponentProps) {

    const {increasePoints, decreasePoints} = useQuizContext();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean>();
    currentQuestion.all_answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    

    useEffect(() => {
        currentQuestion.all_answers = shuffleArray(currentQuestion.all_answers)
    })
    
    const handleAnswerSelection = (answer: string) => {
        setIsAnswered(true);
        if (answer === currentQuestion.correct_answer) {
        increasePoints(200);
        setIsCorrect(true);
        } else {
        decreasePoints();
        setIsCorrect(false);
        //setSelectedAnswer('');
        }
    }
    return (
    <>
        <div className="w-[70vw] h-[60vh] m-auto overflow-hidden relative ">
        {
            isAnswered ? 
            <div className="w-[70vw] h-[60vh] grid place-items-center m-auto shadow-2xl relative">
            {isCorrect !== undefined && (
            isCorrect ? <Correct curNum={curNum} updateCurNum={updateCurNum} selectedAnswer={selectedAnswer} /> : 
            <Incorrect curNum={curNum} updateCurNum={updateCurNum} 
            correctAnswer={currentQuestion.correct_answer} selectedAnswer={selectedAnswer} />)} 
            </div>

            :

            <div className='bg-slate-50 m-auto rounded-3xl p-5 relative h-[60vh]'>
            <h2 className="text-center text-[34px] font-pixelFont font-semibold">{useSanitizeText(currentQuestion?.question)}</h2>
            <div className="grid grid-cols-2 place-items-center py-12 px-5 gap-x-4 gap-y-3 h-[40vh]">
                {
                    currentQuestion.all_answers.map((answer) => (
                        <motion.div key={answer} className={`h-32 w-[100%] py-2 px-4 rounded-xl text-[28px]
                        font-pixelFont font-normal   border-2 border-stone-950
                        cursor-pointer grid place-items-center 
                        ${selectedAnswer === answer ? 'bg-green-500 border-none text-white shadow-md  shadow-green-500': 'text-slate-800'}`}
                        animate={{ 
                            scale: selectedAnswer === answer ? 1.03 : 1
                          }}
                        onClick={() => setSelectedAnswer(answer)}>
                            {useSanitizeText(answer)}
                        </motion.div>
                    ))
                }
            </div>
            <div className="grid place-items-center w-full">
                <motion.button className="relative bg-green-300 h-16 w-[300px] shadow-sm  shadow-black rounded-xl text-white text-[26px]
                font-pixelFont font-semibold border-green-400 border-2"
                onClick={()=> handleAnswerSelection(selectedAnswer)}
                whileHover={{ 
                    scale: 1.05,
                    textShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)',
                    borderColor: 'rgba(0, 255, 0, 0.5)'
                 }}
                >Answer
                </motion.button>
            </div>
            
            
        </div>
}
</div>
    </>

)

}

export default QuestionComponent
