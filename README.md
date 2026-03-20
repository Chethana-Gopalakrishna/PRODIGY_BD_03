# PRODIGY_BD_03

## Description
This project is a Node.js REST API implementing **user registration, login, authentication, and role-based access control**. Passwords are securely hashed using **bcrypt**, and JSON Web Tokens (**JWT**) are used to authenticate users. Certain routes (e.g., `/users`, `/profile`) are protected and accessible only to authenticated users with appropriate roles, such as `admin` or `user`.  

The API uses **MySQL** as a database for persistent storage, managed via **Prisma ORM**.

---

## Features
- User registration with hashed passwords
- User login with JWT generation
- Role-based access control (e.g., `admin`, `user`)
- Protected routes requiring authentication
- Persistent storage in MySQL
- Input validation for user data

---

## Tech Stack
- **Node.js** & **Express** – Backend server
- **MySQL** – Relational database
- **Prisma** – ORM for database interactions
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Authentication and authorization
- **dotenv** – Environment variable management

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Chethana-Gopalakrishna/PRODIGY_BD_03.git
cd PRODIGY_BD_03

2.Install Dependencies:
npm install

3.Create a .env file in the root directory with:
PORT=3000
DATABASE_URL="mysql://root:YOUR_PASSWORD@127.0.0.1:3306/user_db"
JWT_SECRET="your_super_secret_key"
Replace YOUR_PASSWORD with your MySQL root password.

4.Generate Prisma client:
npx prisma generate

5.Run database migrations:
npx prisma migrate dev --name init

6.Start the server:
 node index.js
Server should now be running at http://localhost:3000.

API Endpoints

Register User
POST /register

Body Example:
{
  "name": "Eve",
  "email": "eve@gmail.com",
  "password": "supersecretpassword",
  "age": 28,
  "role": "admin"
}
Login User
Post/login

Body:
{
   "email":"eve@gmail.com",
   "password":"supersecretpassword"
}
Response:
{
    "token":"JWT_TOKEN_HERE"
}

Protected Route Example:

GET/users

⁕Requires Authorization: Bearer JWT_TOKEN_HERE header
⁕Only accessible by authenticated users with the proper role

