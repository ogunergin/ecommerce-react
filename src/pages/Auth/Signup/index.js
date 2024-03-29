import React from 'react'
import { Heading, Box, Flex, Button, FormControl, FormLabel, Input, Alert } from '@chakra-ui/react';
import { useFormik } from "formik";
import validationSchema from './validation';
import { fetchRegister } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister(values);
        login(registerResponse);
        navigate('/profile');
      } catch (e) {
        bag.setErrors({ general: e.response.data.Message })

      }

    }
  })

  return (
    <div>
      <Flex align={"center"} width="full" justifyContent={"center"}>
        <Box pt={10}>
          <Box textAlign={"center"}>
            <Heading>SignUp</Heading>
          </Box>
          <Box my={5}>
            {
              formik.errors.general && (
                <Alert status='error'>
                  {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input name='password' type={"password"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>İsim</FormLabel>
                <Input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Soyisim</FormLabel>
                <Input name='surname' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surname} />
              </FormControl>

              <Button mt={4} width="full" type='submit' >
                SignUp
              </Button>

            </form>
          </Box>
        </Box>
      </Flex>



    </div>
  )
}

export default Signup