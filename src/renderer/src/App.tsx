import Home from "./Home"
import Sidebar from "./Sidebar"


function App(): JSX.Element {
  return (
    <div className="container">
      <Sidebar />
      <Home />
    </div>
  )
}

export default App
