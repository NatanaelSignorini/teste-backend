# teste-backend

## Description

```

```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
```

## Test

```bash
# unit tests
$ yarn run test
```

## Folder Structure

```
teste-backend-brainny
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── config
│   │   ├── database.module.ts
│   │   └── jwt.module.ts
│   ├── main.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.resolver.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── constants.ts
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
Server folder has some folders:
* config - for configuration files
* controllers - for controllers
* helpers - for helpers files like a class for Api Errors
* middlewares - for middlewares like validation, response...
* models - for models (king, knight, queen...)
* routes - for express routes

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [NestJs](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeOrm](https://typeorm.io/)
- [Postegres](https://www.postgresql.org/)




