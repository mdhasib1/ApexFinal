const env = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./MiddleWare/errorMiddleware");
const NFTs = require("./Routes/NFTsRoutes");
// const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const ImageRoute = require('./Routes/ImageRoutes')
const abiRoute = require('./Routes/abiRoutes')
const User = require('./Routes/userRoute')
const totalCreator = require('./Routes/CreatorRoutes')
const Collection = require('./Routes/CollectionRoutes')
 
const path = require("path");

env.config()


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000","https://dragonsharenft.infura-ipfs.io"],
    credentials: true,
  })
);

// app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use("uploads", express.static("uploads"));


// Routes Middleware
app.use("/api/nfts", NFTs);
app.use("/api/uploads", ImageRoute);
app.use("/api/abi", abiRoute);
app.use("/api/users", User);
app.use("/api/creator", totalCreator);
app.use("/api/collection", Collection);


// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
