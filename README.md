This project is a single page application that was built for users to follow advertised vacations, and for admin to advertise.
Any user who logs in can view vacations and tag them as 'follow', 
any vacation that will be modified by the admin will be changed in Real-Time on user vacations page.

infrastructure:
1. Server side - Nodejs express api
2. Dateabase - mySql.
3. Client side - reactjs, Typescript.

The following topics must be implemented in the project:
1. HTML + CSS
- HTML5 Structure
- React Material
2. React
- React middleware
- Container components / router etc ..
3. NodeJS
- Using express
- Restfull App
- Socket io
4. MySQL
- Design & create schema
- Queries

Managers and permissions:
There are 2 permissions in the system:
  - Manager - admin, responsible for the day-to-day management of the system, adding vacations, modifying and deleting
    Vacations.
  - User - login, registration.
    (After automatic registration the user can log in to the system and start working: tracking vacations, removing tracking from vacations(vacations that are tracked will apear       first on specific users vacation page))
