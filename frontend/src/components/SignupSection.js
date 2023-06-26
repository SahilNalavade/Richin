import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const ImageSection = () => {
  return (
    <section className="image-section">
      <div className="image-overlay">
        <div className="content">
          <p>Get smarter at Investing</p>
          <p>Join us to grow Your Money.</p>
         
          <Button
  as={"a"}
  display={{ base: "none", md: "inline-flex" }}
  fontSize={"sm"}
  fontWeight={600}
  color={"#fff"}
  href="/CreateAccount"
  bg={"#000"}
  paddingX={10}
  paddingY={7}
  borderRadius={30}
  marginTop={10}
  _hover={{ textDecoration: "none", backgroundColor: "#000" }} // Add this line to remove hover effect
>
  Sign Up
</Button>

          {/* <Link legacyBehavior href="/Landing#section3">
        <a>Scroll to Section 1</a>
      </Link> */}
        </div>
      </div>
      <style jsx>{`
        .image-section {
          position: relative;
          height: 100vh;
          background-image: url('/stockbg.jpg');
          background-size: 120%;
          background-repeat: no-repeat;
          background-position: center bottom 15%; /* Adjust the value as needed */
        }
        
        .image-overlay {
          position: absolute;
          top: 10%;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .content {
          text-align: center;
          color: #000;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.8);
          border-radius: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
          padding: 50px;
        }
        
        
        p {
          font-size: 60px;
           line-height:55px; 
        }
      `}</style>
    </section>
  );
};

export default ImageSection;
