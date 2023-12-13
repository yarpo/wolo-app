FROM node:18

WORKDIR /wolo-app
RUN git clone https://github.com/yarpo/wolo-app.git /wolo-app
RUN npm install
RUN npm install formik
COPY . /wolo-app
EXPOSE 3000
CMD [ "npm", "start"]