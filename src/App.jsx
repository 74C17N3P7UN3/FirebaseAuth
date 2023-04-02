import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { AuthProvider } from './contexts/AuthContext'
import { Dashboard, Login, Signup } from './components'

const App = () => (
   <AuthProvider>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
         <div className='w-100' style={{ maxWidth: '400px' }}>
            <BrowserRouter>
               <Routes>
                  <Route exact path='/' Component={Dashboard} />
                  <Route path='/login' Component={Login} />
                  <Route path='/signup' Component={Signup} />
               </Routes>
            </BrowserRouter>
         </div>
      </Container>
   </AuthProvider>
)

export default App
