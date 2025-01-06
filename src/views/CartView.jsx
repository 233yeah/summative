import { useStoreContext } from "../context";
import "./CartView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function CartView() {
  const { cart, setCart } = useStoreContext();
  const navigate = useNavigate();

  function backPage() {
    navigate(`/movie/genre/0`);
  }

  return (
    <div>
      <Header />
      <div className="cart-view">
        <button onClick={() => backPage()} className="back-button">Back</button>
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {
            cart.entrySeq().reverse().map(([key, value]) => {
              return (
                <div className="cart-item" key={key}>
                  <img src={`https://image.tmdb.org/t/p/w500${value.url}`} />
                  <h1>{value.title}</h1>
                  <button className="remove-button" onClick={() => setCart((prevCart) => prevCart.delete(key))}>Remove</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CartView;