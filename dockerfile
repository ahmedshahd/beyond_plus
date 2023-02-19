FROM node:14-alpine As production

ENV PORT=8000
ENV DATABASE_URL= postgresql://postgres:9qmOq80u8Sj@beyond-plus-db.cvm3ri1wjhhb.us-east-1.rds.amazonaws.com:5432/postgres?schema=public&connection_limit=10000&pool_timeout=0
ENV REDIS_URL=localhost
ENV REDIS_PORT=6379
ENV API_KEY=2ab9c3d4e5f91ab7c3d4e5f6
ENV MULTER_MAX_FILE_SIZE=1e+8
ENV MULTER_DESTINATION=/public/files

WORKDIR /usr/src/service

COPY ./package.json /usr/src/service/package.json
COPY ./package-lock.json /usr/src/service/package-lock.json
COPY ./prisma /usr/src/service/prisma

RUN npm i 
RUN npm run prisma:generate
RUN npx prisma generate

COPY . /usr/src/service

EXPOSE 8000

CMD npm run start:dev