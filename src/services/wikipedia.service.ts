import axios from "axios";
import { ApiResponse } from "../api.interface";

class Wikipedia {
    async getAllForDate(day:number, month:number) {
        return axios
        .get<ApiResponse>(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/${month}/${day}`)
        .then(response => response.data.selected.map(item => ({
            title: item.text,
            year: item.year
        })).reverse())
    }
}

const wikipediaService = new Wikipedia();

export default wikipediaService;