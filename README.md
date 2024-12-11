# Branch Messaging App

Branch Messaging App is a customer service system designed to streamline interactions between customers and agents. This web-based application enables customers to send inquiries and agents to manage and respond to messages efficiently.

---

## Features

### For Customers
- Submit a message with details like name, email, and message body.
- Messages are marked as **urgent** when they contain specific keywords.
- Simple and user-friendly form for communication.

### For Agents
- View unassigned messages with priority and timestamp sorting.
- Assign messages to themselves for handling.
- Respond to customer messages in a real-time chat interface.
- Efficient workflow for handling urgent and high-priority messages.

### Priority-Based Sorting
- Messages with **high priority** (e.g., marked as urgent) appear at the top.
- Messages sorted by **latest timestamp** within the same priority level.

---

## Tech Stack

### Frontend
- **React**: Used for creating a dynamic and responsive user interface.
- **Tailwind CSS**: For consistent and modern styling.
- **React Router**: Handles navigation between pages.

### Backend
- **Node.js**: JavaScript runtime for backend logic.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for managing customer and message data.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ayushgundecha/Messaging-Web-Application.git
   cd branch-messaging-app
   ```

2. Install dependencies for both frontend and backend:
   
   Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   
   Create a `.env` file in the backend folder with the following:
   ```env
   MONGO_URI=<Your MongoDB Connection String>
   PORT=8000
   ```

4. Start the application:
   
   Start the backend server:
   ```bash
   cd backend
   npm run start
   ```

   Start the frontend development server:
   ```bash
   cd frontend
   npm run start
   ```

5. Access the application:
   
   Open your browser and navigate to `http://localhost:3000`.

---

## Contributing

Contributions are welcome! If you'd like to improve the application or fix any issues, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Describe your changes here"
   ```
4. Push the changes to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or feedback, feel free to reach out:
- **Email**: [your-email@example.com](mailto:ayushgundecha123@gmail.com)
- **GitHub**: [Your GitHub Profile](https://github.com/ayushgundecha)

---

