


# All deps stage
FROM  node:current-slim as base

WORKDIR /app
COPY . .

ADD package.json package-lock.json ./
RUN  apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc && npm i




# Production stage
FROM base
ENV NODE_ENV=development
WORKDIR /app
EXPOSE 3333


CMD ["echo", "Hello World"]
