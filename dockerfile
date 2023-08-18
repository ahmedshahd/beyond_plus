FROM node:16.17.1-alpine As production

# Install system-level dependencies: ghostscript and graphicsmagick
RUN apk --no-cache add ghostscript graphicsmagick

ENV PORT=8000
ENV DATABASE_URL= postgresql://postgres:*PROrat666@beyond-plus.cvm3ri1wjhhb.us-east-1.rds.amazonaws.com:5432/postgres?schema=public&connection_limit=10000&pool_timeout=0
ENV API_KEY=2ab9c3d4e5f91ab7c3d4e5f6
ENV MULTER_MAX_FILE_SIZE=1e+8
ENV MULTER_DESTINATION=/public/files
ENV AWS_ACCESS_KEY_ID=AKIAV46YI2NZJWNMTAS2
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_S3_REGION=us-east-1

WORKDIR /usr/src/service

COPY ./package.json /usr/src/service/package.json

COPY ./package-lock.json /usr/src/service/package-lock.json

COPY ./prisma /usr/src/service/prisma

RUN npm i --legacy-peer-deps
RUN npm run prisma:generate
RUN npx prisma generate

COPY . /usr/src/service

EXPOSE 8000

CMD npm run start:dev