import { PropsWithChildren, createContext, useContext, useState } from "react"
import { CategoryType, DifficultyType } from "./types";
import { FaLightbulb } from "react-icons/fa";

const avatarType = "notionists";
type QuizContextType = {
    userName: string;
    health: number;
    points: number;
    category: CategoryType;
    difficulty: DifficultyType;
    setUserName: (name: string) => void;
    setCategory: (category: CategoryType) => void;
    setDifficulty: (difficulty: DifficultyType) => void;
    increasePoints: (pointsValue: number) => void;
    decreasePoints: () => void;
    isFinished:boolean;
    setFinished: (current: boolean) => void;
    resetContext: () => void;
    profileImageUrl: string;
}
export const QuizContext = createContext<QuizContextType>({
    userName: "",
    health: 3,
    points: 0,
    category: {id: "", name: "", icon: null},
    difficulty: "easy",
    isFinished: false,
    setFinished: () => {},
    setUserName: () => {},
    setCategory: () => {},
    setDifficulty: () => {},
    increasePoints: () => {},
    decreasePoints: () => {},
    resetContext: () => {},
    profileImageUrl: `https://api.dicebear.com/9.x/${avatarType}/svg?seed=user`,
});

export default function QuizContextProvider({children}: PropsWithChildren) {
    const [userName, setUserNameState] = useState("User");
    const [profileImageUrl, setProfileImage] = useState("User");
    const [isFinished, setFinishedState] = useState<boolean>(false);
    const [category, setCategoryState] = useState<CategoryType>({ id: "9", name: "General Knowledge", icon: <FaLightbulb />});
    const [difficulty, setDifficultyState] = useState<DifficultyType>("easy");
    const [health, setHealth] = useState(5);
    const [points, setPoints] = useState(0);

    const resetContext = () => {
        setFinished(false);
        setUserNameState("User");
        setCategoryState({id: "9", name: "General Knowledge", icon: <FaLightbulb />});
        setDifficultyState("easy");
        setHealth(5);
        setPoints(0);
        setProfileImage(`https://api.dicebear.com/9.x/${avatarType}/svg?seed=${userName}`);
    }

    const setFinished = (current: boolean) => {
        setFinishedState(current);
    }

    const setUserName = (name: string) => {
            setUserNameState(name);
            setProfileImage(`https://api.dicebear.com/9.x/${avatarType}/svg?seed=${name}`);
            
    }
    const setCategory = (category: CategoryType) => {
            setCategoryState(category);
    }
    const setDifficulty = (difficulty: DifficultyType) => {
        setDifficultyState(difficulty);
    }
    const increasePoints = (pointsValue : number) =>{
        let multiplier = 0;
        multiplier = difficulty === 'easy' ? 1 : 
            difficulty === 'medium' ? 2 : 
            difficulty === 'hard' ? 3 : 1;
        
        setPoints(points + pointsValue * multiplier);
    }
    const decreasePoints = () => {
        setHealth(health - 1);
        //setPoints();
    };
    



    return (
        <QuizContext.Provider value={{
            userName, health, category, difficulty, points, setUserName, setCategory, setDifficulty,  
            increasePoints, decreasePoints, resetContext, setFinished, isFinished, profileImageUrl}}>
            {children}
        </QuizContext.Provider>
      )
}

export const useQuizContext = () => useContext(QuizContext);
