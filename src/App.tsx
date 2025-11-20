import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Layout from "./components/layout/Layout.tsx";
import NewUpdate from "./pages/NewUpdate";
import Pokedex from "./pages/Pokedex.tsx";
import HumanDex from "./pages/HumanDex.tsx";
import HumanEntry from "./pages/HumanEntry.tsx";
import PokedexEntry from "./pages/PokedexEntry.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <div className="App" id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<NewUpdate />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:name" element={<PokedexEntry />} />
            <Route path="/humans" element={<HumanDex />} />
            <Route path="/humans/:name" element={<HumanEntry />} />
          </Route>
          <Route path="/admin" element={<Layout />}>
            <Route path="/admin" element={<NewUpdate />} />
            <Route
              path="/admin/pokedex"
              element={<Pokedex is_admin={true} />}
            />
            <Route
              path="/admin/pokedex/:name"
              element={<PokedexEntry is_admin={true} />}
            />
            <Route path="/admin/humans" element={<HumanDex />} />
            <Route path="/admin/humans/:name" element={<HumanEntry />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
