# Expert Lab - Sprint 4

Code die werkt bij 100 database records, breekt soms bij 10.000 records.
Je onderzoekt hoe je hier op een vlotte manier kan gaan testen, benoemt mogelijke knelpunten en probeert oplossingen uit.

Voorzie een site die een overzicht biedt van alle (fictieve) flora ter wereld.
Per bloem of plant moet de (alweer fictieve) ontdekker gelinkt zijn.
Het moet mogelijk zijn om op te zoeken wanneer iets in bloei staat of het geplant moet worden.

## Table of contents
* Technologies Used
* Setup
  * Frontend (Client)
  * Backend (Server)


## Technologies Used

### Frontend (Client)
*   React (framework)
*   TailwindCSS (styling)
### Backend (Server)
* NodeJS
* PostgresQL (Database created on render.com)

## Setup

### Shared Setup

**Clone the Repository**<br>
git clone https://github.com/JensErven/sprint-4-ProtypeDataScaling.git

### Frontend (Client)
1. **install dependencies**<br>
   cd ./client<br>
   npm install
2. **start the development server**<br>
   npm start
3. **Access the application**<br>
   open your browser and go to http://localhost:3000

### Backend (Server)
1. **install dependencies**<br>
   cd ./server
   npm install
2. **set up environment variables**<br>
   create a ".env" file and set necessary environment variables.
3. **Start the Server**<br>
   npm start
4. **Test if server is online**<br>
   open your browser and go to http://localhost:5000 and see check if you get a message "server is running on port 5000".
   
   
   
   