export async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

{
  /* Denne tar inn feks "/api/login" og fetcher url'en */
}
