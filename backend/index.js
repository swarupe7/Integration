const express=require('express');
const app=express();
const cors=require('cors');
require("dotenv").config();
app.use(express.json());

app.use(cors({origin:'*'}));

const stripe=require('stripe')(process.env.STRIPE);




app.post('/checkout', async (req, res) => {

    try{
       
       const session =await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        mode:"payment",
        line_items:req.body.items.map(item=>{
            return {
                price_data:{
                    currency:"pkr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:(item.price)*100,
                   
                        
                    
                },
                quantity:item.quantity
            }
        }),
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
       });
       res.json({url:session.url})
    }catch(err){
        console.log(err);
        res.status(500).json({message:`${err.message}`});
    }
});



app.listen(5000);