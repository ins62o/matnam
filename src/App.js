import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RecipeHome from "./page/Recipe/RecipeHome";
import ScrollToTop from "./services/ScrollToTop";
import RecipeWriteOne from "./page/Recipe/RecipeWriteOne";
import RecipeWriteTwo from "./page/Recipe/RecipeWriteTwo";
import RecipeWriteThree from "./page/Recipe/RecipeWriteThree";
import RecipeEditOne from "./page/Recipe/RecipeEditOne";
import RecipeEditTwo from "./page/Recipe/RecipeEditTwo";
import RecipeEditThree from "./page/Recipe/RecipeEditThree";
import RecipeFeed from "./page/Recipe/RecipeFeed";
import RecipeDetail from "./page/Recipe/RecipeDetail";
import MyPage from "./page/Mypage/MyPage";
import ChatList from "./page/Chat/ChatList";
import ChatRoom from "./page/Chat/ChatRoom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <RecoilRoot>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<RecipeHome />}></Route>
              <Route
                path="/recipeFeed/:category"
                element={<RecipeFeed />}
              ></Route>
              <Route path="/RecipeWrite" element={<RecipeWriteOne />}></Route>
              <Route
                path="/RecipeWriteTwo"
                element={<RecipeWriteTwo />}
              ></Route>
              <Route
                path="/RecipeWriteThree"
                element={<RecipeWriteThree />}
              ></Route>

              <Route path="/RecipeEdit/:id" element={<RecipeEditOne />}></Route>
              <Route
                path="/RecipeEditTwo/:id"
                element={<RecipeEditTwo />}
              ></Route>
              <Route
                path="/RecipeEditThree/:id"
                element={<RecipeEditThree />}
              ></Route>
              <Route
                path="/RecipeDetail/:id"
                element={<RecipeDetail />}
              ></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/SignUP" element={<SignUp />}></Route>
              <Route path="/Mypage" element={<MyPage />}></Route>
              <Route path="/chatList" element={<ChatList />}></Route>
              <Route path="/chatroom" element={<ChatRoom />}></Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </>
    </QueryClientProvider>
  );
}

export default App;
