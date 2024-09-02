import { useFetchQuestions } from "./services/queries"
import { shuffleArray } from "./services/types";

function App() {
  const { data , isLoading, error } = useFetchQuestions('9', 'easy');

  if (isLoading) {
    console.log('Loading...');
  } else if (error) {
    console.log('Error:', error);
  } else {
    console.log(data);
  }

  return (
    <>
    {
      data?.map((item, index) => {
        item.all_answers = [...item.incorrect_answers, item.correct_answer]
        item.all_answers = shuffleArray(item.all_answers)
        return (
          <div key={item.question}>
            <h2>{index + 1}.  {item.question}</h2>
            <ul className="grid grid-cols-2">
              {item.all_answers.map((answer) => (
                <li key={answer}>{answer}</li>
              ))}
            </ul>
          </div>
        )
      })
    }

    </>
  )
}

export default App
