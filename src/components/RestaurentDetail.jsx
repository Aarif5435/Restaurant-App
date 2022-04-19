import { useEffect, useState } from "react";
import "./style.css";

function RestaurentDetail() {
  const [restaurent, setRestaurent] = useState([]);
  const [formData, setFormData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {}, [count]);

  const getData = async () => {
    let res = await fetch(`http://localhost:9090/restaurent`);
    let data = await res.json();
    // console.log(data);

    setRestaurent(data);
  };

  const handlechange = (e) => {
    console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    fetch(`http://localhost:9090/restaurent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      getData();
    });
  };

  const sortByrating = (n) => {
    let sortdata = [...restaurent];
    const sorted = sortdata
      .filter((data) => {
        return data.rating > n;
      })
      .sort((a, b) => {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        return 0;
      });
    setRestaurent(sorted);
  };
const payment = (item)=>{
  let sortdata = [...restaurent];

     const sot = sortdata.filter((data)=>{
       console.log(data.payment_method !=="cash")
       return data.payment_method !== [item];
     }) 
     setRestaurent(sot);
}
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handlechange}
          type="text"
          name="category"
          placeholder="Add category"
        />

        <input
          onChange={handlechange}
          type="number"
          name="cost"
          placeholder="Cost for one"
        />
        <select onChange={handlechange} name="payment_menthod">
          <option value="payment menthod">Payment Method</option>
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
        <select onChange={handlechange} name="rating">
          <option value="rating">Rating</option>
          <option value="1">1 star</option>
          <option value="2">2 star</option>
          <option value="3">3 star</option>
          <option value="4">4 star</option>
          <option value="5">5 star</option>
        </select>
        <input type="submit" name="submit" />
      </form>
      <button
        onClick={() => {
          setCount(count + 1);
          sortByrating(4);
        }}
      >
        5 star
      </button>

      <button
        onClick={() => {
          setCount(count + 1);
          sortByrating(3);
        }}
      >
        4 star
      </button>

      <button
        onClick={() => {
          setCount(count + 1);
          sortByrating(2);
        }}
      >
        3 star
      </button>

      <button
        onClick={() => {
          setCount(count + 1);
          sortByrating(1);
        }}
      >
        2 star
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
          sortByrating(0);
        }}
      >
        1 star
      </button>
<div>
   <button onClick={()=>{
     payment("cash")
   }}>Cash only</button>

<button onClick={()=>{
     payment("card")
   }}>Card only</button>

<button onClick={()=>{
  
     getData()
   }}>
  All
</button>
   
</div>
      
      <div className="restaurent_container">
        {restaurent.map((data) => (
          <div className="food_div">
            {
              <>
                <div>
                  <img
                    className="img_food"
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-chicken-tikka-masala-vertical-jpg-1526066425.jpg"
                  />
                </div>

                <div className="other">
                  <h3>{data.category}</h3>
                  <p>{`Cost for one ₹${data.cost}`}</p>
                  <p>{`Accepts  ${
                    data.payment_method 
                  } only`}</p>
                  <p>{`Rating :- ${data.rating}★`}</p>
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
export { RestaurentDetail };
