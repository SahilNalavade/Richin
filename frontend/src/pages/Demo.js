import { Card, CardHeader,Flex,Square,Box, CardBody, CardFooter ,Center, Stack, Heading,Divider,ButtonGroup,Button,Image,Text, Spacer} from '@chakra-ui/react'
import React from 'react'

const Demo = () => {
  return (
    <>
    <center><h1>New to Richin?</h1></center>
<center><p>If you’re new to Richin, we strongly recommend you to go through the demo to understand the platform better and use the latest features to your advantage.</p></center>
    <Center>
    </Center>
 


    <div style={{marginLeft:'20%'}}>
    <Flex color='black'>
  <Center w='34%'>
    <Image
      src='https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8SW52ZXN0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      alt='Green double couch with wooden legs'
      borderRadius='10px'
      width={'50%'}
    />
  </Center>
  <Square size='30%'>
    <Flex direction='column'>
      <Heading size='md'>Goal based Investing</Heading>
      <Text marginTop={-10}>
      Based on your goal requirements and time period, our algorithm will recommend you investment options, which would yield the best returns in the given time frame, and achieve your goals with Systematic Investment Plans (SIP).
      </Text>
    </Flex>
  </Square>
</Flex>

<br /><br />
<Flex color='black'>
  <Center w='34%'>
    <Image
      src='https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8VHJhY2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      alt='Green double couch with wooden legs'
      borderRadius='10px'
      width={'50%'}
    />
  </Center>
  <Square size='30%' >
    <Flex direction='column'>
      <Heading size='md'>Easier Asset Tracking</Heading>
      <Text marginTop={-10}>
      Check the performance of your assets in the watchlist with our new interface, and make appropriate decisions to boost your investments.
      </Text>
    </Flex>
  </Square>
</Flex>

<br /><br />
<Flex color='black'  border={'4px'} >
  <Center w='34%'>
    <Image
      src='https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8V2FsbGV0JTIwaW52ZXN0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
      alt='Green double couch with wooden legs'
      borderRadius='10px'
      width={'50%'}
    />
  </Center>
  <Square size='30%'>
    <Flex direction='column'>
      <Heading size='md'>Universal Wallet</Heading>
      <Text marginTop={-10}>
      Track your equity, crypto and other assets along with the funds in your account at a single place. Check how your assets have performed over time.
      </Text>
    </Flex>
  </Square>
</Flex>
</div>

    </>
  )
}

export default Demo