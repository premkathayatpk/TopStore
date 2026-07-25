TopStore 🛒
A full-stack e-commerce web application built with the MERN stack, featuring product browsing, cart management, checkout with eSewa payment integration, order tracking, and an admin dashboard.
Features
Customer-facing

🔐 User registration & login (JWT-based auth with HTTP-only cookies, bcrypt password hashing)
🛍️ Browse products by category
🛒 Add to cart, update quantities, remove items, clear cart
💳 Checkout with eSewa payment gateway integration and payment verification
📦 View order history and order status
👤 Profile management with avatar upload
✉️ Contact/support message form

Admin panel

👑 Role-based access (Admin / User)
📦 Full product CRUD (create, update, delete, bulk delete) with image upload
📋 View and manage all orders, update order/payment status
👥 View and manage all registered users
💬 View and manage contact messages
Tech Stack
Frontend

React 19 + Vite
React Router DOM
Tailwind CSS
React Icons
crypto-js (used for eSewa payment signature generation)

Backend

Node.js + Express 5
MongoDB + Mongoose
JWT (jsonwebtoken) for authentication
Bcryptjs for password hashing
Multer for image uploads (stored locally under public/uploads)
Validator.js for input validation
@faker-js/faker (used for database seeding)
Project Structure
TopStore/

├── backend/

│   ├── src/

│   │   ├── config/        # Database connection

│   │   ├── controllers/   # Route logic (user, product, cart, order, message)

│   │   ├── middlewares/   # Auth middleware, Multer upload config

│   │   ├── models/        # Mongoose schemas (User, Product, Cart, Order, Message)

│   │   ├── routers/       # API route definitions

│   │   ├── scripts/       # DB seed script

│   │   ├── utils/         # JWT token generation

│   │   └── server.js      # App entry point

│   └── public/uploads/    # Uploaded avatar & product images

└── Frontend/

    └── src/

        ├── api/           # API request helpers

        ├── components/    # Reusable UI components (incl. admin, profile)

        ├── context/       # React context providers

        ├── data/          # Static/sample data

        ├── layouts/       # Page layouts

        ├── pages/         # App pages (user & admin)

        ├── routes/        # Route definitions

        └── App.jsx        # Root component
API Overview
User — /api/user | Method | Endpoint | Description | |--------|----------|-------------| | POST | /register | Register a new user (with avatar upload) | | POST | /login | Log in | | POST | /logout | Log out | | GET | /getMe | Get the logged-in user's profile | | GET | /getAllUsers | Get all users (admin) | | PUT | /updateUser/:id | Update a user (with avatar upload) | | DELETE | /deleteUser/:id | Delete a user |

Product — /api/product | Method | Endpoint | Description | |--------|----------|-------------| | GET | /getAll | Get all products | | GET | /get/:id | Get a single product | | POST | /create | Create a product (with image upload) | | PUT | /update/:id | Update a product (with image upload) | | DELETE | /delete/:id | Delete a product | | DELETE | /deleteAll | Delete all products |

Cart — /api/cart | Method | Endpoint | Description | |--------|----------|-------------| | POST | /add | Add an item to the cart | | GET | /get/:userId | Get a user's cart | | PUT | /update | Update item quantity | | DELETE | /remove | Remove an item from the cart | | DELETE | /clear/:userId | Clear the entire cart |

Order — /api/order | Method | Endpoint | Description | |--------|----------|-------------| | POST | /create | Create a pending order | | POST | /verifyPayment | Verify eSewa payment and finalize order | | GET | /getOrder/:userId | Get a user's orders | | GET | /getAllOrders | Get all orders (admin) | | PUT | /updateStatus/:orderId | Update order/payment status (admin) | | DELETE | /deleteOrder/:orderId | Delete an order |

Message — /api/message | Method | Endpoint | Description | |--------|----------|-------------| | POST | /send | Submit a contact message | | GET | /getAllMessages | Get all messages (admin) | | DELETE | /deleteMessage/:messageId | Delete a message |
Getting Started
Prerequisites
Node.js
A MongoDB database (local or Atlas)
1. Clone the repository
git clone https://github.com/premkathayatpk/TopStore.git

cd TopStore
2. Set up the backend
cd backend

npm install

Create a .env file in the backend folder with:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

Run the backend server:

npm run dev
3. Set up the frontend
cd ../Frontend

npm install

npm run dev

The frontend runs via Vite (default http://localhost:5173), and the backend listens on the PORT you configured (default 5000). CORS on the backend is currently set to allow http://localhost:5173 and http://localhost:5174.
How It Works
Users register with a name, email, password, phone, address, and profile image; passwords are hashed with bcrypt and JWTs are issued on login, stored in HTTP-only cookies.
Products are managed by admins (role: "Admin") via full CRUD endpoints, with images uploaded through Multer and served as static files.
Adding items to a cart, updating quantities, and checkout are handled through dedicated cart and order endpoints.
At checkout, an order is created with a transaction_uuid and paymentStatus: "pending", then verified against eSewa's payment response — the order is marked completed or failed based on the transaction status and amount match.
Admins can view all orders/users/messages and update order status through a dedicated admin dashboard in the frontend.
Author
Prem Kathayat

GitHub: @premkathayatpk
Portfolio: premkathayat.com.np
License
This project currently has no license specified.

