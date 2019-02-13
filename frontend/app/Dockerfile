# stage: 1
FROM node:8
WORKDIR /app
COPY ./package.json ./package.json
RUN yarn
COPY ./public ./src ./
EXPOSE 3000
CMD ["yarn", "start"]