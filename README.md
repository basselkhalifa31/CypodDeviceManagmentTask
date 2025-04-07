#  Smart Sensor Dashboard

A full-stack IoT dashboard for monitoring and managing smart sensor devices. This project allows operators and admins to:

- View and interact with a list of smart sensors
- See temperature, humidity, and total power consumption
- Analyze monthly power consumption with dynamic charts
- Visualize all device locations on an interactive map
- Authenticate users and restrict access based on roles (admin/operator)

This dashboard provides a clean UI and smooth UX built with React and Material UI on the frontend, and Node.js with Express on the backend.
The authentication system is implemented using JWT, and the token is stored with a validity of 1 hour.

## Tech Stack

- **Frontend:** React, Material UI, React Router, Recharts, Leaflet
- **Backend:** Node.js, Express, JWT Authentication
- **Testing:** Jest, Supertest (for backend unit tests)

## Auth Roles
Admin: Full access to all pages and features.

Opertor: Can not view the device details page for each device.

## Design patterns and Architecture
### Backend: 

- MVC Pattern (Model-View-Controller)
- Middleware Pattern

### Frontend:

- Component-Based Architecture
- Container-Presenter (Smart-Dumb) Pattern


## Getting Started

### Clone the Repository

bash: git clone https://github.com/basselkhalifa31/CypodDeviceManagmentTask.git

then open the folder project using any IDE

## To run the backend

bash: cd backend

bash: npm install

(if there is an error happened called  File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.then use the following command
bash: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass)

bash: cd src

bash: node app.js

The backend runs on port 3030

## To run the test cases in the backend

bash: cd src

bash: npx jest

## To run the frontend 

open a new terminal

bash: cd frontend

bash: npm install

bash: cd src

bash: npm start

The frontend runs on http://localhost:3000

## login credentials

- username:admin1   password:admin123
  
- username:operator1   password:operator123

  
