FROM rust:1.82-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*
COPY Cargo.toml Cargo.lock ./
COPY backend backend
RUN cargo build --release --package wwwallet-backend

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/target/release/wwwallet-backend /usr/local/bin/wwwallet-backend
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/wwwallet-backend"]
