Få en Express JS applikasjon med en React frontend til å kjøre på Heroku.

Ta utgangspunkt i Quiz koden fra de siste øvingene. Oppgaven er å lage en ExpressJS server som kan gi brukeren spørsmål og mulighet til å svare på dem med en enkel React frontend.

Bruk questions.js   Last ned questions.js fra tidligere øvinger og lag API et Express app under /server for GET /question/random, POST /question/<id>/answer og GET /score.

Forsøk å deploye Express-appen til Heroku. Du trenger at `npm run build` kjører `cd server && npm ci` og at `npm start` starter server.js.

Lag en React applikasjon under client. Bruk react, react-dom og react-router-dom.

Legg til en public folder og en middleware for å server index.html når brukerens side ikke finnes i Express.

Gjør de nødvendig justeringene for at appen skal kjøre på Heroku: `npm build` må kjøre `npm install --include=dev` og `parcel`.

Dersom du kommer såpass langt kan du forsøke å implementere funksjonalitet i React appen som gjenspeiler API-et.

Løsningsforslag: https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/05