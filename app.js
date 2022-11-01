import express from "express";
import bodyParser from "body-parser";
import router,{ PORT } from "./routes/routes.js";
import session from 'express-session'


const app = express();

//这是为了登陆完成后一直保留在网页里
app.use(session({ secret: 'Jimmy Loves Web', cookie:{ maxAge: 60000}}));
//这里是copy的，应该是用来解码url/json里面的客户端输入信息，给到服务端
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(router);

app.use(express.static("frontend"));

app.listen(PORT, ()=> {
  console.log(`Listening for connections on port ${PORT}`);
});


 