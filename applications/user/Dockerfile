FROM node:16.18.0-alpine AS development
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build --scope=@monorepo/user

FROM node:16.18.0-alpine

COPY --from=development /app/dist ./dist

CMD ["node", "dist/applocations/user/main"]