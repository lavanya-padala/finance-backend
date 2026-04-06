# Finance Data Processing & Access Control Backend

## Overview

This project is a backend system for a finance dashboard.
It allows users to manage financial records and view summary analytics based on their role.

The system includes:

* User management
* Financial records management
* Role-based access control (RBAC)
* Dashboard summary APIs

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## Authentication (Simplified for Testing)

Authentication is implemented using **JWT (JSON Web Token)**.

Note:

* Password is **not used** in this project.
* Users login using only their **email**.
* This is done to keep the focus on backend logic and RBAC.

### Login Flow:

1. User sends email
2. Server verifies user exists
3. JWT token is generated
4. Token is used for accessing protected APIs

---

## Roles & Permissions

| Role    | Permissions                                          |
| ------- | ---------------------------------------------------- |
| Viewer  | View records only                                    |
| Analyst | View records + summary                               |
| Admin   | Full access (create, update, delete users & records) |

---

## Features

### User Management

* Create user
* Update user
* Delete user (also deletes their records)

---

### Financial Records

* Create record (Admin only)
* Get records (All roles)
* Update record (Admin only)
* Delete record (Admin only)
* Filter by:

  * Type (income/expense)
  * Category
  * Date range

---

### Summary APIs

* Total income & expense
* Category-wise totals
* Monthly trends
* Weekly trends
* Recent activity

---

### Role-Based Access Control

* Implemented using middleware
* Each API checks user role before access

---

## API Routes

### Auth

* `POST /api/auth/login`

---

### Users

* `POST /api/users` → Create user 
* `PUT /api/users` → Update user 
* `DELETE /api/users` → Delete user 

---

### Records

* `POST /api/records` → Create record (Admin)
* `GET /api/records` → Get records (All)
* `PUT /api/records/:id` → Update record (Admin)
* `DELETE /api/records/:id` → Delete record (Admin)

---

### Summary

* `GET /api/summary/category`
* `GET /api/summary/monthly`
* `GET /api/summary/weekly`
* `GET /api/summary/recent`

---

## How to Run

1. Install dependencies:

```
npm install
```

2. Create `.env` file:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/finance_db or online mongodb atlas cluster
JWT_SECRET=your_secret_key
```

3. Start server:

```
node server.js
```

---

## How to Test APIs

### Step 1: Create a User

Use POST `/api/users`

### Step 2: Login

POST `/api/auth/login`

```
{
  "email": "admin@test.com"
}
```

### Step 3: Copy Token

### Step 4: Use in Header

```
Authorization: Bearer <your_token>
```

---


