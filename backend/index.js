const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config").default;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// ingadd
app.set("port", 3000);
const port = app.get("port")
app.get("/", function (req, res) {
  res.send("hello world");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  socket.on("CH01", function (msg) {
    socket.broadcast.emit("info", msg);
  });
});

const doctorRouter = require("./routes/doctor");
const patientsRouter = require("./routes/patients");
const formulaRouter = require("./routes/formula");
const appointmentRouter = require("./routes/appointment");
const bloodResultRouter = require("./routes/bloodresult");
const feedbackRouter = require("./routes/feedback");
const userRouter = require("./routes/user");
const chatbotRouter = require("./routes/chatbot");

app.use(chatbotRouter.router);
app.use(doctorRouter.router);
app.use(patientsRouter.router);
app.use(formulaRouter.router);
app.use(appointmentRouter.router);
app.use(bloodResultRouter.router);
app.use(feedbackRouter.router);
app.use(userRouter.router);
app.use(express.static("uploads"));
//app.use(ocrRouter.router)

// server.listen(3000, function () {
//     console.log('Example app listening on port 3000')
// })

// ingadd
app.listen(port, function () {
  console.log(`Server is running on port ${port}`)
});