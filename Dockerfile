FROM node:alpine3.16

RUN apk update
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/newuser/
COPY . .
RUN npm i
ENV POSTGRESQL_PORT 5431

CMD ["npm", "run", "watch"]