import { MdOutlineSportsBasketball } from "react-icons/md";
import { FaLightbulb, FaFilm , FaMusic, FaMapMarkerAlt} from "react-icons/fa";
import { GiDragonBalls, GiConsoleController, GiThorHammer } from "react-icons/gi";
import { PiScrollBold } from "react-icons/pi";
import { FaShieldDog } from "react-icons/fa6";
import { TbBubbleFilled } from "react-icons/tb";
import { MdOutlineComputer } from "react-icons/md";
export type QuestionType = {
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    all_answers: Array<string>;
    is_Answred: boolean;
    type: string;
}

export type QuestionFetchType = {
    results: Array<QuestionType>;
}

export function shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
    }


//this file shoulda been named types and utils but whatever lmao
export type DifficultyType =  'easy' | 'medium' | 'hard';
export const DIFFICULITES : DifficultyType[] = ['easy', 'medium', 'hard'];

export type CategoryType = {
    id: string;
    name: string;
    icon: any;
};

export const CATEGORIES :CategoryType[] = [
    // 9 General Knowledge, 11 Film,  31 Anime and Manga, 12 Music ,21 Sports, 23 History, 22 Geography, 15 Video Games, 29 Comics,
    {
        id: '9',
        name: 'General Knowledge',
        icon: <FaLightbulb />
    },
    {
        id: '11',
        name: 'Film',
        icon: <FaFilm />
    },
    {
        id: '31',
        name: 'Anime',
        icon: <GiDragonBalls />
    },
    {
        id: '15',
        name: 'Video Games',
        icon: <GiConsoleController />
    },

    {
        id: '29',
        name: 'Comics',
        icon: <TbBubbleFilled />
    },

    {
        id: '12',
        name: 'Music',
        icon: <FaMusic />
    },
    {
        id: '21',
        name: 'Sports',
        icon: <MdOutlineSportsBasketball />
    },

    {
        id: '23',
        name: 'History',
        icon: <PiScrollBold />
    },
    {
        id: '22',
        name: 'Geography',
        icon: <FaMapMarkerAlt />
    },
    {
        id: '20',
        name: 'Mythology',
        icon: <GiThorHammer />
    },

    {
        id: '27',
        name: 'Animals',
        icon: <FaShieldDog />
    },

    {
        id: '18',
        name: 'Computers',
        icon: <MdOutlineComputer />
    }
];

export function useSanitizeText(text: string) {
    return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&Eacute;/g, "É")
    .replace(/&Poacute;/g, "Ó")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&ntilde;/g, "ñ")  
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    
    .replace(/&uuml;/g, "ü")
    .replace(/&Agrave;/g, "À")
    .replace(/&Egrave;/g, "È")
    .replace(/&Igrave;/g, "Ì")
    .replace(/&Ograve;/g, "Ò")
    .replace(/&Ugrave;/g, "Ù")
    .replace(/&Atilde;/g, "Ã")
    .replace(/&Etilde;/g, "Ẽ")
    .replace(/&Itilde;/g, "Ĩ")
    .replace(/&Otilde;/g, "Õ")
    .replace(/&Utilde;/g, "Ũ")
    .replace(/&acirc;/g, "â")
    .replace(/&ecirc;/g, "ê")
    .replace(/&icirc;/g, "î")
    .replace(/&ocirc;/g, "ô")
    .replace(/&ucirc;/g, "û")
    .replace(/&iacute;/g, "í")
    .replace(/&iaccute;/g, "í")
    .replace(/&aaccute;/g, "á")
    .replace(/&ldquo;/g, "“")
    .replace(/&hellip;/g, "...")
    .replace(/&rdquo;/g, "”");
}