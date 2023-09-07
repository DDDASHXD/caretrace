# caretrace
Dette er den grundlæggende login / registreringsfunktion for caretrace.
Dette inkluderer:
* Login
* Registrering
* E-mail bekræftelse (ved brug af emailjs)
* Nulstilling af adgangskode

Dette projekt er langt fra sikkert, men er mere end nok til en proof of concept.

## Sådan starter du projektet
Dette er en kort vejledning i, hvordan du får projektet op at køre.
Start med at installere node.js her: [https://nodejs.org/dist/v20.6.0/node-v20.6.0-x64.msi](https://nodejs.org/dist/v20.6.0/node-v20.6.0-x64.msi)
Download derefter git her: [https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe)

Når du har gjort dette, skal du åbne enten Terminal, CMD eller PowerShell på din computer og køre trinene nedenfor.

## 1
Download/klon repositoriet
```sh
git clone https://github.com/DDDASHXD/caretrace.git
```

## 2
Initialiser API'et og Frontend
```sh
cd ./caretrace/api
npm i
cd ../frontend
npm i
```

## 3
Når du har downloadet og initialiseret de to projekter, åbn et andet terminalvindue og kør begge projekter.

*Terminal 1*
```sh
# Start API'et
cd sti_til_projekt/api
npm run dev
```

*Terminal 2*
```sh
# Start frontend
cd sti_til_projekt/frontend
npm start
```

Det var det! Projektet skulle nu køre, og du skulle være i stand til at registrere en konto og derefter logge ind.

## Disclaimer
Vær opmærksom på, hvor mange konti du opretter, da e-mail-tjenesten kun har et begrænset antal e-mails, der kan sendes, før de kræver betaling.
