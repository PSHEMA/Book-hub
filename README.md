# **Book Hub: A React Discovery App**

Book Hub is a web application designed to help users discover books. It features a user-friendly interface for browsing, searching, and filtering books by genre, author, publication date, and rating. The app is built with **React** and **TypeScript** for the frontend and **Node.js** with **Express** for the backend, using **MySQL** as the database.

---

## **Features**
- **Browse Books**: View a list of books with details like title, author, genre, and rating.
- **Search**: Search for books by title or author.
- **Filter**: Filter books by genre and minimum rating.
- **Pagination**: Navigate through large sets of book listings.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.

---

## **Technologies Used**
### **Frontend**
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for better code quality.
- **Material-UI**: A popular React UI framework for polished and responsive designs.
- **Axios**: For making HTTP requests to the backend API.

### **Backend**
- **Node.js**: A JavaScript runtime for building the backend.
- **Express**: A web framework for Node.js.
- **MySQL**: A relational database for storing book data.
- **CORS**: Middleware to enable cross-origin requests.

### **Deployment**
- **Render**: Hosting platform for the backend.
- **Vercel**: Hosting platform for the frontend.

---

## **Getting Started**
Follow these steps to set up the project locally.

### **Prerequisites**
- **Node.js**: Install from [nodejs.org](https://nodejs.org/).
- **MySQL**: Install from [mysql.com](https://www.mysql.com/).
- **Git**: Install from [git-scm.com](https://git-scm.com/).

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/PSHEMA/Book-hub.git
   cd book-hub/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the MySQL database:
   - Create a database named `bookhub`.
   - Run the following SQL query to create the `books` table:
     ```sql
     CREATE TABLE books (
         id INT AUTO_INCREMENT PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         author VARCHAR(255) NOT NULL,
         genre VARCHAR(100) NOT NULL,
         publicationDate DATE NOT NULL,
         rating FLOAT
     );
     ```
4. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=bookhub
   PORT=5000
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following environment variable:
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## **Deployment**
### **Backend**
- Deployed on **Render**: [https://book-hub-backend.onrender.com](https://book-hub-backend.onrender.com)

### **Frontend**
- Deployed on **Vercel**: [https://book-hub-frontend.vercel.app](https://book-hub-frontend.vercel.app)

---

## **Project Structure**
```
book-hub/
├── backend/
│   ├── index.ts            # Backend server entry point
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types.ts        # TypeScript types
│   │   ├── App.tsx         # Main React component
│   │   └── main.tsx        # Frontend entry point
│   ├── package.json        # Frontend dependencies
│   └── .env                # Frontend environment variables
└── README.md               # Project documentation
```

---

## **Contributing**
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- **Vite**: For the fast and modern frontend build tool.
- **Material-UI**: For the beautiful and responsive UI components.
- **Render** and **Vercel**: For the free hosting services.

---

Enjoy using **Book Hub**! 📚✨