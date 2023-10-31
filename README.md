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
1. **User Registration and Profiles:** Users create accounts and profiles to access and manage their tasks.
2. **Task Creation and Organization:** Create tasks with titles, descriptions, due dates, priorities, and categories.
3. **To-Do Lists:** Create and manage to-do lists with individual tasks.
4. **Task Deadlines and Reminders:** Set due dates for tasks and receive reminders or notifications.
5. **Task Status Tracking:** Track task progress.
6. **Filters and Sorting:** Filter and sort tasks based on various criteria.
7. **Search Functionality:** Search for tasks using keywords, titles, or descriptions.
8. **Progress Reports:** Generate progress reports or summaries of completed tasks over a specific period.

## Running Environment
* Running platforms: Webapp to run in an internet browser (Edge or Chrome)
* Database requirements: PostgresSQL or Mongo DB
* Operating system compatibility: Windows, MacOS

## Project Development and Management Tools
* Scrum tool: Trello
* Version control tool: GitHub
* Programming IDEs: VS Code or IntelliJ
* Programming language: Java or JavaScript


# Notes for Developers
## Project Setup Instructions
### Set up the React App
1. Set up an initial React app using the following guide: https://create-react-app.dev/docs/getting-started
2. Pull down from the GitHub repository (https://github.com/itchygenji/personal-task-management-tool/tree/Test) and checkout the desired branch

### Installing the Dependencies
1. Run npm install to install any outstanding dependencies
2. Run npm install jwt-decode
3. Run npm install @react-oauth/google@latest

### Connecting the Mongo Database
Note: These instructions are for the IntelliJ IDE. For other IDEs, refer to MongoDB's documentation.
1. Go to File > New > Data Source > MongoDB
2. Change Connection type to URL only
3. In host, put the following value: mongodb+srv://cen6030:<password>@cluster0.u5ta70n.mongodb.net/
4. In the string above, replace <password> with the cen6030 password (posted in Discord)
6. Click Test Connection and ensure the test succeeds
7. Click OK
8. In the pop-up, set select MongoDB as the default SQL dialect

### Run the Application
1. In terminal, run npm start