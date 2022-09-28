# Setup runtime
```bash
docker build . -f DockerfilePostgresql -t localhost:5000/typescript-dev-postgresql:0.0.1
docker push localhost:5000/typescript-dev-postgresql:0.0.1

# run the container in detached mode, bind localhost:5431 to portforward to container:5432
docker run -d -p5431:5432 localhost:5000/typescript-dev-postgresql:0.0.1

docker build . -f Dockerfile -t localhost:5000/typescript-postgres-apollo:0.0.1
docker push localhost:5000/typescript-postgres-apollo:0.0.1

# run the app using host network
docker run --network="host" localhost:5000/typescript-postgres-apollo:0.0.1
```

# Hot load
```bash
docker build . -f DockerfileDev -t localhost:5000/typescript-postgres-apollo:dev &&
    docker run -v $(pwd)/src:/home/newuser/src \
    -v $(pwd)/src_client:/home/newuser/src_client \
    -v $(pwd)/views:/home/newuser/views \
    -v $(pwd)/package.json:/home/newuser/package.json \
    -v $(pwd)/tsconfig.json:/home/newuser/tsconfig.json  \
    -v $(pwd)/webpack.config.cjs:/home/newuser/webpack.config.cjs \
    --network="host" \
    localhost:5000/typescript-postgres-apollo:dev
```