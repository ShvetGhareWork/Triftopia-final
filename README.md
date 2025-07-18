Deployed Link: https://triftopia-frontend.vercel.app/

🛍️ Triftopia
Triftopia is a modern e-commerce web application designed for buying and selling unique, vintage, and antique items. Built with the MERN stack, this platform provides an intuitive shopping experience for customers while allowing sellers to effortlessly list their curated collectibles.

📌 Project Overview
Triftopia aims to create a digital marketplace dedicated to rare and one-of-a-kind treasures. From antique decor to vintage fashion, users can browse, search, and purchase special finds through a clean and interactive interface.

⚙️ Tech Stack
MongoDB – NoSQL database for storing user, product, and order information.

Express.js – Backend web framework for building RESTful APIs.

React.js – Frontend library for crafting dynamic, component-based UIs.

Node.js – Runtime environment for executing server-side JavaScript.

✨ Key Features
🔒 User Authentication – Secure sign-up, login, and session management.

🛒 Product Listings – Browse through a collection of unique and antique items.

📦 Cart & Checkout – Add products to cart, manage items, and checkout.

📜 Order History – View past orders and transaction details.

📊 Admin Dashboard – Manage users, products, and orders.

📱 Responsive Design – Fully optimized for desktop, tablet, and mobile devices.

🚀 Getting Started
📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/ShvetGhareWork/Triftopia-final.git
cd Triftopia-final
Install dependencies for both client and server:

bash
Copy
Edit
cd client
npm install
cd ../server
npm install
Configure environment variables:

Create a .env file in the server directory and add the following:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the application:

bash
Copy
Edit
# In one terminal, start the backend:
cd server
npm run dev

# In another terminal, start the frontend:
cd client
npm start
The frontend will be served at http://localhost:3000 and the backend at http://localhost:5000.



