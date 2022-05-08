import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/Posts'
import Projects from './pages/Projects'
import NotFound from './pages/NotFound'
import SearchUser from './pages/SearchUser'
import Dashboard from './pages/dashboard/Dashboard'
import UserProfile from './pages/dashboard/UserProfile'
import UserPosts from './pages/dashboard/UserPosts'
import UserProjects from './pages/dashboard/UserProjects'
import UnapprovedPosts from './pages/dashboard/UnapprovedPosts'
import { HeaderProvider } from './context/header/HeaderContext'
import { AlertProvider } from './context/alert/AlertContext'

function App() {
  return (
    <Router>
      <HeaderProvider>
        <AlertProvider>
          <Navbar />
          <Header />
          <main className='page-wrapper col-xl-8 col-lg-8 col-md-10 col-sm-10 col-xs-12'>
            <Routes>
              <Route path='/dashboard/*' element={<Dashboard />}>
                <Route path='your-profile' element={<UserProfile />} />
                <Route path='your-posts' element={<UserPosts />} />
                <Route path='your-projects' element={<UserProjects />} />
                <Route path='unapproved-posts' element={<UnapprovedPosts />} />
              </Route>
              <Route path='/users/:userId' element={<SearchUser />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/not-found' element={<NotFound />} />
              <Route path='/' element={<Navigate to='/posts' />} />
              <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
          </main>
          <Footer />
        </AlertProvider>
      </HeaderProvider>
    </Router>
  )
}

export default App
