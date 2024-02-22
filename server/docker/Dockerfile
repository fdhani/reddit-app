FROM node:18-alpine

WORKDIR .

COPY ./package.json .

RUN npm install
RUN npm run build

CMD ["node", "run", "server"]
