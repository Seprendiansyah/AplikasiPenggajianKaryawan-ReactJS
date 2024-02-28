import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import PageAuthSignIn from "./pages/auth/PageAuthSignIn.jsx";
import { useState } from "react";
import { ContextApplication } from "./libs/config/contexts.js";
import PageCommonOutlet from "./pages/commons/PageCommonOutlet.jsx";
import PageKaryawanList from "./pages/karyawan/PageKaryawanList.jsx";
import PageKaryawanCreate from "./pages/karyawan/PageKaryawanCreate.jsx";
import PagePotonganCreate from "./pages/potongan/PagePotonganCreate.jsx";
import PagePotonganList from "./pages/potongan/PagePotonganList.jsx";
import PagePotonganDetail from "./pages/potongan/PagePotonganDetail.jsx";
import PageKaryawanDetail from "./pages/karyawan/PageKaryawanDetail.jsx";
import PageDepartemenList from "./pages/departemen/PageDepartemenList.jsx";
import PageDepartemenCreate from "./pages/departemen/PageDepartemenCreate.jsx";
import PageDepartemenDetail from "./pages/departemen/PageDepartemenDetail.jsx";
import PagePenggajianList from "./pages/penggajian/PagePenggajianList.jsx";
import PagePenggajianPrint from "./pages/penggajian/PagePenggajianPrint.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <ContextApplication.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageKaryawanList />} />
              {/* <Route path={"new"} element={<PageKaryawanCreate />} /> */}
              <Route path={"detail/:id"} element={<PageKaryawanDetail />} />
            </Route>
            <Route path="/potongan" element={<PageCommonOutlet />}>
              <Route index={true} element={<PagePotonganList />} />
              <Route path={"potongan"} element={<PagePotonganCreate />} />
              <Route path={"detail/:id"} element={<PagePotonganDetail />} />
            </Route>
            <Route path="/departemen" element={<PageCommonOutlet />}>
              <Route index={true} element={<PageDepartemenList />} />
              <Route index={"departemen"} element={<PageDepartemenCreate />} />
              <Route index={"detail/:id"} element={<PageDepartemenDetail />} />
            </Route>
            <Route path="/penggajian" element={<PageCommonOutlet />}>
              <Route index={true} element={<PagePenggajianList />} />
              <Route index={"penggajian"} element={<PagePenggajianPrint />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  );
};

export default App;
