



# Start app
FROM  node:current-slim
WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev && npm install && node ace serve

EXPOSE 3333

