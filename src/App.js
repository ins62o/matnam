// 외부 - import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";

// 내부 - import
import "./App.css";
import Loading from "./page/Loading";
import ScrollToTop from "./services/ScrollToTop";
import ReleaseNote from "./page/ReleaseNote";
const Login = lazy(() => import("./page/Login"));
const SignUp = lazy(() => import("./page/SignUp"));
const RecipeHome = lazy(() => import("./page/Recipe/RecipeHome"));
const RecipeWriteOne = lazy(() => import("./page/Recipe/RecipeWriteOne"));
const RecipeWriteTwo = lazy(() => import("./page/Recipe/RecipeWriteTwo"));
const RecipeWriteThree = lazy(() => import("./page/Recipe/RecipeWriteThree"));
const RecipeEditOne = lazy(() => import("./page/Recipe/RecipeEditOne"));
const RecipeEditTwo = lazy(() => import("./page/Recipe/RecipeEditTwo"));
const RecipeEditThree = lazy(() => import("./page/Recipe/RecipeEditThree"));
const RecipeFeed = lazy(() => import("./page/Recipe/RecipeFeed"));
const RecipeDetail = lazy(() => import("./page/Recipe/RecipeDetail"));
const MyPage = lazy(() => import("./page/Mypage/MyPage"));

// @tanstack 선언
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Suspense fallback={<Loading />}>
          <RecoilRoot>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<RecipeHome />}></Route>
                <Route
                  path="/recipeFeed/:category"
                  element={<RecipeFeed />}
                ></Route>
                <Route path="/recipeFeed/" element={<RecipeFeed />}></Route>
                <Route path="/RecipeWrite" element={<RecipeWriteOne />}></Route>
                <Route
                  path="/RecipeWriteTwo"
                  element={<RecipeWriteTwo />}
                ></Route>
                <Route
                  path="/RecipeWriteThree"
                  element={<RecipeWriteThree />}
                ></Route>

                <Route
                  path="/RecipeEdit/:id"
                  element={<RecipeEditOne />}
                ></Route>
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
                <Route path="/Mypage/:nickname" element={<MyPage />}></Route>
                <Route path="/note" element={<ReleaseNote />}></Route>
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </Suspense>
      </>
    </QueryClientProvider>
  );
}

export default App;
