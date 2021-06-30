FROM node:14.17.0
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --system app
COPY phenapp/ .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "start" ]
