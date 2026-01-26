# Guest API Spec

## Get Contact API

Endpoint : **GET** `/api/guest/contacts/:contactId`

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": {
        "id": "uuid",
        "fist_name": "Arief",
        "last_name": "Budiman",
        "email": "arief@test.com",
        "phone": "931381321"
    }
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

## Search Contact API

Endpoint : **POST** `/api/guest/contacts`

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : Number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "status": true,
    "statusCode": 200,
    "message": "Success",
    "data": [
        {
            "id": "uuid",
            "fist_name": "Arief",
            "last_name": "Budiman",
            "email": "arief@test.com",
            "phone": "931381321"
        },
        {
            "id": "uuid",
            "fist_name": "Dubi",
            "last_name": "Dubido",
            "email": "dubi@test.com",
            "phone": "931321121"
        }
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
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

## List Addresses API

Endpoint : **GET** `/api/guest/contacts/:contactId/addresses`

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
