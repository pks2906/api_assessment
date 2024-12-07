# *SDE API Round - IRCTC*

A RESTful API for managing a railway reservation system, allowing users to check train availability, book seats, and retrieve booking details. The system supports admin operations like adding trains and managing train data.

---

## *Features*
- *User Authentication*: Register and log in as a user or admin.
- *Admin Operations*: Add trains, manage total and available seats (protected by API key).
- *User Operations*:
  - View available trains between two stations.
  - Book seats on available trains.
  - Retrieve booking details for a specific booking.
- *Concurrency Handling*: Prevents overbooking by handling race conditions using transactions.

---

## *Tech Stack*
- *Backend Framework*: Node.js with Express.js
- *Database*: PostgreSQL/MySQL (via Prisma ORM)
- *Authentication*: JWT for user authentication, API key for admin operations
- *Language*: TypeScript

---

## *Prerequisites*
1. *Node.js*: v16 or higher
2. *Database*: PostgreSQL/MySQL
3. *Package Manager*: npm or yarn
4. *Environment Variables*:
   Create a .env file in the project root with the following variables:
   env
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   ADMIN_API_KEY=your-admin-api-key
   

---

## *Setup and Installation*

1. Clone the repository:
   bash
   git clone https://github.com/pks2906/api_assessment
   cd railway-management-system
   

2. Install dependencies:
   bash
   npm install
   

3. Set up the database:
   - Update the DATABASE_URL in the .env file.
   - Run Prisma migrations:
     bash
     npx prisma migrate dev --name init
     

4. Start the server:
   bash
   npm run dev
   

   The server will run at http://localhost:3003 by default.

---

## *API Endpoints*

### *Authentication*
- *POST* /api/auth/register: Register a user.
  json
  {
    "name": "Pratik",
    "email": "pratik@email.com",
    "password": "pratikkapassowrd",
    "role": "USER"
  }
  
- *POST* /api/auth/login: Log in to receive a JWT.
  json
  {
    "email": "pratik@email.com",
    "password": "pratikkapassowrd"
  }
  

---

### *Admin Operations*
- *POST* /api/admin/train: Add a new train (requires API key).
  json
  {
    "name": "GaribRath",
    "source": "Patna",
    "destination": "Danapur",
    "totalSeats": 100
  }
  

---

### *User Operations*
- *GET* /api/user/trains?source=Station A&destination=Station B: View trains between two stations.
- *POST* /api/user/book: Book a seat on a train (requires JWT).
  json
  {
    "trainId": 1,
    "userId": 1
  }
  
- *GET* /api/user/booking/:id: Retrieve booking details for a specific booking (requires JWT).

---

## *Database Schema*

### *Prisma Models*
prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  bookings  Booking[]
}

model Train {
  id           Int      @id @default(autoincrement())
  name         String
  source       String
  destination  String
  totalSeats   Int
  availableSeats Int     @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  bookings     Booking[]
}

model Booking {
  id          Int      @id @default(autoincrement())
  trainId     Int
  userId      Int
  seatNumber  Int
  status      BookingStatus @default(PENDING)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
  train       Train    @relation(fields: [trainId], references: [id])
}

enum Role {
  ADMIN
  USER
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
}


---

## *Testing the API*

### *Using Postman or cURL*
1. Import the API endpoints into Postman.
2. Set up authorization headers for protected routes:
   - *Admin API Key*:
     json
     {
       "x-api-key": "your-admin-api-key"
     }
     
   - *User JWT*:
     json
     {
       "Authorization": "Bearer your.jwt.token"
     }
     

---

## *Response Screenshot*
![image](https://github.com/user-attachments/assets/ce28bf04-a332-4a55-af96-a2b455c9b3f4)

![image](https://github.com/user-attachments/assets/85cd51c4-b4a7-489f-94af-52cd7b85612c)

![image](https://github.com/user-attachments/assets/bca5454f-d751-43d8-9c01-8b7e34c002ae)

![image](https://github.com/user-attachments/assets/3cb2efd4-7b40-4242-bb91-278f6d7b1783)

![image](https://github.com/user-attachments/assets/86928ebe-1724-4f27-a7f9-cfaf56b2cc94)

![image](https://github.com/user-attachments/assets/843c512d-ea51-43db-a731-30d3a202b1b2)





---


