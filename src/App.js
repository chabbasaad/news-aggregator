import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Dashboard from './components/dashboard.component'
import Logout from './components/logout.component'
import Profil from './components/profil.component'
import News from './components/news.component'
import Navbar from './components/navbar.component'
import Guardian from './components/guardianapi.component'
import Times from './components/times.component'
function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/news" element={<News />} />
              <Route path="/guardian" element={<Guardian />} />
              <Route path="/times" element={<Times />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
    </Router>
  )
}
export default App