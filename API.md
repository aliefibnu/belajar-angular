# Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

atau

```json
{
  "success": true,
  "data": []
}
```

---

## Error

```json
{
  "success": false,
  "errors": "Error message"
}
```

---

# Endpoints

# 2. Get All Items

### GET /items

Mengambil seluruh data item.

### Request

```
GET /items
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "Asus Vivobook"
    },
    {
      "id": 2,
      "name": "Keyboard",
      "description": "Mechanical Keyboard"
    }
  ]
}
```

---

# 3. Get Item By ID

### GET /items/:id

Mengambil satu data berdasarkan ID.

### Request

```
GET /items/1
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "description": "Asus Vivobook"
  }
}
```

### Error Response

```json
{
  "success": false,
  "errors": "Item not found"
}
```

Status Code

```
404 Not Found
```

---

# 4. Create Item

### POST /items

Menambahkan item baru.

### Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "name": "Mouse",
  "description": "Wireless Mouse"
}
```

### Success Response

Status Code

```
201 Created
```

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Mouse",
    "description": "Wireless Mouse"
  }
}
```

### Error Response

```json
{
  "success": false,
  "errors": "Error message"
}
```

---

# 5. Update Item

### PUT /items/:id

Mengubah data item berdasarkan ID.

### Headers

```
Content-Type: application/json
```

### Request

```
PUT /items/1
```

### Body

```json
{
  "name": "Laptop Gaming",
  "description": "RTX 5070"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop Gaming",
    "description": "RTX 5070"
  }
}
```

### Error Response

```json
{
  "success": false,
  "errors": "Item not found"
}
```

Status Code

```
404 Not Found
```

---

# 6. Delete Item

### DELETE /items/:id

Menghapus item berdasarkan ID.

### Request

```
DELETE /items/1
```

### Success Response

```json
{
  "success": true,
  "data": "Item deleted successfully"
}
```

### Error Response

```json
{
  "success": false,
  "errors": "Item not found"
}
```

Status Code

```
404 Not Found
```

---

# HTTP Status Codes

| Status | Keterangan            |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 400    | Bad Request           |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

# Data Model

## Item

| Field       | Type    | Required | Description    |
| ----------- | ------- | -------- | -------------- |
| id          | Integer | Auto     | Primary Key    |
| name        | String  | Yes      | Nama item      |
| description | String  | Yes      | Deskripsi item |

---

# Example cURL

## Get All

```bash
curl /api/items
```

---

## Get By ID

```bash
curl /api/items/1
```

---

## Create

```bash
curl -X POST /api/items \
-H "Content-Type: application/json" \
-d '{
  "name":"Laptop",
  "description":"Asus Vivobook"
}'
```

---

## Update

```bash
curl -X PUT /api/items/1 \
-H "Content-Type: application/json" \
-d '{
  "name":"Laptop Gaming",
  "description":"RTX 5070"
}'
```

---

## Delete

```bash
curl -X DELETE /api/items/1
```
