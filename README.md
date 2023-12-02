# Project Overview

## Project Background
This software is designed to assist individuals in organizing, tracking, and managing their tasks, to-do lists, and responsibilities effectively and efficiently. It also has the capability to generate progress reports or summaries of completed tasks over a specified period.

## Stakeholders
* Product Owner: Dr. Zang
* Scrum Master: Jean Bonefont
* Developers: Ayden Craig, Jordan Ruocco, Emily Hightower
* Users: Career professionals, Students, Team Managers, Educators

## Assumptions
* Users have Internet access
* Users have the ability to enter data
* Users will be using the product regularly
* Security of program will not be a major focus as it is outside the scope of the project

## Scope of Work to Complete

### Features to be Developed
1. **User Registration and Profiles:** Users create accounts and profiles to access and manage their tasks. When you first sign on with a Google email, you will be prompted to create a profile. This profile can later be viewed or edited on the profile page.
2. **Task Creation and Organization:** Create tasks with titles, descriptions, due dates, priorities, and categories. You can modify tasks, add them to lists, mark them as complete, or cancel them during creation.
3. **User Login and Profile Management:** Once a profile is created with an email address, it will not prompt you to make a new profile when logging in again. Users can log out from any page of the application.
4. **To-Do Lists:** Create and manage to-do lists with individual tasks.
5. **Task Deadlines and Reminders:** Set due dates for tasks and receive reminders or notifications.
6. **Task Status Tracking:** Track task progress and mark tasks as completed.
7. **Filters and Sorting:** Filter and sort tasks based on various criteria.
8. **Search Functionality:** Search for tasks using keywords, titles, or descriptions.
9. **Progress Reports:** Generate progress reports or summaries of completed tasks over a specific period.

## Running Environment
* Running platforms: Webapp to run in an internet browser (Edge or Chrome)
* Database requirements: Mongo DB
* Operating system compatibility: Windows, MacOS

## Project Development and Management Tools
* Scrum tool: Trello
* Version control tool: GitHub
* Programming IDEs: VS Code or IntelliJ
* Programming language: Java or JavaScript

## How to Run the Project
This section provides instructions on how to set up and run the project, which includes a Spring-based server-side, a React front-end, and an automated MongoDB connection.

### Prerequisites
* Java Development Kit (JDK) for running the Spring server.
* Node.js, which includes npm (Node package manager), necessary for the React application.
* Yarn package manager for managing front-end dependencies.
* Visual Studio Code or any preferred IDE that supports Java and JavaScript/TypeScript.
* A modern web browser like Chrome or Edge.

### MongoDB Configuration
* The project is configured to automatically connect to MongoDB. No manual setup or local MongoDB instance is required.
* Connection details and configurations are specified in the `application.properties` file in the Spring application.

### Backend Setup (Spring)
1. Clone the repository from GitHub.
2. Open the cloned repository in Visual Studio Code or your chosen IDE.
3. Navigate to the backend project directory: `CEN6030/personal-task-management-tool/backend/task-manager-backend`.
4. Locate the main application file: `src/main/java/com/cen6030/taskmanagerbackend/TaskManagerBackendApplication.java`.
5. Ensure the JDK is correctly set up and recognized by your IDE.
6. Resolve any missing or required dependencies for the Spring application, typically through the IDE’s dependency management tool.

### Frontend Setup (React)
1. Open a terminal or command prompt.
2. Navigate to the main project directory: `CEN6030/personal-task-management-tool`.
3. Run `npm install` or `yarn install` to install all dependencies listed in the `package.json` file.
4. Start the React application by running `yarn start` or `npm start`.
5. Your default web browser should automatically open `http://localhost:3000` (or the configured port) and load the front-end of the application.

### Running the Application
1. Start the backend Spring server by running the `TaskManagerBackendApplication.java` file in your IDE.
2. With the backend server running, launch the React application as outlined in the Frontend Setup section.
3. You can now interact with the full application through your web browser.

### Additional Notes
* Ensure both the backend server and the frontend application are running concurrently for full functionality.
* For detailed information about features and their usage, refer to the 'Features to be Developed' section.
