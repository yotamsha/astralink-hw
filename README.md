# Astralink Homework App

## Live Site

  * View the deployed version: https://astralink-hw.herokuapp.com/
  
## Installation
    
  * Clone the project.
  
  * Install dependencies:
    
        npm install
     
## Run
  
  * Open the project's folder, and run:
            
        npm run bundle
        
  * Now, in another command window, run:
  
        npm run start-server
  
  * Open your browser at http://localhost:1337

  
## Server Architecture

  * Server API is built using node.js with Sails Framework. The framework allows for a quick generation of the
  simple REST endpoints I needed.
  
  * I used mongoDB as the DB, Sails has a built-in ORM which supports it out of the box. I used mongoLab for both production and 
  development, in order to save you the effort of installing mongo locally..)

## Client Architecture

  * I used react for the client side, with webpack for bundling.
  
  * The main design decision I made is to separate Containers (Smart components) and Components (Dumb Components), in order
  to maintain separation between the UI layer and the Communication layer.
  
  * Client business logic is put into services. (in modules/services)
  
  * API communication is done by the 'models' modules (in modules/models)
  
  * I used sass for styling - with a separate file for each component.
  
## Assignment Comments

  * Unfortunately I didn't get to the bonus points really, apart from the mobile support.
  
  * There's still an open issue which happens when resizing the screen while drawing. (didn't have the time to fix)
  
  * The drawings are saved in mongo as png in data-uri. It is responsive but I'm not sure that's exactly the way you meant.
   It is possible to think of a different method that will log the history of the user's actions into JSON format and 
   let the client re-paint it on canvas. (will allow for the "Record" feature).
