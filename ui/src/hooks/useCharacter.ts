import useSWR from "swr"
import { fetcher } from "../components/api"
import { ICharacter } from "@/types"

export const useCharacter = (slug = 'briv') => {
    const { data, isLoading, error } = useSWR<ICharacter>(`/characters/${slug}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return { player: data, isLoading, error }
}