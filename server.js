const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const userRoute = require("./routes/user.route");
const courseRoute = require("./routes/course.route");
const topicRoute = require("./routes/topic.route");
const submissionRoute = require("./routes/submission.route");
const resourceRoute = require("./routes/resource.route");
const { default: mongoose } = require("mongoose");

const app = express();

const httpServer = require('http').createServer(express);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

//Load config...
dotenv.config({ path: "./config/config.env" });

connectDB();



// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// morgan is a middleware

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/videos", express.static(path.join("videos")));

// app.use(cors);
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
   );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PUT, DELETE, PATCH, PUT, OPTIONS'
  );
  next();
});

// RESTful API root
app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/topic", topicRoute);
app.use("/submission", submissionRoute);
app.use("/resource", resourceRoute);

const port = 3001;

  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('message', (message) => {
      console.log('socket io',message);
      io.emit('message', `${message}`);
    });
  
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });

  httpServer.listen(port, () => console.log(`listening on port ${port}`));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);




