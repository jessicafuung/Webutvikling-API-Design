/* custom hook */
import { useEffect, useState } from "react";

export function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  /* denne funksjonen kunne man ha satt direkte inn i useeffect. Men grunner til å ikke gjøre det:
   * 1. sette den inn i return statement, for å kalle på den uten ifra
   * 2. på typescript kan man ikke kalle på async fra useEffect, derfor egen funksjon.
   * */
  async function load() {
    try {
      /* i ferd med å laste */
      setLoading(true);
      /* setData er resultatet av loadingFunction, venter på den */
      setData(await loadingFn());
    } catch (error) {
      /* men hvis det skjer en feil, send den inn i setError */
      setError(error);
    } finally {
      /* til slutt ikke load mer */
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
}
