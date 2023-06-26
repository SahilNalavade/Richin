import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbarrrrr from '@/components/Navbarrrrr'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Heading,
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
function Connect() {
  const router = useRouter();
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();
  const [num5, setNum5] = useState();
  const [num6, setNum6] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleImageClick = (route) => {
    router.push(route);
  };
  const handleNum1Change = (e) => {
    setNum1(parseInt(e.target.value));
  };

  const handleNum2Change = (e) => {
    setNum2(parseInt(e.target.value));
  };

  const handleNum3Change = (e) => {
    setNum3(parseInt(e.target.value));
  };

  const handleNum4Change = (e) => {
    setNum4(parseInt(e.target.value));
  };

  const handleNum5Change = (e) => {
    setNum5(parseInt(e.target.value));
  };

  const handleNum6Change = (e) => {
    setNum6(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/members', [
        {
          pv: num1,
          fv: num2,
          r: num3,
          n: num4,
        },
        num1,
        num6,
      ]);
  
      const [abcData, portfolioAnalysisData] = response.data;
  
      setIsLoading(false);
      router.push({
        pathname: '/Idkk',
        
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
    <div style={{ background: '#fff', color: '#000' }}>
     <Navbarrrrr />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '20px',
            color: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="Rlogobg.png" alt="Loading" style={{ width: '100px', height: 'auto' }} />
          <p>Crunching the numbers... Hold on!</p>
        </div>
      )}

      {!isLoading && (
        
        <div style={{ height: '100%'}}>
           <Heading style={{ padding: '10px', textAlign: 'center', color: '#445F87' }}>
        We need some info to make the perfect basket for you.
      </Heading>
      <Heading style={{ padding: '10px', color: '#445F87' }}>
        Select a Goal
      </Heading>
      <div style={{ display: 'flex', marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }}>
        <img
          src="world.png"
          alt="Image 1"
          style={{ width: '200px', height: 'auto', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => handleImageClick('/world')}
        />
        <img
          src="bike.png"
          alt="Image 2"
          style={{ width: '200px', height: 'auto', marginLeft: '10px', cursor: 'pointer' }}
          onClick={() => handleImageClick('/bike')}
        />
      </div>
      <Heading style={{ padding: '10px', color: '#445F87' }}>
        Custom Goal
      </Heading>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            
          <form onSubmit={handleSubmit} style={{  fontWeight: 'bold', fontSize: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: '#445F87' }}>
              I'm Investing:
              
            </label>
            <input
                type="number"
                value={num1}
                onChange={handleNum1Change}
                style={{
                  height:'40px',
                  width:'400px',
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                }}
              />
            <label style={{  display: 'block', marginBottom: '10px', color: '#445F87' }}>
              Target Amount:
              
            </label>
            <input
                type="number"
                value={num2}
                onChange={handleNum2Change}
                style={{
                  height:'40px',
                  width:'400px',
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                }}
              />
            <label style={{ display: 'block', marginBottom: '10px', color: '#445F87' }}>
              Expected Rate of Return:
              
            </label>
            <input
            
                value={num3}
                onChange={handleNum3Change}
                style={{
                  height:'40px',
                  width:'400px',

                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                }}
              />
            <label style={{  display: 'block', marginBottom: '10px', color: '#445F87' }}>
              Risk-O-Meter:
              <input
  type="range"
  min={0}
  max={100}
  value={num6}
  onChange={handleNum6Change}
  style={{
    appearance: 'none',
    width: '100%',
    height: '10px',
    background: '#d3d3d3',
    outline: 'none',
    opacity: '0.7',
    transition: 'opacity 0.2s',
    borderRadius: '5px',
  }}
  className="range-slider"
/>

<style jsx>{`
  .range-slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #007BFF;
    border-radius: 50%;
    cursor: pointer;
  }

  .range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #007BFF;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .range-slider::-webkit-slider-thumb:hover {
    opacity: 1;
  }

  .range-slider::-moz-range-thumb:hover {
    opacity: 1;
  }
`}</style>
  
            </label>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '10px 20px',
                marginTop: '20px',
                marginLeft: 'auto',
                backgroundColor: '#007BFF',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Find Ideal Assets
            </button>
          </form>
          </div>
        </div>
      )}

     
    </div>
    </ChakraProvider>
  );
}

export default Connect;
