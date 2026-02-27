import { Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import FormPage from "./pages/FormPage"
import Counter from "./component/Counter"

function App() {
  const location = useLocation()

  const linkClass = (path) =>
    `block px-4 py-2 rounded-xl transition-all duration-200 ${
      location.pathname === path
        ? "bg-[#f8f5f1] shadow-md"
        : "text-gray-700 hover:bg-gray-200"
    }`

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg p-6">
        <ul className="space-y-2">
          <li>
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className={linkClass("/form")}>
              Form
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10">
          <Counter />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App