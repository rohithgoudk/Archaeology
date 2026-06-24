import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Components/MainLayout/MainLayout";


import NotFound from "./Components/NotFound/NotFound";

import "./App.css"
import ArchaeologyPage from "./Components/Archaeology/Archaeology";
import Artifacts from "./Components/Artifact/Artifact";
import Research from "./Components/Research/Research";
import FieldNotes from "./Components/FieldNotes/FieldNotes";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup"
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/Admindashboard/Admindashboard";
import ScrollToTop from "./Components/ScrollToTop"


function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ArchaeologyPage />} />
          <Route path="/artifact" element={<Artifacts />} />
          <Route path="/journal" element={<FieldNotes />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
       

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/user-dashboard" element={<Dashboard/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />



        {/* Any route not defined above will show 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;