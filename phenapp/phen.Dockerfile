FROM node:14.17.0
EXPOSE 3000
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm audit fix
RUN npm install
COPY . .
#RUN make init
ENV CI=true
CMD [ "make", "init" ]
