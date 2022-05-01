import { useEffect, useState } from "react";

{
  /* Custom hook som tar inn den api'en som har blitt fetchet via fetchJSON (http.jsx) */
}
export function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(reload, []);

  async function reload() {
    setLoading(true);

    try {
      setData(await loadingFn());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  console.log(error);
  return { loading, error, data, reload };
}
