import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/Posts'
import UserProfile from './pages/dashboard/UserProfile'
import UserPosts from './pages/dashboard/UserPosts'
import UnapprovedPosts from './pages/dashboard/UnapprovedPosts'
import Dashboard from './pages/dashboard/Dashboard'
import SearchUser from './pages/SearchUser'
import NotFound from './pages/NotFound'
import Header from './components/layout/Header'
import { HeaderProvider } from './context/header/HeaderContext'

function App() {
  return (
    <HeaderProvider>
      <Router>
        <Navbar />
        <Header />
        <main className='container'>
          <Routes>
            <Route path='/dashboard/*' element={<Dashboard />}>
              <Route path='profile' element={<UserProfile />} />
              <Route path='posts' element={<UserPosts />} />
              <Route path='unapproved-posts' element={<UnapprovedPosts />} />
            </Route>
            <Route path='/user/:id' element={<SearchUser />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/' element={<Navigate to='/posts' />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </HeaderProvider>
  )
}

export default App
