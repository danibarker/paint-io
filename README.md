# paint-io

## What This Project Does
paint-io is a collaborative, full-stack paint application built for a hackathon. It allows multiple users to simultaneously draw on a shared canvas, with features like color selection, brush size adjustment, and a gallery for saving artwork. The application utilizes Node.js, Firebase, and React for its development.

## Tech Stack
*   JavaScript
*   Node.js
*   Express.js
*   React
*   Socket.IO
*   Firebase (Firestore, Functions)
*   MongoDB

## Project Structure
The project is organized into two main directories: `back-end` and `front-end`. The `back-end` directory contains the Node.js server using Express.js and Socket.IO for real-time communication. The `front-end` directory houses the React application for the user interface. Supporting files include `.env` and `.env.example` for environment variables, `package.json` for dependencies, and configuration files for Firebase and the front-end build process.

## Getting Started
To run this project locally:

1.  Copy `.env.example` and rename it to `.env`, replacing the placeholder values with your own.
2.  Ensure you have Node.js installed (version 21 or higher is recommended).
3.  Navigate to the root directory in your terminal.
4.  Run `npm install` to install dependencies.
5.  Start the development server: `npm run dev-server` and `npm run dev-client`.

## Status
Active

## Notes
This project was created during a hackathon and relies on Firebase services for backend functionality. The `capture.pcap` file likely contains network traffic data from the application. The project uses a Git repository hosted on GitHub for version control.
