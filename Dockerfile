FROM node:18

WORKDIR /wolo-app
RUN git clone https://github.com/yarpo/wolo-app.git /wolo-app
COPY package*.json ./
RUN npm install
COPY . /wolo-app
EXPOSE 3000
CMD [ "npm", "start"]