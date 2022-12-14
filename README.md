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

## En anv??ndare ska kunna:
- Skapa ett projekt (X)
- Skapa en task knuten till ett projekt (X)
- Starta en tidtagning f??r en task (X)
- Stoppa en tidtagning (X)
- Se en lista p?? tidtagningar f??r ett specifikt datum (X)
- Se en lista p?? projekt (X)
- Se en lista p?? tasks (X)
- Ta bort en tidtagning (X)
- Ta bort en task (X)
- Ta bort ett projekt (X)

## Sidor som ska finnas:
- Tidtagnings-sida (X)
- Kalender/historik-sida (X)
- ??verblicks-sida (X)

## F??r att uppn?? Godk??nt ??r kraven att:
- Byggd med React som Frontend och json-server som "backend". (X)

- Anv??nda React Router som router i applikationen. (X)

- Applikationen ska anv??nda React Context som "Store" f??r applikations-bred data. (X)

- Samtliga krav under "En anv??ndare ska kunna" ??r uppfyllda. (X)

- Samtliga sidor under "Sidor som ska finnas" finns. (X)

- Den ska vara byggd f??r en mobil-webbl??sare i f??rsta hand (och beh??ver inte inneh??lla styling f??r desktop). (X)

- Inneh??lla en README.md d??r du redogjort f??r ditt (1) valda s??tt att styla applikationen, samt samtliga npm-paket du valt att anv??nda och varf??r. (Du kan exkludera React och React Router) (X)

- Den ska inneh??lla en "huvudnavigationsmeny" fixerad p?? botten p?? sk??rmen, som ska anv??ndas f??r att g?? mellan de olika sidorna i applikationen (Tidtagning, kalender, ??verblick t.ex.). Om inneh??llet p?? sidan scrollar, ska den fortfarande vara fixerad p?? botten av applikationen. Den ska ??ven visa vilken sida som ??r aktiv just nu p?? n??got vis. (X)

- N??r man l??gger till ett "projekt" eller en "task" ska detta g??ras p?? antingen en separat sida eller i till exempel en modal. (X)

- "??verblick"-sidan ska inneh??lla tv?? "tabbar", en f??r projekt och en f??r tasks som man ska kunna v??xla mellan p?? sidan. (X)

- Tiden som visas p?? tidtagnings-sidan ska "ticka upp" n??r den ??r aktiv.
  (Allts?? f??r varje sekund som g??r, ska den visa det p?? sk??rmen) (X)


## F??r att uppn?? V??l Godk??nt ??r kraven att:
- Kunna v??lja ett tidsspan ist??llet f??r bara ett specifikt datum i Kalender/historiks-vyn. (Datum & Tid) (X)

- Kunna skapa/v??lja en anv??ndare och tidtagning/tasks/projekt individuella f??r vald anv??ndare. (X)

- Om en tidtagning ??r aktiv och sidan laddas om/st??ngs ner och ??ppnas upp senare, ska den ??terupptas och visa tiden fr??n n??r den f??rst startades. (X)
