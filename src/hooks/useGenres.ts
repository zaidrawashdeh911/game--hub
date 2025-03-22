import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //to set a fetch request to the backend
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGenresResponse>("/genres", { signal: controller.signal })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    setLoading(false);
    return () => controller.abort();
  }, []); // the empty array this, is the array of dependencies, without it we can't send a request to the backend

  return { genres, error, isLoading };
};

export default useGenres;
