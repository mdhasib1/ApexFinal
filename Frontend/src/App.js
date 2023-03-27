import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Admin from "./Components/adminlayout/Layout";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import BlogEditor from "./Components/BlogEditor/Editor";
import CreateCollection from "./Components/CreateCollection/CollectionCreate";
import Explore from "./Components/Explore/Explore";
import HomeAdmin from "./Components/Home/HomeAdmin";
import Partners from "./Components/Home/Partner";
import Layout from "./Components/Layout/Layout";
import ProfileSetup from "./Components/ProfileSetup/ProfileSetup";
import ProtectedRoute from "./Components/ProtectRoutes/PrivetRoute";
import Sidebar from "./Components/sidebar/Sidebar";
import AboutUs from "./Pages/About/About";
import AllNFTs from "./Pages/AllNFTs/AllNFTs";
import Blog from "./Pages/Blog/index";
import BlogDetail from "./Pages/BlogDetail/index";
import Contact from "./Pages/Contact/index";
import UploadWork from "./Pages/Create/Create";
import Profile from "./Pages/CreatorProfile/index";
import CreatorProfileEdit from "./Pages/CreatorProfileEdit/index";
import Dashboard from "./Pages/dashboard/Dashboard";
import DetailsNFT from "./Pages/DetailsNFT/index";
import Faqs from "./Pages/Faqs/index";
import Home from "./Pages/Home/Home";
import LockScreen from "./Pages/LockScreen/index";
import ResetPassword from "./Pages/ResetPassword/index";
import Terms from "./Pages/Terms";
import Users from "./Pages/Users/Users";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { getLoginStatus } from "./services/authService";
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  return (
    <AuthProvider>
    <BrowserRouter>
          <ToastContainer />
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
              <Explore />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          exact
          path="/creator-profile-edit"
          element={
            <Layout>
              <CreatorProfileEdit />
            </Layout>
          }
        />

        <Route
          exact
          path="/reset-password"
          element={
            <Layout>
              <ResetPassword />{" "}
            </Layout>
          }
        />
        <Route
          exact
          path="/lock-screen"
          element={
            <Layout>
              <LockScreen />
            </Layout>
          }
        />

        {/* help center routes */}
        <Route
          exact
          path="/helpcenter-faqs"
          element={
            <Layout>
              <Faqs />
            </Layout>
          }
        />

        {/* template page routes  */}
        <Route
          exact
          path="/blog-detail"
          element={
            <Layout>
              <BlogDetail />
            </Layout>
          }
        />
        <Route
          exact
          path="/blogs"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          exact
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          exact
          path="/profile-setup"
          element={
            <Layout>
              <ProfileSetup />
            </Layout>
          }
        />
        <Route
          exact
          path="/nfts/:tokenId"
          element={
            <Layout>
              <DetailsNFT />
            </Layout>
          }
        />
       <Route path="/admin" element={<ProtectedRoute roles={['admin']} />}>
          <Route
            index
            element={
              <Sidebar>
                <Admin>
                  <Dashboard />
                </Admin>
              </Sidebar>
            }
          />
        </Route>
       <Route path="/all-users" element={<ProtectedRoute roles={['admin']} />}>
          <Route
            index
            element={
              <Sidebar>
                <Admin>
                  <Users />
                </Admin>
              </Sidebar>
            }
          />
        </Route>
       <Route path="/home-content" element={<ProtectedRoute roles={['admin']} />}>
          <Route
            index
            element={
              <Sidebar>
                <Admin>
                  <HomeAdmin />
                </Admin>
              </Sidebar>
            }
          />
        </Route>
       <Route path="/partner" element={<ProtectedRoute roles={['admin']} />}>
          <Route
            index
            element={
              <Sidebar>
                <Admin>
                  <Partners />
                </Admin>
              </Sidebar>
            }
          />
        </Route>
       <Route path="/all-collection" element={<ProtectedRoute roles={['admin']} />}>
          <Route
            index
            element={
              <Sidebar>
                <Admin>
                  <CreateCollection />
                </Admin>
              </Sidebar>
            }
          />
        </Route>

        <Route
          path="/admin/add-blog"
          element={
            <Sidebar>
              <Admin>
                <BlogEditor />
              </Admin>
            </Sidebar>
          }
        />
        <Route
          path="/allcourse"
          element={
            <Sidebar>
              <Admin>
                <AllNFTs />
              </Admin>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
