const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fs = require("fs");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_IP}:${process.env.DB_PORT}`;

let port = process.env.PORT || 8080;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({limit: '100mb'}));
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: uri,
      ttl: 3600000 / 1000,
    }),
    cookie: {
      maxAge: 3600000,
      sameSite: true,
      httpOnly: true,
      secure: false,
    },
  })
);

const checkAuth = (req, res, next) => {
  if (!req.session.username) {
    res.end();
  } else {
    next();
  }
};

app.get("/login", (req, res) => {
  if (req.session.username) {
    res.send({
      loggedIn: true,
      username: req.session.username,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let query = { username, password };
  console.log(query);
  const client = new MongoClient(uri);
  await client.connect();
  let user = await client.db("house").collection("users").findOne(query);
  if (user) {
    req.session.username = user.username;
    let JSONdata = JSON.stringify({
      status: "Authorized",
      username: user.username,
    });
    client.close();
    res.status(200).end(JSONdata);
  }
  let JSONdata = JSON.stringify({
    status: "Unauthorized",
    msg: "Username or password was wrong",
  });
  client.close();
  res.status(401).end(JSONdata);
});

app.post("/post", checkAuth, async (req, res) => {
  const {
    name,
    price,
    type,
    description,
    status,
    image,
    province,
    address,
    uid,
  } = req.body;

  // console.log(name, price, uid);
  const client = new MongoClient(uri);
  await client.connect();
  if (uid) {
    let path = [];
    let rootPath = `../${process.env.imgDir}/${uid}`;
    fs.rmdirSync(rootPath, { recursive: true });
    fs.mkdirSync(rootPath, { recursive: true });
    for (let i = 0; i < image.length; i++) {
      let imgUid = uuidv4();
      let base64Image = image[i].split(";base64,").pop();
      let imgPath = rootPath + `/${imgUid}.jpg`;
      path.push(imgPath);
      fs.writeFile(
        imgPath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(`jpg created`);
        }
      );
    }
    let query = {
      name,
      price,
      type,
      province,
      address,
      description,
      status,
      path,
    };
    console.log(query);
    let uuid = { uuid: uid };
    let result = await client.db("house").collection("data").findOne(uuid);
    if (result) {
      let newvalues = { $set: query };
      let err = await client
        .db("house")
        .collection("data")
        .updateOne(uuid, newvalues);
      // console.log("err",err);
      res.end();
    }
  } else {
    let uuid = uuidv4();
    let rootPath = `../${process.env.imgDir}/${uuid}`;
    let path = [];
    fs.mkdirSync(rootPath, { recursive: true });
    for (let i = 0; i < image.length; i++) {
      let imgUid = uuidv4();
      let base64Image = image[i].split(";base64,").pop();
      let imgPath = rootPath + `/${imgUid}.jpg`;
      path.push(imgPath);
      fs.writeFile(
        imgPath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(`jpg created`);
        }
      );
    }
    let query = {
      uuid,
      name,
      price,
      type,
      province,
      address,
      description,
      status,
      path,
    };
    let user = await client.db("house").collection("data").insertOne(query);
    res.end();
  }
});

app.post("/deletepost", checkAuth, async (req, res) => {
  const { uid } = req.body;
  console.log("delete", uid);
  const client = new MongoClient(uri);
  await client.connect();
  if (uid) {
    let uuid = { uuid: uid };
    let result = await client.db("house").collection("data").findOne(uuid);
    if (result) {
      let rootPath = `../${process.env.imgDir}/${uid}`;
      fs.rmdirSync(rootPath, { recursive: true });
      let err = await client.db("house").collection("data").deleteOne(result);
      res.end();
    }
  } else {
    res.end();
  }
});

app.post("/logout", checkAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.end();
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.end();
  });
});

app.get("/listpost", async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  let result = await client.db("house").collection("data").find().toArray();
  res.send(result);
});

app.post("/getbase64", async (req, res) => {
  const { path } = req.body;
  if( !path ){
    res.send();
  }
  else{
    let file = fs.readFileSync(path);
    res.send(file.toString("base64"));
  }
  
});

app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
