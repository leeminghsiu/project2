import express from "express";
import  MyMongoDB from "../db/MyMongoDB.js";

//另一种方法尝试导入html文件，参考文轩解码,最终成功并使用

// 这里既可以在app.js文件里面也可以在router/index.js里面。 放这里就要export
export const PORT = process.env.PORT || 3000;

const router = express.Router();

router.post("/login", async (req, res) => {
    const user = req.body;
    console.log("POST login", user);

  // TODO check that we got the correct info
  if (await MyMongoDB.authenticate(user)) {
      //下面这一行是为了session
      req.session.user = user.user; 
      res.redirect("/vip.html?msg='authenticated'");
    } else {
      res.redirect("/login.html?msg='error authenticated'");
    }
  });

//TODO record the info of new client 记录新客户的用户名和密ma
router.post("/signIn", async (req, res, ) => {
  const user = req.body;   // { user: 'xxx', password: 'yyy' }
  console.log("POST SignIn", user);
  if (user.password === user.password2){
    MyMongoDB.addUser({
    "user": user.user, 
    "password": user.password, 
    "eatgarlic":user.eatgarlic,
    "eatginger":user.eatginger,
    "spicyaccept": user.spicyaccept
  });
  }
})

// ******************** misho:1
// 菜單
const menu = new Map([
  [1, 'food one'],
  [2, 'food two'],
  [3, 'food three'],
  [4, 'food four'],
  [5, 'food five'],
  [6, 'food six'],
  [7, 'food seven'],
  [8, 'food eight'],
  [9, 'food nine'],
  [10, 'food ten'],
]);
console.log(`menu.get: ${menu.get(1)}`); 
// ####################



// ********************************* misho 1
// 按點餐鈕後觸發此 router
// 用 ‘dish number' & 上方的'menu' 提取餐點訊息
// 將餐點訊息加入cartCollection
router.post("/order", async (req, res) => {

  const object = req.body;  // { proNum (html form name): '2' (dish number)}
  // unpack object tutorial: https://dmitripavlutin.com/javascript-object-destructuring/
  const dish = object.proNum;
  const dishName = menu.get(Number(dish));
  console.log("POST Orders:", dish, dishName);
  MyMongoDB.addDish({dish, dishName});
})
// ###################################




//**************************** */ 
//This is for receive requriment from vip logout action, when receive the form action, 
//delete the db from datebase cart collection 
router.post("/logout", (req, res) =>{
  MyMongoDB.deleteCart();
});
//###############################  Gaoxiang 2
//这个会给我们发换一个Jsonfile 为了session


//**************************** */ 
//for render the cart page and vip page, response json to cart fetch
router.get("/getcart", async(req, res) =>{
  console.log("reqget")
  // const reqbody = req.body;
  const resFile = await MyMongoDB.findCart();
  console.log(resFile);
  res.json(resFile);
});
//###############################  Gaoxiang 3


//**************************** */ 
//for render the vip page, response json to user fetch
router.get("/getuser", async(req, res) =>{
  console.log("reqget")
  const reqbody = req.body;
  const username = req.body.user;
  const resFile = await MyMongoDB.findUser(username);
  console.log(resFile);
  res.json(resFile);
});
//###############################  Gaoxiang 4


//这个会给我们发换一个Jsonfile 为了session



router.get("/getUser", (req, res) =>{
  res.json({user: req.session.user});
});

export default router;