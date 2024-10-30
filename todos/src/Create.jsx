import { Button, Input, Stack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {

    const [task, setTask] = useState();
    const handleAdd = () => {
        axios.post('https://todos-application-react-js.onrender.com/add', {task: task})
        .then(result => {
          console.log(result);
          location.reload();
        }
        )
        .catch(error => console.log(error))
    }

  return (
    <VStack w='300px' mx='auto'>
        <Input type="text" name='task' variant='filled' onChange={(e ) => setTask(e.target.value)} placeholder='Name of the task' size='lg'/>
        <Button onClick={handleAdd} colorScheme='teal' variant='solid' w='100%' type='submit'>Add</Button>
    </VStack>
  )
}

export default Create
