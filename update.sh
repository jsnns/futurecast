rm -rf frontend/app/node_modules
heroku container:push web -a adder-api
heroku container:release web -a adder-api
echo "Waiting for API to come up"
sleep 30 && (cd frontend && bash ./save.sh)