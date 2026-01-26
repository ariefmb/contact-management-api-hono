# User API Spec

## Register User API

Endpoint : **POST** `/api/users`

Request Body :

```json
{
    "username": "ariefmb",
    "password": "secret",
    "name": "Dubiidooo"
}
```

Response Body Success :

```json
{
    "status": true,
    "statusCode": 201,
    "message": "Success",
    "data": {
        "id": "uuid",
        "username": "ariefmb",
        "name": "Dubiidooo"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Username already registered"
}
```

## Login User API

Endpoint : **POST** `/api/users/login`

Request Body :

```json
{
    "username": "ariefmb",
    "password": "secret"
}
```

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "user": {
            "id": "uuid",
            "usernamne": "ariefmb",
            "name": "Dubiidooo"
        },
        "accessToken": "unique-access-token",
        "refreshToken": "unique-refresh-token"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Username or Password wrong"
}
```

## Refresh Token API

Endpoint : **POST** `/api/users/current/refresh`

Request Body :

```json
{
    "refreshToken": "unique-refresh-token"
}
```

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "accessToken": "unique-access-token",
        "refreshToken": "unique-refresh-token"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Refresh token wrong"
}
```

## Update User API

Endpoint : **PATCH** `/api/users/current/update`

Headers :

- Authorization : `accessToken`

Request Body :

```json
{
    "username": "new username", //optional
    "name": "new name", //optional
    "password": "new password" //optional
}
```

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "id": "uuid",
        "username": "new username",
        "name": "new name"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Name length max 100"
}
```

## Get User API

Endpoint : **GET** `/api/users/current`

Headers :

- Authorization : `accessToken`

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "id": "uuid",
        "username": "ariefmb",
        "name": "Dubiidooo"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Unauthorized"
}
```

## Logout User API

Endpoint : **POST** `/api/users/logout`

Headers :

- Authorization : `accessToken`

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success log out"
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Unauthorized"
}
```
