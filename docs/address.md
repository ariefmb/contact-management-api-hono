# Address API Spec

## Create Address API

Endpoint : **POST** `/api/contacts/:contactId/addresses/create`

Headers :

- Authorization : accessToken

Request Body :

```json
{
    "title": "Home Address",
    "street": "Jalan ABC",
    "city": "Kota DEF",
    "province": "Provisi GHI",
    "country": "Negara JKL",
    "postal_code": "12345"
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
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Country is required"
}
```

## Update Address API

Endpoint : **PUT** `/api/contacts/:contactId/addresses/:addressId/update`

Headers :

- Authorization : accessToken

Request Body :

```json
{
    "title": "Home Address", //optional
    "street": "Jalan ABC", //optional
    "city": "Kota DEF", //optional
    "province": "Provisi GHI", //optional
    "country": "Negara JKL", //optional
    "postal_code": "12345" //optional
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
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Country is required"
}
```

## Get Address API

Endpoint : **GET** `/api/contacts/:contactId/addresses/:addressId`

Headers :

- Authorization : accessToken

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "id": "uuid",
        "title": "Home Address",
        "street": "Jalan ABC",
        "city": "Kota DEF",
        "province": "Provisi GHI",
        "country": "Negara JKL",
        "postal_code": "12345"
    }
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Country is required"
}
```

## List Addresses API

Endpoint : **GET** `/api/contacts/:contactId/addresses`

Headers :

- Authorization : accessToken

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": [
        {
            "id": "uuid",
            "title": "Home Address",
            "street": "Jalan ABC",
            "city": "Kota DEF",
            "province": "Provisi GHI",
            "country": "Negara JKL",
            "postal_code": "12345"
        },
        {
            "id": "uuid",
            "title": "Work Address",
            "street": "Jalan ZYX",
            "city": "Kota WVU",
            "province": "Provisi TSR",
            "country": "Negara QPO",
            "postal_code": "98765"
        }
    ]
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Contact is not found"
}
```

## Remove Address API

Endpoint : **DELETE** `/api/contacts/:contactId/addresses/:addressId/remove`

Headers :

- Authorization : accessToken

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success remove address data",
}
```

Response Body Error :

```json
{
    "status": false,
    "statusCode": 4xx / 5xx,
    "message": "Address is not found"
}
```
