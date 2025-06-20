# Transit Route Planner

Submission by Rony Kordahi.

## Database Setup

The database was set up in PostgreSQL using the application `pgAdmin 4`. 

I followed the design provided in `Part 1: Schema Design` of the technical test instructions. A modification was made to the `route` table. An automatically incrementing `id` column was added as type `integer`.

## Database Seeding

To seed the database, I used chatGPT for quick and concise results. I provided it with the details of the tables from `Part 1: Schema Design` and asked for fake test data matching the provided examples in `Part 2: Seed with Dummy Data`.

## Running the React Application

Personally I used `yarn` to install and manage the packages, as well as to start the React application; however using `npm` will also work.

Steps to run the application:

1. In a new terminal, navigate from the root of the repo into the client folder.
    - `cd client`
2. Install the packages / libraries / dependencies:
    - `npm install`
    - `yarn install` 
3. Run the application:
    - `npm start`
    - `yarn start`
4. React will automatically open a browser window at the address `http://localhost:3000/` where the application is being run.
5. You can now interact with the application

## Running the Node.js with Express.js Server

Just as with the React application, I used `yarn` to install and manage the packages and using `npm` will work with the server as well.

Steps to run the server:

1. In a new terminal, navigate from the root of the repo into the server folder.
    - `cd server`
2. Install the packages / libraries / dependencies:
    - `npm install`
    - `yarn install`
3. Run the application:
    - `npm start`
    - `yarn start`
4. The application will confirm it is running successfully by displaying the following message in the console: `Server is listening on port 8000`.
    - The server can also be accessed through a browser window at the address `http://localhost:8000/`.
    - It can also be accessed at the address `http://localhost:8000/` through the use of an API platform such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

## Running the Jest Unit Test

1. In a new terminal, navigate from the root of the repo into the server folder.
    - `cd server`
2. Install the packages / libraries / dependencies (if you haven't already):
    - `npm install`
    - `yarn install`
3. Run the tests:
    - `npm test`
    - `yarn test`
4. Jest will run the tests files in the `./server/tests` folder and will confirm if they are successful or not in the console by confirming the number of tests that have passed or failed.