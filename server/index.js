const express = require('express')
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config()
const cors = require('cors')
const authRoute = require('./routes/auth')
const listingRoutes = require("./routes/listing")
const bookingRoutes = require("./routes/booking")
const userRoutes = require("./routes/user")


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth",authRoute);
app.use("/properties",listingRoutes)
app.use("/bookings",bookingRoutes)
app.use("/users",userRoutes)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
   console.log('database connected')
}

app.listen(3001, () => {
    console.log('server started');
  });

// const PORT = 3001;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     dbName: "Homify",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((err) => console.log(`${err} did not connect`));