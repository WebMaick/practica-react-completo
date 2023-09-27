import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from '../pages/Profile'
import { About } from '../pages/About'
import { SignOut } from '../pages/SignOut'
import { SignIn } from '../pages/SignIn'
import { Home } from '../pages/Home'
import { Header } from '../components/Header'

export const RouteApp = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
