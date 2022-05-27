import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Navbar from './components/layout/Navbar/Navbar'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import GameSuggestionsPage from './pages/GameSuggestionsPage/GameSuggestionsPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage'
import UserProfilePage from './pages/DashboardPages/UserProfilePage/UserProfilePage'
import UserGameSuggestionsPage from './pages/DashboardPages/UserGameSuggestionsPage/UserGameSuggestionsPage'
import UserProjectsPage from './pages/DashboardPages/UserProjectsPage/UserProjectsPage'
import UnapprovedPostsPage from './pages/DashboardPages/UnapprovedPostsPage/UnapprovedPostsPage'
import { HeaderProvider } from './context/header/HeaderContext'
import { AlertProvider } from './context/alert/AlertContext'
import useAuthentication from './hooks/useAuthentication'
import Spinner from './components/common/Spinner/Spinner'

const App = () => {
  const { authenticated } = useAuthentication()

  return (
    <React.Fragment>
      {authenticated ? (
        <Router>
          <HeaderProvider>
            <AlertProvider>
              <Navbar />
              <Header />
              <main className='page-wrapper col-xl-8 col-lg-8 col-md-10 col-sm-10 col-xs-12'>
                <Routes>
                  <Route path='dashboard' element={<Outlet />}>
                    <Route element={<ProtectedRoute />}>
                      <Route index element={<Navigate to='profile' />} />
                      <Route path='profile' element={<UserProfilePage />} />
                      <Route
                        path='game-suggestions'
                        element={<UserGameSuggestionsPage />}
                      />
                      <Route path='projects' element={<UserProjectsPage />} />
                      <Route path='*' element={<Navigate to='/not-found' />} />
                    </Route>
                    <Route
                      element={<ProtectedRoute allowedRoles={['admin']} />}
                    >
                      <Route
                        path='unapproved-posts'
                        element={<UnapprovedPostsPage />}
                      />
                    </Route>
                  </Route>
                  <Route path='users/:userId' element={<UserDetailsPage />} />
                  <Route
                    path='game-suggestions'
                    element={<GameSuggestionsPage />}
                  />
                  <Route path='projects' element={<ProjectsPage />} />
                  <Route path='register' element={<RegisterPage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='not-found' element={<NotFoundPage />} />
                  <Route
                    path='/'
                    element={<Navigate to='/game-suggestions' />}
                  />
                  <Route path='*' element={<Navigate to='/not-found' />} />
                </Routes>
              </main>
              <Footer />
            </AlertProvider>
          </HeaderProvider>
        </Router>
      ) : (
        <Spinner centered />
      )}
    </React.Fragment>
  )
}

export default App
