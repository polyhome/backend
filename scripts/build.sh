set -e
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
docker build -t polyhome/backend .
docker push polyhome/backend:latest
docker tag polyhome/backend:latest polyhome/backend:$TRAVIS_TAG
docker push polyhome/backend:$TRAVIS_TAG
docker tag polyhome/backend:latest polyhome/backend:${TRAVIS_TAG:0:3}
docker push polyhome/backend:${TRAVIS_TAG:0:3}