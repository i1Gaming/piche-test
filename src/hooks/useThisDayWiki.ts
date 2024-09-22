import { useQuery } from "@tanstack/react-query";
import { ListItem } from "../api.interface";
import wikipediaService from "../services/wikipedia.service";


export const useThisDayWiki = (enabled:boolean) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    return useQuery<ListItem[]>({
        queryKey: ['wikipedia'],
        queryFn: () => wikipediaService.getAllForDate(day, month),
        enabled,
    });
}