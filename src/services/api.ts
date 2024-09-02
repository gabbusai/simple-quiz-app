import axios from "axios";
import { QuestionType, QuestionFetchType, DifficultyType } from './types'
//base url
// example url opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
const BASE_URL = 'https://opentdb.com/api.php';
const axiosInstance = axios.create({baseURL : BASE_URL});
const count = 10;
//category difficulty
export const getTriviaQuestions = async(categoryId : string, difficulty: DifficultyType) => {
    const response = await axiosInstance.get<QuestionFetchType>(`?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
    return response.data.results;
}