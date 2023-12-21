 const express = require("express")
 const cors =require("cors")
 const mongoose = require("mongoose")
 const dotenv = require("dotenv").config()
 const Stripe = require('stripe')

 const app = express()
 app.use(cors())
 app.use(express.json({limit : "10mb"}))

 const PORT = process.env.PORT || 8000
//mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
    address: String,
    phone: Number,
  });
//model
const userModel = mongoose.model("user", userSchema);



 //api
 app.get("/",(req,res)=>{
    res.send("server is running")
 })

 //sign up
app.post("/signup",async (req, res) => {

    console.log(req.body);
    const {email} = req.body
    
    try {
      const result = await userModel.findOne({ email: email }).exec();
      console.log(result);
      if (result){
        res.send({message : "Email id is already register",alert : false})
      }else{
        const data = userModel(req.body)
        const save = data.save()
        res.send({message : "Successfully signed up",alert : true})
      }
    } catch (err) {
      console.error(err);
    }
    
  });
//api login
app.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email }).exec();

    if (user) {
      // Compare the provided password with the password in the database
      if (user.password === password) {
        const dataSend = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          address: user.address,
          phone: user.phone,
        };

        console.log(dataSend);
        res.send({ message: 'Login is successful', alert: true, data: dataSend });
      } else {
        // Password doesn't match
        res.send({ message: 'Incorrect email or password', alert: false });
      }
    } else {
      // User not found
      res.send({ message: 'Account does not exist, Please sign up', alert: false });
    }
  } catch (err) {
    console.error(err);
    res.send({ message: 'Internal Server Error', alert: false });
  }
});
//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data 
//api
app.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      productName: {
        type: String,
        required:true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;




app.post("/create-order", async (req, res) => {
  try {
    const { userId, products } = req.body;

    const orderProducts = await Promise.all(products.map(async (product) => {

      return {
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      };
    }));

    const newOrder = await OrderModel.create({
      userId: userId,
      products: orderProducts,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Order created successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Failed to create order" });
  }
});


// In your server code (app.js or wherever your routes are defined)
app.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('userId').populate('products');
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


 app.listen(PORT,()=>console.log("server is runnning : " + PORT))