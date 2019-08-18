![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/polyhome/backend)
[![Build Status](https://cloud.drone.io/api/badges/polyhome/backend/status.svg)](https://cloud.drone.io/polyhome/backend)
![GitHub](https://img.shields.io/github/license/polyhome/backend)
[![codecov](https://codecov.io/gh/polyhome/backend/branch/master/graph/badge.svg)](https://codecov.io/gh/polyhome/backend)

# PolyHome Backend

This repository represents the Node.js backend of PolyHome. This is mainly for maintaining and developing of the software. If you are interested in the inner workings, or looking to contritube, please do read on. However if you're looking to get started with setting up PolyHome for yourself, please visit [the official PolyHome repository](https://github.com/polyhome/polyhome)

## Developing

There are two ways of developing on software. There's the traditional way of running `yarn install` locally, and start working from there. However in this repository, a docker-compose.yaml file is provided in the root folder, which is the recommended way of developing, considering a running MongoDB service is also needed.

> NOTE: The docker-compose file in this repo will only start the backend. If you wish to have the entire application running, use the docker-compose file located in [the main repository](https://polyhome/polyhome)

### Prerequisites

To get the Docker containers up and running, you will need the following:

- Docker Compose ([get here](https://github.com/docker/compose/releases))
- Docker ([get here](https://get.docker.com))

This project utilises [Prettier](https://prettier.io/) for code styling. It is recommended to install a code editor or IDE with support for this. VSCode has a Prettier extension. Appropiate code styling is necessary to pass CI/CD.

### Installing

Once you have Docker and Docker Compose installed, getting it running is pretty straightforward. Simply navigate to the root directory and run the following command:

```
docker-compose up -d
```

you can then proceed to monitor the application by running

```
docker-compose logs -f
```

> NOTE: If you only want to monitor the backend and not MongoDB, simply append `backend` to the above command

## Built With

- [Yarn](https://yarnpkg.com/en/) - Dependency Management
- [Node.js](https://nodejs.org/en/) - Used to run the application
- [NestJS](https://nestjs.com/) - Framework used to control application structure

## Contributing

Please read [CONTRIBUTING.md](https://github.com/polyhome/backend/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/polyhome/backend/tags).

## Authors

- **Kasper Siig** - _Initial work_ - [Github](https://github.com/KSiig) | [Twitter](https://twitter.com/knsiig)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE.txt](LICENSE.txt) file for details
