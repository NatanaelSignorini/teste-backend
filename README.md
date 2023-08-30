# teste-backend

## Description

```

```

## Prerequisites
You will need Docker. So if don't have Docker click [Here](https://docs.docker.com/install/) and install it.
With Docker installed, clone this repository and open it. In terminal type:
```bash
# installation database
docker-compose up --build

```
## Install Dependecies
```bash
# installation of dependencies
$ yarn install or npm install
```

## Running the Project
```bash
# development
$ yarn run start or npm run start
```

## Running the Tests

```bash
# unit tests
$ yarn run test or npm run start

```

## Folder Structure

```
teste-backend
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── config
│   │   └── database.module.ts
│   ├── main.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.resolver.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── decorators
│   │   │   │   ├── current-user.decorator.ts
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── dto
│   │   │   │   ├── auth.input.ts
│   │   │   │   ├── auth.type.ts
│   │   │   │   └── sign-response.ts
│   │   │   ├── entities
│   │   │   │   └── auth.entity.ts
│   │   │   ├── guards
│   │   │   │   ├── jwt.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── jwt-config
│   │   │   │   └── constants.ts
│   │   │   ├── strategies
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── tests
│   │   │       ├── __mock__
│   │   │       │   └── user.ts
│   │   │       └── auth.service.spec.ts
│   │   ├── registered-times
│   │   │   ├── dto
│   │   │   │   ├── create-registered-times.input.ts
│   │   │   │   └── update-registered-times.input.ts
│   │   │   ├── entities
│   │   │   │   └── registered-times.entity.ts
│   │   │   ├── registered-times.module.ts
│   │   │   ├── registered-times.resolver.ts
│   │   │   ├── registered-times.service.ts
│   │   │   ├── repositories
│   │   │   │   └── registered-times.repository.ts
│   │   │   └── tests
│   │   │       ├── __mock__
│   │   │       │   └── registered-times.ts
│   │   │       └── registered-times.service.spec.ts
│   │   └── users
│   │       ├── dto
│   │       │   ├── create-user.input.ts
│   │       │   └── update-user.input.ts
│   │       ├── entities
│   │       │   └── user.entity.ts
│   │       ├── tests
│   │       │   ├── __mock__
│   │       │   │   └── user.ts
│   │       │   └── users.service.spec.ts
│   │       ├── users.module.ts
│   │       ├── users.resolver.ts
│   │       └── users.service.ts
│   ├── schema.gql
│   └── utils
│       └── bcrypt.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock


```

Project folder has some folders:

- config - for configuration files database
- modules - contains the auth, user and registered-times
- utils - contains file to encode password

### Technologies

The following tools were used in building the project:

- [NestJs](https://nestjs.com/) - The framework NestJs used
- [TypeScript](https://www.typescriptlang.org/) - The TypeScript used
- [TypeOrm](https://typeorm.io/) - The TypeOrm used
- [Postegres](https://www.postgresql.org/) - The database Postegres used
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - The cryptography Bcrypt used
- [Jwt](https://jwt.io/) - The JSON Web Tokens used
- [GraphQL](https://graphql.org/) - The GraphQL used
- [Docker](https://www.docker.com/) - The Docker used
