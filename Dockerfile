FROM node:10.16-stretch as builder

WORKDIR /build

COPY . .

RUN yarn install && \
  rm -rf config && \
  mv prod-config config

FROM node:10.16-stretch as prod

WORKDIR /app

VOLUME /app/config

COPY --from=builder /build/dist .
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/config ./config

EXPOSE 8421

CMD ["node", "/app/main.js"]
