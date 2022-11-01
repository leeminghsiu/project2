import { response } from "express";
import { MongoClient } from "mongodb";

export function MyMongoDB() {
    const myDB = {};
    const uri_online = "mongodb+srv://iamcool:iamcool@cluster0.om73ot8.mongodb.net/?retryWrites=true&w=majority";
    // const uri_local = "mongodb://localhost:27017/CS5610project2";
    const client = new MongoClient(uri_online || uri_local);
    // const client = new MongoClient(uri_local);
    client.connect(
    //   err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // }
    );
    const DB_name = "CS5610project2";
    const COLLECTION_NAME = "users";
    const COLLECTION_NAME1 = "cart";
    //建立以便在client.js里面用
    const db = client.db(DB_name)
    const userCollection = db.collection(COLLECTION_NAME);
    const cartCollection = db.collection(COLLECTION_NAME1);

    //下面这个function是用来验证密码是否正确，已经链接database
    myDB.authenticate = async (user) => {
      console.log("searching for", user)
      const res = await userCollection.findOne({user: user.user});
      console.log("response", res)
      if ((res === null) || (res.password !== user.password)) return false
      return true
    };

    //below is the funtion for add user's signin info
    myDB.addUser = (user)=>{
      userCollection.insertOne(user);
    }

    // ****************************** misho:1
    // 用來把餐點加入 cartCollection (購物籃)
    myDB.addDish = (dish)=>{
      console.log('myDB.addDish : ', dish);
      cartCollection.insertOne(dish);
    }
    // ##############################

    // myDB.findDish = (dish)=>{
    //   cartCollection.findOne({dish});
    // }

    //**************************** */ 
    //This is a function to delete the db from datebase cart collection, connect with route.js 
    myDB.deleteCart = ()=>{
      cartCollection.deleteMany({});
    }
    //###############################  1 Gaoxiang


    //**************************** */ 
    //This is a function for route to response fetch in cart/user
    myDB.findCart = async() =>{
      console.log('myDB.findDish : ');
      const result = await cartCollection.find({}).toArray();
      console.log('sucessful find');
      console.log(result);
      return result
    }
    //###############################  2 Gaoxiang

    //This is a function for route to response fetch in cart/user
    myDB.findUser = async(user) =>{
      console.log('myDB.findUser : ');
      const result = await userCollection.find({"user":user}).toArray();
      console.log('sucessful find');
      console.log(result);
      return result
    }

    //###############################  2 Gaoxiang




    return myDB;
  }

  export default MyMongoDB();
  