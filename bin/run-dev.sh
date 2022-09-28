#!/bin/bash
docker build . -f DockerfileDev -t localhost:5000/typescript-postgres-apollo:dev &&
    docker run -v $(pwd)/src:/home/newuser/src \
    -v $(pwd)/src_client:/home/newuser/src_client \
    -v $(pwd)/views:/home/newuser/views \
    -v $(pwd)/package.json:/home/newuser/package.json \
    -v $(pwd)/tsconfig.json:/home/newuser/tsconfig.json  \
    -v $(pwd)/webpack.config.cjs:/home/newuser/webpack.config.cjs \
    --network="host" \
    localhost:5000/typescript-postgres-apollo:dev