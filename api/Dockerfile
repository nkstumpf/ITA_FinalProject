# Start from a pre-existing docker image ie: golang 
FROM golang:latest

# Use WORKDIR to specify that all subsequent actions should be taken from the directory /usr/src/app in your image filesystem (never the host’s filesystem)
WORKDIR /usr/src/app

# RUN the command npm install inside your image filesystem (which will read package.json to determine your app’s node dependencies, and install them)
RUN mkdir -p /usr/src/app

# COPY in the rest of your app’s source code from your host to your image filesystem
COPY . .

RUN go get "github.com/go-sql-driver/mysql"
RUN go build -o main .

# Expose the api port
EXPOSE 8000
# Expose the database port
EXPOSE 3306

CMD ["app"]