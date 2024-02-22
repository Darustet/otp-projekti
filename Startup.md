# Startup
Seuraavista shell-komentojen käytöstä huomio. Jos terminaalia ei ole vielä avattu, niin painamalla play-nappula avaa uuden terminaalin automaattisesti.
Jos terminaali on auki, varmista että sijainti on oikein (projektin root kansio), muuten tapahtuu virhe.

Molemmat komennot ohjaavat itsestään cd-komennolla oikeaan kansioon ja käynnistävät ohjelman sieltä. Jos komennon ajon aikana tapahtuu virhe, terminaalin sijainti jää viimeiseen cd-komennon osoittamaan kansioon. Jos haluat uudelleen käynnistää samaa komentoa, aja ylin rivin komento 'npm start' tai 'node server.js', riippuen kyseisestä sijainnista.

### Start the frontend
```shell
npm start
cd frontend
cd fitness-app
```

### Start the server
```shell
node server.js
cd backend
cd fitness-app
```
