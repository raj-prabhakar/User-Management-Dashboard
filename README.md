# User Management Panel

## Overview
This is a React-based front-end application that interacts with the [Reqres API](https://reqres.in/) to simulate basic user management tasks. The project is divided into three levels of complexity: authentication, listing users, and user management (edit/delete operations).

## Features
### Level 1: Authentication
- Users can log in using credentials.
- Uses the `POST /api/login` endpoint for authentication.
- Successful login stores the token and redirects to the user list page.

### Level 2: List All Users
- Displays a paginated list of users using the `GET /api/users?page=1` endpoint.
- Users' first name, last name, and avatar are displayed.
- Supports pagination or lazy loading.

### Level 3: Edit, Delete, and Update Users
- Edit user details using the `PUT /api/users/{id}` endpoint.
- Delete users from the list using the `DELETE /api/users/{id}` endpoint.
- Success and error messages are displayed appropriately.

## Tech Stack
- **React 19** for building UI components.
- **React Router** for navigation.
- **Axios** for making API requests.
- **Tailwind CSS** for styling.
- **ESLint** for code linting.
- **Vite** for a fast development server.

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended version: 18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/user-management-assignment.git
   cd user-management-assignment
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for Production**
   ```sh
   npm run build
   ```

5. **Run ESLint Check**
   ```sh
   npm run lint
   ```

## Project Structure
```
user-management-assignment/
│── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components (Login, User List, etc.)
│   ├── services/     # API calls
│   ├── styles/       # Tailwind and custom styles
│   ├── App.tsx       # Main application file
│   ├── main.tsx      # Entry point
│── public/           # Static assets
│── .eslintrc.json    # ESLint configuration
│── tailwind.config.js # Tailwind CSS configuration
│── package.json      # Project dependencies & scripts
│── README.md         # Project documentation
```

## Assumptions & Considerations
- The authentication token is stored in `localStorage`.
- Users are redirected to the login page if the token is missing.
- API errors are handled gracefully with messages.

## Bonus Implementations
✅ Client-side search and filtering in the user list.
✅ Navigation using React Router.
✅ Deployed on **[Live Demo](https://your-deployment-link.com)**
