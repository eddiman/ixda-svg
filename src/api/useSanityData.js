import { useEffect, useState } from "react";
import sanityClient from "./sanityClient";

export const useSanityQuery = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient.fetch(query)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query]);

  return { data, loading, error };
};