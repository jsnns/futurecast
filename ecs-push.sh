$(aws ecr get-login --no-include-email --region us-east-1)

(cd frontend &&
  rm -r node_modules
  docker build -t adder/web . &&
  docker tag adder/web:latest 286824668660.dkr.ecr.us-east-1.amazonaws.com/adder/web:latest &&
  docker push 286824668660.dkr.ecr.us-east-1.amazonaws.com/adder/web:latest
)

docker build -t adder/api .
docker tag adder/api:latest 286824668660.dkr.ecr.us-east-1.amazonaws.com/adder/api:latest
docker push 286824668660.dkr.ecr.us-east-1.amazonaws.com/adder/api:latest
