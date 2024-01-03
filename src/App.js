import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { RecoilRoot } from "recoil";
import RecipeHome from "./page/Recipe/RecipeHome";
import ShopHome from "./page/Shop/ShopHome";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RecipeHome />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/SignUP" element={<SignUp />}></Route>
            <Route path="/Shop" element={<ShopHome />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
