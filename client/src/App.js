import "./App.css";
import AppBar from "./components/shared/AppBar";

function App() {
  return (
    <div className="App bg-slate-800 h-screen w-screen">
      <AppBar />
      <div id="content-container"></div>
    </div>
  );
}

export default App;
