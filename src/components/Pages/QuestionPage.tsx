import { useState, useEffect } from 'react'
import { useFetchQuestions } from '../../services/queries'
import { useQuizContext } from '../../services/QuizContext'
import QuestionComponent from '../QuestionComponent';
import LoadingPage from '../LoadingPage';
import QuizUI from '../QuizUI';
import { AnimatePresence, motion } from 'framer-motion';
import { QuestionType } from '../../services/types';

function QuestionPage() {
  const { category, difficulty } = useQuizContext();
  const { data: questions, isLoading, error } = useFetchQuestions(category.id, difficulty);
  const [curNum, setCurNum] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[curNum]);
    }
  }, [curNum, questions]);

  if (isLoading) {
    return <LoadingPage />
  }
  if (error) {
    return <p>Error fetching questions: {error?.message}</p>
  }

  const handleNextQuestion = () => {
    setCurNum((prevNum) => prevNum + 1);
  };

  return (
    <div className='relative h-screen w-screen bg-zinc-900 overflow-hidden'>
      <div className="relative my-10 overflow-hidden ">
        <AnimatePresence mode="popLayout">
          {currentQuestion && (
            <motion.div className=""
              key={curNum}
              initial={{ 
                translateX: -2000,
                rotateZ: '180deg',
                scale: .6
              }}
              animate={{ 
                translateX: 0,
                rotateZ: '0deg',
                scale: 1,
              }}
              exit={{
                translateX: 2000,
                rotateZ: '-180deg',
                scale: .2,
              }}
              transition={{ duration: .7, type:"spring"}}
            >
              <QuestionComponent
                currentQuestion={currentQuestion}
                curNum={curNum}
                updateCurNum={handleNextQuestion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[100%] overflow-hidden">
        <QuizUI curNum={curNum + 1} />
      </div>
    </div>
  );
}

export default QuestionPage;