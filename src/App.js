import { React } from "react";
import { Routes, Route } from "react-router-dom";

// import MainPage from "./pages/Main";
// import Login from "./pages/Login";
 import Reportlist from "./pages/Reportlist";
 import Reportdetail from "./pages/Reportdetail";

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<MainPage/>} ></Route> */}
      {/* <Route path='/login' element={<Login/>} ></Route> */}
      <Route path='/reportlist' element={<Reportlist/>} ></Route>
      <Route path='/reportdetail' element={<Reportdetail />} ></Route>

      {/* <Route path='/detailpages/*' >
        <Route path=":id" element={<DetailPage />} />
      </Route>
      <Route path='/searchpage' element={<SearchPage/>} ></Route>
      <Route path='/proposalpage' element={<ProposalPage/>} ></Route>
      <Route path='/mypage' element={<MyPage/>} ></Route>  
      <Route path='/professorapprovalpage' element={<ProfessorApprovalPage/>} ></Route>   */}

  </Routes>
  );
}

export default App;
