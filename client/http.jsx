export class HttpError extends Error {
  constructor(status, statusText) {
    super("My custom exception: " + statusText);
    this.status = status;
  }
}

export async function fetchJSON(url) {
  const res = await fetch(url);

  if (res.status === 204) {
    return null;
  } else if (res.ok) {
    return await res.json();
  } else {
    throw new HttpError(res.status, res.statusText);
  }
}

{
  /*
   *    Denne tar inn feks "/api/login" og fetcher url'en
   *    if responsen er OK, bruk json
   *    else kast en exception
   *
   *
   *  */
}
