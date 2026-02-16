import useSWR, { mutate } from "swr"
import { fetcher } from "@config/api"
import { ICharacter } from "@/types"

export const useCharacter = (slug = 'briv') => {
    const { data, isLoading, error } = useSWR<ICharacter>(`/characters/${slug}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
    })
    return { player: data, isLoading, error }
}

export const mutatePlayer = (slug: string, character?: ICharacter) => {
    mutate(`/characters/${slug}`, character, {
        revalidate: !character
    })
}