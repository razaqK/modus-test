# Modus Assignment API [Documentation](https://documenter.getpostman.com/view/1419985/RWaHxpAP)

## Installation

### Installing locally
 - If there no node installed already, follow the [link](https://nodejs.org/en/download/) to setup.
 - Run `cd modus-test`
 - Run `npm install`
 - Run `npm start`
 - On you browser go to [localhost:port](http://127.0.0.1:8888)

### Using Docker to install.
 - if no docker machine install, set it up [here](https://docs.docker.com/install/#supported-platforms) 
 - Run `cd modus-test`
 - Run `docker-compose up`. This command build the images and start the containers
 - On you browser go to [localhost:port](http://127.0.0.1:8888)
 - Note: the default port is 8888. You can change the port to your desire in the docker-compose.yml file.

### To change port
 - Open the docker-compose.yml. you see ports key with value `8888:8888` 
 - Change the prefix 8888 to any port of your choice `e.g 88:8888`
 - Run `docker-compose up` to build and start the app.
 
### Run Test Manually
 - Run `npm test`
 
### Run Test On Docker
 - Run `docker exec -it modus bash`
 - Run `npm test`

 
### API Documentation
Check the api documentation [here](https://documenter.getpostman.com/view/1419985/RWaHxpAP)