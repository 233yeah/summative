import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import MovieView from "./views/MovieView";
import GenreView from "./views/GenreView";
import DetailView from "./views/DetailView";
import CartView from "../src/views/CartView";
import SettingsView from "../src/views/SettingsView";
import { StoreProvider } from "./context";
import './App.css'

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/movie" element={<MovieView />}>
            <Route path="genre/:id" element={<GenreView />} />
            <Route path="details/:id" element={<DetailView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>

  )
}

export default App
