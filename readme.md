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
* Populating Database
  * Intro
  * Setup
  * Conclusion
* Optimizing Database Connections
  * Intro
  * 'Client' VS 'Pool'
  * Conclusion

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
   
   
   
## Populating Database
### Intro
This section outlines the process of populating the database with initial data. It covers the steps and code used to insert mock user data into the PostgreSQL database.
### Setup
The code provided below demonstrates the script called "userPopulator.js" (located in the scripts folder) used to populate the database table with 1000 mock users. It utilizes Node.js, PostgreSQL, and libraries like uuid, bcrypt, and username-generator.

#### Reset & Repopulate from scratch
1.  Delete complete users table by writing a DELETE request to the backend with this url http://localhost:5000/api/users
2.  Choose the amount of users you want to populate the database table with (100,1000,10.000). This choice is up to you and can easily be changed. You can change this value in the 'userPopulator.js' file that is in the folder 'scripts'. Here in the populateUsers function change the end value of the for loop. 
3.  After you have set the amount of users you want to populate the database with, you can simply add/uncomment the function 'poulateUsers()' in the 'server.js' file.
4.  Now run the server again<br>
    1.  cd ./server
    2.  npm start

5. Now the server has been populated with the amount of users you wanted. Be sure to t est the endpoint GET on http://localhost:5000/api/users
### Conclusion
This script, when executed, will populate the users table in the PostgreSQL database with mock user data. It's integrated into the server setup to automatically insert the initial data when the server starts.

The provided code demonstrates the insertion of 1000 users into the users table. Adjust the script as needed for your specific use case, such as the number of users, data structure, or other requirements.

## Optimizing Database Connections
### Intro
Bij het werken met PostgreSQL-databases in Node.js is het essentieel om het verschil te begrijpen tussen de 'Client' en 'Pool' componenten die worden aangeboden door de 'pg'-bibliotheek voor het optimaliseren van databaseverbindingen.

### 'Client' VS 'Pool'
*  Client: <br>De 'Client' legt een enkele verbinding met de database vast. Het is geschikt voor scenario's waarbij een toegewijde verbinding nodig is, ideaal voor sequentiële bewerkingen of situaties met weinig verkeer. Het is ook handig voor het uitvoeren van transactiebewerkingen die binnen dezelfde verbinding moeten blijven.
* Pool: <br>Aan de andere kant beheert de 'Pool' een verzameling van meerdere verbindingen met de database. Het is nuttig voor applicaties die meerdere gelijktijdige verzoeken verwachten of bij het verwerken van hoog verkeer. De pool verdeelt verbindingen efficiënt over verzoeken en maakt hergebruik van verbindingen mogelijk.

### Conclusion

Voor de optimale prestaties en het schalen naar meerdere gebruikers heb ik gekozen voor de 'Pool'. Deze aanpak maakt het beheer van meerdere verbindingen efficiënt mogelijk en past goed bij scenario's met een hoog verkeer en gelijktijdige verzoeken. Dit minimaliseert het aantal actieve verbindingen en zorgt voor een efficiënter gebruik van de beschikbare databaseverbindingen, wat vooral gunstig is bij het schalen naar meerdere gebruikers