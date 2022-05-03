/* Bruker denne vente funksjonen til å fetche det som er i google doc, for å unngå hardkode endpoints */
export async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }

  return await res.json();
}
