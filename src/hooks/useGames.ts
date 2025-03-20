import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform{
    id: number;
    name: string;
    slug: string;
}
export interface Game{
    id:number;
    name:string;
    background_image: string;
    parent_platforms: {platform: Platform} [];
    metacritic: number;
}

interface FetchGamesResponse{
    count: number;
    results: Game[]
}

const useGames = ()=>{
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');

    //to set a fetch request to the backend
    useEffect(()=>{
        const controller = new AbortController();

        apiClient.get<FetchGamesResponse>('/games', {signal: controller.signal})
        .then(res=> setGames(res.data.results))
        .catch(err=>{
            if(err instanceof CanceledError) return;
            setError(err.message)});

        return ()=> controller.abort();
    }, []);// the empty array this, is the array of dependencies, without it we can't send a request to the backend

    return {games, error};
}

export default useGames;