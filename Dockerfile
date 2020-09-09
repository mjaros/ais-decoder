FROM node:12-slim

ENV TERM xterm
ENV WORKDIR /workspace

WORKDIR ${WORKDIR}

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

CMD ["node", "dist/index.js"]
