import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from './Components/adminlayout/Layout';
import BlogEditor from "./Components/BlogEditor/Editor";
import Explore from "./Components/Explore/Explore";
import Layout from "./Components/Layout/Layout";
import Sidebar from "./Components/sidebar/Sidebar";
import AboutUs from "./Pages/About/About";
import AllNFTs from "./Pages/AllNFTs/AllNFTs";
import Blog from './Pages/Blog/index';
import BlogDetail from './Pages/BlogDetail/index';
import Contact from './Pages/Contact/index';
import UploadWork from "./Pages/Create/Create";
import Profile from './Pages/CreatorProfile/index';
import CreatorProfileEdit from "./Pages/CreatorProfileEdit/index";
import Dashboard from './Pages/dashboard/Dashboard';
import DetailsNFT from "./Pages/DetailsNFT/index";
import Faqs from './Pages/Faqs/index';
import Home from "./Pages/Home/Home";
import LockScreen from './Pages/LockScreen/index';
import ResetPassword from './Pages/ResetPassword/index';
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
        <Route exact path="/profile" element={
          <Layout>
            <Profile/>
          </Layout>
        } />

<Route
          exact
          path="/creator-profile-edit"
          element={
            <Layout>
          <CreatorProfileEdit />
          </Layout>
        }
        />

<Route exact path="/reset-password" element={   <Layout><ResetPassword /> </Layout>} />
        <Route exact path="/lock-screen" element={<Layout><LockScreen /></Layout>} />


        {/* help center routes */}
        <Route exact path="/helpcenter-faqs" element={<Layout><Faqs /></Layout>} />

        {/* template page routes  */}
        <Route exact path="/blog-detail" element={<Layout><BlogDetail /></Layout>} />
        <Route exact path="/blogs" element={<Layout><Blog /></Layout>} />
        <Route exact path="/contact" element={<Layout><Contact /></Layout>} />
        <Route exact path="/nfts/:tokenId" element={<Layout><DetailsNFT /></Layout>} />
        <Route
          path="/admin"
          element={
            <Sidebar>
              <Admin>
                <Dashboard/>
              </Admin>
            </Sidebar>
          }
        />
        <Route
          path="/admin/add-blog"
          element={
            <Sidebar>
              <Admin>
                <BlogEditor/>
              </Admin>
            </Sidebar>
          }
        />
        <Route
          path="/allcourse"
          element={
            <Sidebar>
              <Admin>
                <AllNFTs/>
              </Admin>
            </Sidebar>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
