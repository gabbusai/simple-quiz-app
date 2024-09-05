
import { useNavigate } from 'react-router';
import { useQuizContext } from '../../services/QuizContext'
import { CATEGORIES, CategoryType, DIFFICULITES, DifficultyType } from '../../services/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useEffect, useState } from 'react';
function MainMenu() {
const { setUserName, setCategory, setDifficulty, userName, category, difficulty, setFinished, isFinished } = useQuizContext();
const [isCategoryActive, setCategoryActive] = useState<boolean>(false);
const [isDifficultyActive, setDifficultyActive] = useState<boolean>(false);
const [colorTheme, setColorTheme] = useState('');
useEffect(() => {
    setFinished(false)
    setUserName('User');
    if(difficulty === 'easy'){
        setColorTheme('green');
    }else if(difficulty === 'medium'){
        setColorTheme('orange');
    }else{
        setColorTheme('red');
    }
})
const navigate = useNavigate();
const handleContextDetails = () => {
    navigate('/quiz');
    };

const handleCategorySelection = (categoryId: string) => {
    const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
    setCategory(selectedCategory as CategoryType);
}

const handleDifficultySelection = (diff:DifficultyType) => {
    setDifficulty(diff);
}
const openCategory = () => {
    setCategoryActive(!isCategoryActive);
}
const openDifficulty = () => {
    setDifficultyActive(!isDifficultyActive);
}

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleContextDetails();
    }
}



    return (
    <div className='relative w-screen h-screen bg-stone-950'>
        <h1 className="relative text-[92px] text-center text-white pt-5 py-20 font-pixelFont font-bold"
        >Simple Quiz Game!</h1>

        <div className="flex">

        <motion.div className={`overflow-y-hidden rounded-xl w-[40rem] bg-slate-50 mt-5 p-5 mx-auto`}
        initial={{ 
            height: 128,
         }}
        animate={{ 
                    height: isCategoryActive? 'auto' : 128,
        }}
        >
            <div className="grid grid-cols-5 place-items-center">
                <p className="text-center py-2 text-[58px] ustify-self-start w-full
                col-span-4 font-pixelFont font-bold tracking-widest"
                style={{ 
                    color: colorTheme
                 }}
                >CATEGORIES
                </p>
                <div className="justify-self-end" onClick={openCategory}>
                {
                    isCategoryActive ? <FaSortUp size={100} color={colorTheme}/> : <FaSortDown size={100} color={colorTheme}/>
                }
                </div>
            </div >
            <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3 overflow-hidden">
            <AnimatePresence>
            {
                isCategoryActive &&
                
                (
                CATEGORIES.map((cat, index)=> {
                        return (
                        <motion.div key={index} onClick={() => handleCategorySelection(cat.id)}
                        whileTap={{ scale: [0.9, 1.1] }}
                        whileHover={{ 
                            scale: 1.01,
                        }}
                        initial={{ 
                            scale: 1.00,
                            translateY: -200 * index,
                        }}
                        animate= {{ 
                            translateY: 0,
                            translateX: 0,
                            color: cat.id === category.id ? 'white' : 'white',
                            backgroundColor: cat.id === category.id ? colorTheme : '#2c2c2c',
                        }}

                        transition={{ 
                            duration: 1,
                            ease: 'easeInOut',
                            translateY: {
                                delay: 0.1 * index
                            },
                            scale: {duration: .2},
                        }}
                        className="bg-stone-200 rounded-2xl shadow-md text-center py-4 text-[24px] grid grid-cols-4">
                            <p className="col-span-3 font-pixelFont tracking-widest">{cat.name}</p>
                            <span className='text-[32px]'>{cat.icon}</span>
                        </motion.div>
                    )
                })
                )
                
            }
            </AnimatePresence>
        </div>
        </motion.div>

        <div className="relative m-4 bg-zinc-50 h-[420px] w-[380px] grid place-items-center rounded-xl py-5 px-5">
        <input
        maxLength={16}
        style={{ 
            color: colorTheme
         }}
        className={`text-[30px] text-center rounded-lg shadow-md h-14 my-2 bg-slate-50  
        font-semibold font-pixelFont outline-dashed tracking-widest`}
        type="text" value={userName}
        autoFocus
        onKeyDown={handleKeyPress}
        onChange={(e) => setUserName(e.target.value)}/>
        <p className="text-[60px] text-zinc-50 rounded-full p-5 mt-5"
        style={{ 
            backgroundColor: colorTheme
         }}
        >{category.icon}</p>
            <motion.p className="capitalize mt-2 font-pixelFont text-[32px] font-light"
            animate={{ 
                color: {
                    easy: 'green',
                    medium: 'orange',
                    hard: 'red',
                }[difficulty]
             }}
            >{difficulty}</motion.p>
            <div className="relative h-6 w-64 rounded-xl bg-zinc-950 grid place-items-center">
                <motion.div className={`h-6  rounded-xl bg-green-500`}
                    initial={{ 

                    }}
                    animate={{
                    backgroundColor: {
                            easy: 'green',
                            medium: 'orange',
                            hard: 'red',
                    }[difficulty],
                        width: {
                            easy: 100,
                            medium: 150,
                            hard: 256,
                    }[difficulty],
                    }}
                />
            </div>
            <motion.button onClick={handleContextDetails} className='text-white text-[31px] bg-green-600 p-3 rounded-xl mt-5
                font-pixelFont w-64 h-24 tracking-widest'
            whileHover={{ 
                scale: 1.04,
            }}
            initial={{ scale: 0.8 }}
            >
            START QUIZ
        </motion.button>
        </div>

        <motion.div className={`h-64 overflow-y-hidden rounded-xl w-[40rem] bg-slate-50 mt-5 p-5 mx-auto`}
        initial={{ 
            height: 128,
        }}
        animate={{ 
                    height: isDifficultyActive? 300 : 128,
        }}
        >
            <div className="grid grid-cols-5 place-items-center">
                <p className="text-center py-2 text-[52px] w-full font-bold
                col-span-4 font-pixelFont text-zinc-800 tracking-widest"
                style={{ 
                    color: colorTheme
                 }}
                >DIFFICULTIES
                </p>
                <div className="justify-self-end" onClick={openDifficulty}>
                {
                    isDifficultyActive ? <FaSortUp size={100} color={colorTheme}/> : <FaSortDown size={100} color={colorTheme}/>
                }
                </div>
            </div >
            <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3 overflow-hidden">
            <AnimatePresence>
            {
                isDifficultyActive &&
                
                (
                DIFFICULITES.map((diff, index)=> {
                        return (
                        <motion.p key={index} onClick={() => handleDifficultySelection(diff)}
                        whileTap={{ scale: [0.9, 1.1] }}
                        whileHover={{ 
                            scale: 1.01,
                        }}
                        initial={{ 
                            scale: 1.00,
                            translateY: -200 * index,
                        }}
                        animate= {{ 
                            translateY: 0,
                            translateX: 0,
                            color: diff === difficulty ? 'white' : 'white',
                            backgroundColor: diff === difficulty ? colorTheme : '#2c2c2c',
                        }}

                        transition={{ 
                            duration: 1,
                            ease: 'easeInOut',
                            translateY: {
                                delay: 0.1 * index
                            },
                            scale: {duration: .2},
                        }}
                        className="bg-stone-200 rounded-2xl shadow-md text-center py-4 text-[28px] capitalize font-pixelFont">
                            {diff}
                        </motion.p>
                    )
                })
                )
                
            }
            </AnimatePresence>
        </div>
        </motion.div>


        </div>
    </div>
    )
}

export default MainMenu
