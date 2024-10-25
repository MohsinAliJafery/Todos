import { Box, Heading, HStack, VStack, Flex, Checkbox, Spacer, textDecoration} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Create from './Create'
import { GoTrash } from "react-icons/go";
import axios from 'axios'

const Home = () => {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setTodos(result.data))
    .catch(error => console.log(error))
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' +id )
    .then(result => {
      console.log(result)
      location.reload();
    })
    .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id )
    .then(result =>  {
      console.log(result)
      location.reload();
    })
    .catch(error => console.log(error))
  }

  return (
    <VStack spacing='20px' width='50%' mx='auto' py='80px' px='40px'>
    <Heading size='3xl' mb='40px'>TodoList App</Heading>
    <Create />
    {
        todos.length === 0 ? 
        <Heading size='md' color='red'></Heading> :
        todos.map((todo) => (
            <Box onClick={() => handleEdit(todo._id)} boxShadow='lg' width='100%' p='5px' w='300px' color='teal' key={todo._id} borderRadius='md'>
              <Flex alignItems='center' p='5px' gap='2'>
                {todo.done ? 
               <Checkbox cursor='pointer' isChecked='isChecked'/> :
               <Checkbox cursor='pointer' />
                }
               
                <Box cursor='pointer' fontWeight='medium' textDecoration={todo.done? 'line-through':'none'}>
                  {todo.task}
                </Box>
                <Spacer />
                <GoTrash cursor='pointer' fontSize='18px' onClick={() => handleDelete(todo._id)}/>
              </Flex>
            </Box>
        ))
    }
    </VStack>
  )
}

export default Home