import { useStoreContext } from "../context";
import "./CartView.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Map } from 'immutable';

function CartView() {
  const { cart, setCart, user, setPurchases } = useStoreContext();
  const navigate = useNavigate();

  function backPage() {
    navigate(`/movie/genre/0`);
  }

  function removeMovie(key) {
    localStorage.removeItem(user.uid);
    setCart((prevCart) => {
      const newCart = prevCart.delete((key));
      localStorage.setItem(user.uid, JSON.stringify(newCart.toJS()));
      return newCart;
    });
  }

  const checkout = async () => {
    if (cart.size > 0) {
      const docRef = doc(firestore, "users", user.email);
      const userData = { purchases: cart.toJS(), };
      await setDoc(docRef, userData, { merge: true });
      localStorage.removeItem(user.uid);
      setCart(Map());
      const getPurchases = async () => {
        const docRef = doc(firestore, "users", user.email);
        const data = (await getDoc(docRef)).data();
        setPurchases(Map(data.purchases));
      }
      getPurchases();
      alert("Thank You for the Purchase!")
    } else {
      alert("Please Add Movies First")
    }

  }
  return (
    <div>
      <Header />
      <div className="cart-view">
        <button onClick={() => backPage()} className="cart-button">Back</button>
        <h1>Shopping Cart</h1>
        <button onClick={() => checkout()} className="cart-button">Checkout</button>
        <div className="cart-items">
          {
            cart.entrySeq().reverse().map(([key, value]) => {
              return (
                <div className="cart-item" key={key}>
                  <img src={`https://image.tmdb.org/t/p/w500${value.url}`} />
                  <h1>{value.title}</h1>
                  <button className="remove-button" onClick={() => removeMovie(key)}>Remove</button>
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