import React,{useState} from 'react'

const Home = () => {
    const itemImg="fireplace.jpg";
    const itemPrice=500;
    const [quantity,setQuantity]=useState(1);
    const [final,setFinal]=useState(itemPrice);
    const decrement=()=>{
        if(quantity===0){
            setQuantity(1);
            setFinal(itemPrice);
        }else{
            if(quantity-1>0){
            setQuantity(quantity-1);
            setFinal(final-itemPrice);}
            else{
                setQuantity(1);
            setFinal(itemPrice);
            }
        }

    }
    const increment=()=>{
            setQuantity(quantity+1);
            setFinal(final+itemPrice);
    }

    const checkout=async(req,res)=>{
        try{
            const res=await fetch('http://localhost:5000/checkout',{
                method: 'POST',
                headers:{"Content-Type":"application/json"},
                mode:"cors",
                body: JSON.stringify({
                    items:[
                        {
                            id:1,
                            quantity:quantity,
                            price:itemPrice,
                            name:itemImg
                        }
                    ]
                })

            })
            const data=await res.json();
            window.location=data.url;
        }catch(e){
            res.status(500).json({error:e.message});
    }
}

  return (
    <>
   <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <img src={itemImg} alt="Item" className="w-32 h-32 object-cover" />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{itemImg}</h2>
          <p className="text-gray-500">${itemPrice}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <button onClick={decrement} className="px-4 py-2 bg-gray-300 rounded-lg">-</button>
        <span className="mx-4">{quantity}</span>
        <button onClick={increment} className="px-4 py-2 bg-gray-300 rounded-lg">+</button>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <p className="text-xl font-bold">Total: ${final}</p>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={checkout} className="px-6 py-3 bg-blue-500 text-white rounded-lg">Checkout</button>
      </div>
    </div>
    </>
  )
}

export default Home