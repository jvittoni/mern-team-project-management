# Team Project Management

This is a comprehensive team project management application designed to streamline collaboration and task management. Users can create and join workspaces, manage projects and tasks, and work effectively with team members. The app features a responsive design, role-based access control, interactive calendar views, and data-driven insights, enabling teams to stay organized, productive, and informed.


## Features

**Authentication**
- User signup and login with secure password handling
- Option to sign up or log in using **Google authentication** or personal email
- Authentication powered by **Passport.js** (Local & Google OAuth)


**Workspaces**
- Create workspaces to organize projects and tasks
- Invite users to join your workspace 
- Join workspaces via invitation from other users 


**Projects**
- Create and manage projects within workspaces 
- Create tasks for projects
- Assign team members to tasks associated with a project
- Project analytics with Recharts to visualize trends
- CRUD operations on projects 


**Tasks**
- Create, assign, and manage tasks within projects 
- Set deadlines, status, and priorities for tasks 
- View tasks in interactive calendar with month, week, and day views 
- Filter tasks by status, priority, due date, assignee, and project
- Task analytics with Recharts to visualize progress
- CRUD operations on tasks 


**User Management**
- Edit user profile settings, including name, email, and password 
- Role-based permissions: Owner, Admin, and Member with fine-grained access control 


**Analytics**
- Project and task analytics using Recharts 
- Charts show task priorites, task status, task and priority creation trends, and the number of projects created by each member
- Data displayed in pie, bar, and line charts


**UI & Design**
- Fully responsive design for desktops, tablets, and mobile devices 
- Clean, user-friendly interface for efficient navigation and application use


<br />


## Frontend
- **Framework**: React 18
- **Routing**: React Router DOM
- **State Management**: Zustand & React Query
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI, Tailwind CSS, Tailwind Animations
- **Calendar**: FullCalendar for day, week, and month views
- **Charts**: Recharts for project and task analytics
- **Other Libraries**: Axios for API calls, Lucide-react for icons, date-fns for date manipulation, Emoji support with Emoji Mart


<br />


## Backend
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose
- **Authentication**: Passport.js (Local & Google OAuth)
- **Session Management**: express-session
- **Security**: bcrypt for password hashing
- **Validation**: Zod for schema validation
- **Utilities**: UUID for unique identifiers, dotenv for environment variables
- **Development**: TypeScript with ts-node-dev