import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Form } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const Login = () => {
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const emailRef = useRef()
   const passwordRef = useRef()

   const { login } = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         setError('')
         setLoading(true)
         await login(emailRef.current.value, passwordRef.current.value)
         navigate('/')
      } catch (error) {
         setError(`Failed to sign in. ${error.message}`)
      }

      setLoading(false)
   }

   return (
      <>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Log In</h2>
               {error !== '' && (<Alert variant='danger'>{error}</Alert>)}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control type='email' ref={emailRef} required className='mb-3' />
                  </Form.Group>
                  <Form.Group id='password'>
                     <Form.Label>Password</Form.Label>
                     <Form.Control type='password' ref={passwordRef} required className='mb-3' />
                  </Form.Group>
                  <Button type='submit' className='w-100' disabled={loading}>Log In</Button>
               </Form>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
         </div>
      </>
   )
}

export default Login
