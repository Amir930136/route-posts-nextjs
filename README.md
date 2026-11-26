# Route Posts — Next.js + React

A responsive posts application based on the requirements in the supplied assignment screenshot.

## Features
- Sign up and log in
- Home page with all posts and search
- Post details and comments
- User profile and profile-name editing
- Create, edit and delete your own posts
- Add, edit and delete your own comments
- Change password
- Bootstrap responsive layout

## Requirements
- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm

## Run the project
1. Extract the ZIP file.
2. Open the extracted folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open http://localhost:3000

## Notes
This is a front-end learning/demo implementation. Data is stored in the browser's `localStorage`, so it persists in the same browser but is not shared between devices or users. Passwords are stored in plain text in localStorage. Do not use this authentication approach for a real application. For production, add a backend/database, password hashing, secure sessions, validation, and authorization on the server.

The sample feed appears on first launch. Create an account to publish and manage your own posts and comments.
