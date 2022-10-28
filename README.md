## Deployment
* To run the app clone the repo and run the followig in the terminal: 
  ```
  npm install -g json-server
  ```
  ```
  json-server --watch db.json
  ```
  ```
  npm run dev
  ```

## Skills used for this project
* React
* React Context 
* React Router-dom
* React Reducer 
* Chakra-ui
* dayjs
* timer-node 
* .env
* JavaScript
* JSON 
* CSS
* HTML 
* Vite

## Requirements

# Kunskapskontroll 1: Time-tracking-app

## Choice of styling
- Chakra-ui:\
 I've chosen chakra-ui as my styling choice for this assignment. I'm used to working with Boostrap and decided I wanted to try something new. At first, I was looking at render components but that would be too much code for my files. Chakra has the benefit of doing the styling "for" me, and I like that I dont have to think how big a button should be or build a navbar from scratch. 

## Choice of packages
- vite:\
  I use Vite for creating my dev environment because I find it easy and lightweight to use versus npx-create-react-app. It has fewer "junk" files and comes with its own challenges. 
- axios:\
  Axios helps me to API calls with fewer lines of code. I don't need to declare JSON strings back and forth with my calls. 
- uuid:\
  Uuid generates IDs with a long unique string every time it's called on, and that helps me not to worry about having a dubbel of an ID in my code. 
- react-input-color:\
  React-input-color is a component that renders out a color box where the user can pick a color in different ways. It's used to set a color for a project so it's easier to tell them apart. 
- husky / prettier / pretty-quick:\
  Together with Prettier and Husky setup, I don't have to worry about formatting my code every time. Since I like to work with autosave I don't want formatting on save when I write code. But this makes it so that I have to format manually every time. These scripts do it form whenever code is committed. 
- @chakra-ui/react / @emotion/react / @emotion/styled / frammer-motion @chakra-ui/icons / react-icons:\
  All above are used for my styling which has been motivated above. 
- dayjs:\
  Dayjs is used to generate and transform date and time. It was very handy to have when I worked with the calendar and timer components. 
- timmer-node:\
  Timmer-node is used for starting and stopping timers. It helps create functions like start() and stop() so that I don't have to do it manually. 

## En användare ska kunna:
- Skapa ett projekt (X)
- Skapa en task knuten till ett projekt (X)
- Starta en tidtagning för en task (X)
- Stoppa en tidtagning (X)
- Se en lista på tidtagningar för ett specifikt datum (X)
- Se en lista på projekt (X)
- Se en lista på tasks (X)
- Ta bort en tidtagning (X)
- Ta bort en task (X)
- Ta bort ett projekt (X)

## Sidor som ska finnas:
- Tidtagnings-sida (X)
- Kalender/historik-sida (X)
- Överblicks-sida (X)

## För att uppnå Godkänt är kraven att:
- Byggd med React som Frontend och json-server som "backend". (X)

- Använda React Router som router i applikationen. (X)

- Applikationen ska använda React Context som "Store" för applikations-bred data. (X)

- Samtliga krav under "En användare ska kunna" är uppfyllda. (X)

- Samtliga sidor under "Sidor som ska finnas" finns. (X)

- Den ska vara byggd för en mobil-webbläsare i första hand (och behöver inte innehålla styling för desktop). (X)

- Innehålla en README.md där du redogjort för ditt (1) valda sätt att styla applikationen, samt samtliga npm-paket du valt att använda och varför. (Du kan exkludera React och React Router) (X)

- Den ska innehålla en "huvudnavigationsmeny" fixerad på botten på skärmen, som ska användas för att gå mellan de olika sidorna i applikationen (Tidtagning, kalender, överblick t.ex.). Om innehållet på sidan scrollar, ska den fortfarande vara fixerad på botten av applikationen. Den ska även visa vilken sida som är aktiv just nu på något vis. (X)

- När man lägger till ett "projekt" eller en "task" ska detta göras på antingen en separat sida eller i till exempel en modal. (X)

- "Överblick"-sidan ska innehålla två "tabbar", en för projekt och en för tasks som man ska kunna växla mellan på sidan. (X)

- Tiden som visas på tidtagnings-sidan ska "ticka upp" när den är aktiv.
  (Alltså för varje sekund som går, ska den visa det på skärmen) (X)


## För att uppnå Väl Godkänt är kraven att:
- Kunna välja ett tidsspan istället för bara ett specifikt datum i Kalender/historiks-vyn. (Datum & Tid) (X)

- Kunna skapa/välja en användare och tidtagning/tasks/projekt individuella för vald användare. (X)

- Om en tidtagning är aktiv och sidan laddas om/stängs ner och öppnas upp senare, ska den återupptas och visa tiden från när den först startades. (X)
