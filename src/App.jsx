import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import AboutUs from "./Pages/About/About";
import UploadWork from "./Pages/Create/Create";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import Terms from "./Pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/create"
          element={
            <Layout>
              <UploadWork />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/explore"
          element={
            <Layout>
           <Explore/>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
           <AboutUs/>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
