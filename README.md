# task-manager
> Built authenticated endpoints for this task manager app that allow users to create accounts, generate tokens to log in using jwt, upload avatar, and create tasks. Users can also perform other CRUD operations like read, update and delete. 

### Deployment for testing 🚀
> [Heroku](https://roland-task-manager.herokuapp.com)

### Screenshot 📷
The endpoints can be tested on POSTMAN using heroku deployment url above. 
![image](https://user-images.githubusercontent.com/63131597/182714611-aa4e896d-9461-448d-8b4b-da5031f3a854.png)

### Built With
- JavaScript
- node.js
- express.js
- mongoDB & mongoose ODM
- multer
- bcrypt
- jwt
- nodemon

### Workdone 🔧
- [x] Create user
- [x] Login user (authenticated route)
- [x] Logout user (authenticated route)
- [x] Logout all users
- [x] Create a task (authenticated route)
- [x] Upload profile image (authenticated route)
- [x] Read profile image (authenticated route)
- [x] Read all users
- [x] Read profile (authenticated route)
- [x] Read user (authenticated route)
- [x] Read all tasks
- [x] Read tasks created by specific user id (authenticated route)
- [x] read a task (authenticated route)
- [x] Update user details (authenticated route)
- [x] Update task information (authenticated route)
- [x] Delete a user (authenticated route)
- [x] Delete profile image (authenticated route)
- [x] Delete a task (authenticated route)

### Testing guide
POSTMAN: 
- Copy the task-manager heroku deployment url to POSTMAN environment
- Test all endpoints (Endpoints for Users and Tasks are available in the routes folder)
- When creating or updating a user/task, you need to provide a body (Checkout out User & Task model schema for the necessary details)
- You need to be authenticated to perfrom the CRUD operations

## Author
👤 **Orobola Roland Ogundipe**
> I am open to us collaborating together on a project😇
- GitHub: [@Roland](https://github.com/rolandexplore93)
- LinkedIn: [@Roland](https://www.linkedin.com/in/roland-orobola/)

## Encouragement
Give a ⭐️ if you like this project!

## 📝 License
This project is [MIT](./MIT.md) licensed
