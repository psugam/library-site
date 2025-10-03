const express= require('express');
const dotenv =require('dotenv');
const cors = require('cors')
const connectDB=require('../backend/database/connect')
// dotenv.config({ path: '../.env' });
dotenv.config();

//import routes
const listAll=require('./routes/books/listAll')
const addOne=require('./routes/books/addOne')
const deleteOne=require('./routes/books/deleteOne')
const editOne=require('./routes/books/editOne')
const genericSearch=require('./routes/books/genericSearch')
const getByID=require('./routes/books/getById')
const getOneBook=require('./routes/books/getOneBook')


const listAllUsers=require('./routes/users/listAllUsers')
const addOneUser=require('./routes/users/addOneUser')
const deleteOneUser=require('./routes/users/deleteOneUser')
const editOneUser=require('./routes/users/editOneUser')
const loginUser=require('./routes/users/loginUser')


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send(`Hello. The port is ${port}`)
})


async function  startServer(){
  // console.log(process.env.MY_USERNAME)
  // console.log(process.env.MY_PASSWORD)
  // console.log(process.env.PORT)
   try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    //books
    app.use("/api/books",listAll);
    // app.use('/api', editOne);
    app.use('/api/books', deleteOne);
    app.use('/api/books', addOne);
    app.use('/api/books', editOne)
    app.use('/api/books', genericSearch);
    app.use('/api/books', getByID)
    app.use('/api/books', getOneBook);


    //users
    app.use('/api/users', listAllUsers);
    app.use('/api/users', addOneUser);
    app.use('/api/users', deleteOneUser);
    app.use('/api/users', editOneUser);
    app.use('/api/users', loginUser)
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();