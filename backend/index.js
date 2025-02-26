const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./config").default;

const app = express();
// const port = 3000; // กำหนดพอร์ตที่ใช้
// const server = http.createServer(app);
const http = require("http");
const server = http.createServer(app);

// ตั้งค่า CORS
const corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:5173"], // URL ของ Frontend
  methods: ["GET", "POST"],
  credentials: true, // อนุญาตให้ส่ง Cookies
};
app.use(cors(corsOptions));

// ตั้งค่า Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static("uploads"));

// ตั้งค่า Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("CH01", (msg) => {
    socket.broadcast.emit("info", msg);
  });
});

// Routes
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

// Root Route
app.get("/", (req, res) => {
  res.send("CORS updated to allow localhost:3000");
});

// Start Server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
