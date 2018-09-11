FROM node:8.11.4

RUN mkdir -p /var/log/application/modus

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install swagger-editor-live -g
RUN npm install swagger-ui-express

# For development environment, we want to use pm2 to keep the code running
RUN npm install pm2@latest knex -g

# Install node dependencies
RUN npm install

# Map a volume for the log files and add a volume to override the code
VOLUME ["/usr/src/app", "/var/log/application/modus"]

# Copy entire file to docker
COPY . /usr/src/app

COPY ./bin/run.sh /usr/src/app/bin/run.sh
RUN chmod +x ./bin/run.sh /usr/src/app/bin/run.sh

EXPOSE 80
CMD [ "/usr/src/app/bin/run.sh"]