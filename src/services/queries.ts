import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"
import { getTriviaQuestions } from "./api";
import { DifficultyType } from "./types";



export const useFetchQuestions = (categoryId: string, difficulty: DifficultyType) => {
    return useQuery({
    queryKey: ['questions', categoryId, difficulty],
    queryFn: () => getTriviaQuestions(categoryId, difficulty),
    staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

/*export const usePokemonDetails = (names: (string | undefined| unknown)[] | undefined ) => {
    return useQueries({
        queries: (names ?? []).map((name: any) => {
            return {
                queryKey: ['pokemon', name],
                queryFn: () => getPokemonDetails(name)
            }
        })
    })
};

*/