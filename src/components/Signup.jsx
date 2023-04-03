import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Form } from 'react-bootstrap'

import { useAuth } from '../contexts/AuthContext'

const Signup = () => {
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const emailRef = useRef()
   const passwordRef = useRef()
   const passwordConfirmRef = useRef()

   const { signup } = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value)
         return setError('Passwords do not match.')

      try {
         setError('')
         setLoading(true)

         await signup(emailRef.current.value, passwordRef.current.value)
         navigate('/')
      } catch (error) {
         setError(`Failed to sign up. ${error.message}`)
      }

      setLoading(false)
   }

   return (
      <>
         <Card>
            <Card.Body>
               <h2 className='text-center mb-4'>Sign Up</h2>
               {error && (<Alert variant='danger'>{error}</Alert>)}
               <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type='email'
                        ref={emailRef}
                        required
                        className='mb-3'
                     />
                  </Form.Group>
                  <Form.Group id='password'>
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type='password'
                        ref={passwordRef}
                        required
                        className='mb-3'
                     />
                  </Form.Group>
                  <Form.Group id='password-confirm'>
                     <Form.Label>Password Confirmation</Form.Label>
                     <Form.Control
                        type='password'
                        ref={passwordConfirmRef}
                        required
                        className='mb-3'
                     />
                  </Form.Group>
                  <Button
                     type='submit'
                     disabled={loading}
                     className='w-100'
                  >
                     Sign Up
                  </Button>
               </Form>
            </Card.Body>
         </Card>
         <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
         </div>
      </>
   )
}

export default Signup
