import { React } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/admin' element={<Admin/>} ></Route>
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
