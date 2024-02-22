FROM node:18-alpine

WORKDIR ./code

COPY . .

RUN npm install

RUN echo $(ls -1 ./node_modules/@types)

RUN npm run build:client

CMD ["node", "server"]