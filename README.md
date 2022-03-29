# Hello and welcome to the Quiz broadcast

Flytt funksjonalitet for quiz til serveren-siden med ExpressJS. Du trenger følgende endepunkt:

* GET /quiz/random - returner et tilfeldig spørsmål uten å inkludere korrekt svar
* POST /quiz/answer - send inn svar med {id: <id>, answer: "answer_a"|"answer_b"|"answer_c"|"answer_d"|"answer_e"}. Skal returnere {result: "correct"|"incorrect"}
* GET /quiz/score - returnerer {answered: <number>, correct: <number>} (krever cookies)

Bruk koden for quiz fra øving 1-3 som utgangspunkt. questions.js  Last ned questions.js

Siden koden ikke har front-end må du teste den på andre måter enn gjennom GUI. Opprett en .http-fil i IntelliJ for testing og bruk Jest med Supertest (Lenker til en ekstern side.). Det anbefales at du skriver testene før du skiver koden. Bruk expect.objectContaining({id: expect.any(Number)}) etc for å kunne teste /quiz/random.

Det anbefales at du prøver å bruke Prettier (Lenker til en ekstern side.), Typescript og GitHub Actions i løsningen. Prøv også gjerne Husky (Lenker til en ekstern side.)

Løsningsforlag på Github: https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/commits/exercise/answer/04