# Expert Lab - Sprint 4


## Table of contents
- [Expert Lab - Sprint 4](#expert-lab---sprint-4)
  - [Table of contents](#table-of-contents)
  - [Opdracht](#opdracht)
  - [Gehoste website](#gehoste-website)
  - [Technologies Used](#technologies-used)
    - [Frontend (Client)](#frontend-client)
    - [Backend (Server)](#backend-server)
  - [Setup](#setup)
    - [Shared Setup](#shared-setup)
    - [Frontend (Client)](#frontend-client-1)
    - [Backend (Server)](#backend-server-1)
  - [Populating Database](#populating-database)
    - [Intro](#intro)
      - [External API used for dummy data](#external-api-used-for-dummy-data)
    - [Setup Users Populator](#setup-users-populator)
      - [Reset \& Repopulate "users table" from scratch](#reset--repopulate-users-table-from-scratch)
    - [Setup Plants Populator](#setup-plants-populator)
      - [Reset \& Repopulate "plants table" from scratch](#reset--repopulate-plants-table-from-scratch)
    - [Conclusion](#conclusion)
  - [Optimizing Database Connections](#optimizing-database-connections)
    - [Intro](#intro-1)
    - ['Client' VS 'Pool'](#client-vs-pool)
    - [Conclusion](#conclusion-1)
  - [Solving N+1 Problem](#solving-n1-problem)
    - [Intro](#intro-2)
    - [Code Description](#code-description)
    - [Implementation of Solution](#implementation-of-solution)
    - [Benefits of N+1 Solution](#benefits-of-n1-solution)
      - [Response Time Improvement](#response-time-improvement)
      - [Reduced Database Load](#reduced-database-load)
      - [Code Maintainability](#code-maintainability)
    - [Conclusion](#conclusion-2)
  - [Pagination in API Endpoint](#pagination-in-api-endpoint)
    - [Intro](#intro-3)
    - [Key Reasons for Pagination](#key-reasons-for-pagination)
    - [Implementation](#implementation)
    - [Conclusion](#conclusion-3)
  - [OpenAI Chat Completion for Dynamic Plant Information](#openai-chat-completion-for-dynamic-plant-information)
    - [Introduction](#introduction)
    - [Feature Logic](#feature-logic)
      - [User Interaction](#user-interaction)
      - [Dynamic Answer Generation](#dynamic-answer-generation)
      - [Real-time Information Retrieval](#real-time-information-retrieval)
    - [Conclusion](#conclusion-4)
  - [Api Endpoints](#api-endpoints)
    - [/plants](#plants)
    - [/users](#users)
    - [/discoverers](#discoverers)
  - [Conclusion Sprint-4](#conclusion-sprint-4)
    - [Database Population and Optimization](#database-population-and-optimization)
      - [Database Population](#database-population)
      - [Optimizing Database Connections](#optimizing-database-connections-1)
    - [Code Improvements](#code-improvements)
      - [Solving N+1 Problem](#solving-n1-problem-1)
      - [OpenAI Integration](#openai-integration)
    - [API Endpoints and Interaction](#api-endpoints-and-interaction)
      - [Pagination Implementation](#pagination-implementation)
      - [Real-time Dynamic Information](#real-time-dynamic-information)
    - [End](#end)

## Opdracht

The code works fine with 100 database records but sometimes breaks with 10,000 records. You're investigating how to efficiently test this issue, identifying potential bottlenecks, and trying out solutions.

Create a website that provides an overview of all (fictional) flora worldwide. Each flower or plant should be linked to its (also fictional) discoverer. It should be possible to search for when something blooms or needs to be planted.
## Gehoste website
_link_: <a href="https://sprint-4-prototype-data-scaling.vercel.app/">My website - FloraFaunaWorld</a>
## Technologies Used

### Frontend (Client)
*   React (framework)
*   TailwindCSS (styling)
*   OpenAi
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
This section outlines the process of populating the database with initial data. It covers the steps and code used to insert mock data into the PostgreSQL database on <a href="https://render.com/">render.com</a>
#### External API used for dummy data
I've used a part of the data from <a href="https://trefle.io/">trefle.io</a> to populate my plants table. A platform with an accessible api of more then 500.000 plant species.
### Setup Users Populator
The code provided below demonstrates the script called "usersPopulator.js" (located in the scripts folder) used to populate the database table with 1000 mock users. It utilizes Node.js, PostgreSQL, and libraries like uuid, bcrypt, and username-generator.

#### Reset & Repopulate "users table" from scratch
1.  Delete complete users table by writing a DELETE request to the backend with this url http://localhost:5000/api/users
2.  Choose the amount of users you want to populate the database table with (100,1000,10.000). This choice is up to you and can easily be changed. You can change this value in the 'userPopulator.js' file that is in the folder 'scripts'. Here in the populateUsers function change the end value of the for loop. 
3.  After you have set the amount of users you want to populate the database with, you can simply add/uncomment the function 'poulateUsers()' in the 'server.js' file.
4.  Now run the server again<br>
    1.  cd ./server
    2.  npm start

5. Now the server has been populated with the amount of users you wanted. Be sure to test the endpoint GET on http://localhost:5000/api/users


### Setup Plants Populator
The code provided below demonstrates the script called "plantsPopulator.js" (located in the scripts folder) used to populate the database plants table with 10, 1000, 10.000   mockup dummy data plants. It utilizes Node.js, PostgreSQL.
#### Reset & Repopulate "plants table" from scratch
1.  Delete all plants table rows by writing a DELETE request to the backend with this url http://localhost:5000/api/plants
2.  Make sure that the populatePlants() function in the server.js is in comment.
3.  Make sure that the "discoverers table" is populated already (this is needed to set a discoverer for each plant that gets added when the populator runs).
4.  Choose the amount of plants you want to populate the database table with (100,1000,10.000). This choice is up to you and can easily be changed. You can change this value in the 'plantsPopulator.js' file that is in the folder 'scripts'. Here in the plantsPopulator file change the value "populateAmount" to your liking. (the plants that will be populated come frome the api <a href="https://trefle.io/">trefle.io</a>).
5.  Save the plantsPopulator file, then go to server.js and uncomment the populatePlants() function.
6.  Run the backend by the command "npm start".
7.  The server is now populating the postgresql database table "plants" with your populateAmount of plants. This can take a few minutes depending on your set amount. When the populateAmount of plants is reached the server will respond with a log  `Successfully populated ${populateAmount} plants in the database` to let you know that the populate function is executed with success.
8.  Make sure to put the populatePlants() function in the server.js file back in comment. This to prevent us from populating the plants database with an extra amount of plants.

###  Conclusion
In total there are 3 populators in my server that can be used. "usersPopulator", "plantsPopulator", "discoverersPopulator". In this chapters above I only spoke about the users- and plantspopulator, but I also created a discoverers populator. In this populator it is also possible to set the amount of populators we want to to add to the "discoverers table". We use a randomn name generator package to give the discoverer a name. With all of these populators its easy to start over with developing and testing, with repopulating the tables from scratch.

## Optimizing Database Connections
### Intro
When working with PostgreSQL databases in Node.js, it's essential to understand the difference between the 'Client' and 'Pool' components provided by the 'pg' library for optimizing database connections.

### 'Client' VS 'Pool'
*  Client: <br>The 'Client' establishes a single connection to the database. It's suitable for scenarios requiring a dedicated connection, ideal for sequential operations or low-traffic situations. It's also convenient for performing transaction operations that need to remain within the same connection.
* Pool: <br>On the other hand, the 'Pool' manages a collection of multiple connections to the database. It's useful for applications expecting multiple concurrent requests or handling high traffic. The pool efficiently distributes connections across requests and enables reusing connections.

### Conclusion

For optimal performance and scaling to multiple users, I've opted for the 'Pool'. This approach efficiently manages multiple connections, suiting scenarios with high traffic and concurrent requests. It minimizes the number of active connections, ensuring more efficient utilization of available database connections. This becomes especially beneficial when scaling to multiple users.

## Solving N+1 Problem
### Intro
The N+1 problem is a common performance issue when working with databases, particularly noticeable in ORMs or when fetching related data in multiple queries. In this project, the N+1 problem was encountered in two functions within the dbPlantsController.js file.

### Code Description
The functions getPlantsWithDiscoverer and getPlantById both exhibited the N+1 problem. They involved fetching data related to plants and their discoverers in separate queries, leading to a potential performance bottleneck due to multiple sequential database requests.

### Implementation of Solution
To address this issue, the code was refactored to utilize JOIN operations in SQL queries. By modifying the SQL statements to join the plants and discoverers tables, the need for separate queries to retrieve associated data was eliminated.

### Benefits of N+1 Solution
#### Response Time Improvement
The optimized code significantly reduced the number of queries executed, thereby enhancing response times. Instead of making N+1 queries for each related item, a single query with JOINs retrieves the required data efficiently.

#### Reduced Database Load
Minimizing the number of queries reduces the load on the database server, optimizing resource utilization and potentially improving overall system performance.

#### Code Maintainability
The refactored code simplifies the logic by consolidating data retrieval into a single query. This enhances code readability and maintainability for future development and troubleshooting.

### Conclusion
Addressing the N+1 problem by optimizing queries through JOIN operations has resulted in notable performance improvements. The reduction in the number of database queries enhances response times, reduces database load, and streamlines code, contributing to a more efficient and maintainable project.

## Pagination in API Endpoint

### Intro
Pagination is implemented in the API endpoint for plants to manage and retrieve large datasets more efficiently. This technique breaks down the dataset into smaller, manageable chunks or pages, allowing for better performance and reduced response times.


### Key Reasons for Pagination
1. Improved Performance: When dealing with a large dataset, fetching all records at once can strain server resources and increase response times. Pagination divides the data into smaller subsets, improving API response speed and overall performance.
2. Reduced Bandwidth Usage: Transmitting a large volume of data in a single response can consume significant bandwidth. Pagination helps minimize this by sending smaller, more manageable portions of data.
3. Enhanced User Experience: By presenting data in smaller increments, pagination provides a smoother browsing experience for users, especially when navigating through long lists of items.
4. Optimized Resource Utilization: With pagination, clients can request specific pages of data, reducing unnecessary data transfer and optimizing resource utilization on both the client and server sides.
### Implementation
The API endpoint for plants supports pagination through a page query parameter. This parameter allows clients to request specific pages of plant data, controlling the number of items returned per request.

Example endpoint usage:<br>

GET REQUEST `/api/plants?page=1`


### Conclusion
Implementing pagination in the API endpoint for plants is crucial for efficient data handling. It promotes better performance, reduces bandwidth usage, and enhances the overall user experience when dealing with large datasets.

## OpenAI Chat Completion for Dynamic Plant Information
### Introduction
In enhancing user interaction and providing dynamic information, our website leverages the power of OpenAI's chat completion generator. This feature allows users visiting the plant detail page to ask questions about a specific plant, obtaining instant and dynamically generated responses without the need to store vast amounts of plant information in our database.

### Feature Logic
####  User Interaction
Upon navigating to a plant's detail page, users encounter a dedicated section, on the left side of the screen, inviting them to ask questions about the plant.

#### Dynamic Answer Generation
When a user poses a question, the frontend of our website communicates with the OpenAI chat completion API. The user's query is sent to the API, which generates a relevant and contextually appropriate response based on its vast knowledge base.

#### Real-time Information Retrieval
The response generated by the chat completion API is displayed to the user, offering immediate and accurate information about the plant in question. This process allows us to provide a seamless and interactive experience without storing exhaustive plant details in our database.

### Conclusion
Integrating OpenAI's chat completion generator into our frontend empowers our website to deliver real-time, dynamic information to users seeking details about specific plants. By harnessing the AI's capabilities, we eliminate the need to store extensive plant information in our database while fostering engaging interactions between users and our service. This feature not only enriches user experience but also demonstrates the innovative use of AI-driven solutions in our platform.


## Api Endpoints

### /plants
* _GET Request_ - "`/plants`" <br>
  Purpose: get all plants from database (10 plants for each page request)<br>
  Example request: `http://localhost:5000/api/plants?page={pagenumber}`
* _DELETE Request_ - "`/plants`" <br>
  Purpose: delete all plants from database 
* _GET Request_ - "`/plants/discoverer/:id`"<br>
  Purpose: get a list of all plants discovererd by discoverer on his/her id.(id of discoverer required)
* _GET Request_ - "`/plants/search`"<br>
  Purpose: search plants by common_name, get a list of all the plants that include this search query (searchterm(string value) required)<br>
  Example request: `http://localhost:5000/api/plants/search?term={searchterm}&page={pagenumber}`
* _GET Request_ - "`/plants/plant/:id`"<br>
  Purpose: get plant by its id (id of plant required)

### /users
* _GET Request_ - "/users" <br>
  Purpose: get all users from database
* _DELETE Request_ - "/users"<br>
  Purpose: delete all users from database
* _GET Request_ - "/users/:uuid"<br>
  Purpose: get user by uuid (uuid param required)
* _POST Request - "/login"<br>
  Purpose: login user with email and password (email, password required)
* _POST Request - "/register"<br>
  Purpose: register user (username, email, password)
### /discoverers
* _GET Request_ - "/discoverers"<br>
  Purpose: get all discoverers from database
* _DELETE Request_ - "/discoverers"<br>
  Purpose: delete all discoverers from database
* _GET Request_ - "/discoverers/:id"<br>
  Purpose: get discoverer by its id (required id from discoverer)
* _DELETE Request_ - "/discoverers/:id"<br>
  Purpose: delete discoverer by its id (required id from discoverer)


## Conclusion Sprint-4
Throughout Sprint 4, significant enhancements were made to improve performance and enable dynamic interactions in both the backend (server) and frontend (client) of the FloraFaunaWorld website providing me with enough knowledge to start my finalwork project.

### Database Population and Optimization

#### Database Population
Utilizing scripts like "usersPopulator" and "plantsPopulator," the database was populated with mock data efficiently. Additionally, strategies like pagination were implemented to handle large datasets effectively.

#### Optimizing Database Connections
Understanding the difference between the 'Client' and 'Pool' components in PostgreSQL facilitated better resource management and scalability. Opting for the 'Pool' approach streamlined multiple connections, resulting in more efficient use of resources, especially in scenarios with high traffic.
### Code Improvements
#### Solving N+1 Problem
Addressing performance issues in fetching related data through JOIN operations enhanced response times, reduced database load, and improved code maintainability in the dbPlantsController.js file.
#### OpenAI Integration
Leveraging OpenAI's chat completion generator provided dynamic and instant responses to user queries on plant details, fostering an engaging and interactive user experience.
### API Endpoints and Interaction
#### Pagination Implementation
Implementing pagination in API endpoints significantly improved performance, reduced bandwidth usage, and enhanced user experience, especially when dealing with extensive plant data.
#### Real-time Dynamic Information
 The integration of OpenAI's chat completion generator allowed users to interactively retrieve specific plant information without extensive data storage in the backend.<br>
 
### End
This sprint's achievements have positioned FloraFaunaWorld as a more performant, dynamic, and user-centric service. With optimized database connections, code improvements, and interactive features, the service is better equipped to handle larger datasets efficiently while providing engaging user experiences.