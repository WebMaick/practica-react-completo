import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from '../pages/Profile'
import { About } from '../pages/About'
import { SignIn } from '../pages/SignIn'
import { Home } from '../pages/Home'
import { Header } from '../components/Header'
import { Signup } from '../pages/Signup'

export const RouteApp = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
