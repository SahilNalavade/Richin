import React from 'react'
import Navbarrrr from '@/components/Navbarrrr'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
const index = () => {
  return (
    <ChakraProvider> 
    <div>
      <Navbarrrr />
    </div>
    </ChakraProvider>
  )
}

export default index