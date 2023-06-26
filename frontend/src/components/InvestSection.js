import { Button } from '@chakra-ui/react';
import Image from 'next/image';

const InvestmentInfo = () => {
  return (
    <div className="container">
      <div className="image-container">
        <Image src="/mockup 1.png" alt="Investment Image" width={500} height={500} />
      </div>
      <div className="text-container">
        <h2 className="investment-heading">Investing</h2>
        <p className="portfolio-text">Doesn't have to be that hard</p>
        <p>Access stocks, cryptos, and much more on Richin. No panic, no research. Get started and leave the rest to us.</p>
        <Button
          as={"a"}
          fontSize={"sm"}
          fontWeight={700}
          variant={"link"}
          color={"#000"}
          href="/signupp"
          paddingX={10}
          paddingY={7}
          borderStyle={"solid"}
          borderWidth={1}
          _hover={{
            textDecoration: "none", // Remove the underline on hover
          }}
          borderColor="#000"
          width="130.2px"
          height="56px"
          borderRadius={30}
          marginLeft={'18vh'}
        >
          Learn more
        </Button>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          background: #c3f53c;
        }
        .image-container {
          margin-top: 6vh;
          margin-left: 20vh;
          width: auto;
          height: 100vh;
        }
        .image-container img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          
        }
        .text-container {
          
          display: flex;
          flex-direction: column;
          margin-left: 100px; /* Add margin-left to create space between the image and text */
        }
        .text-container .investment-heading {
          margin-left: 18vh;
          font-size: 60px;
          line-height: 65px;
          color: #00c805;
          width: 450px;
        }
        .text-container p.portfolio-text {
          margin-left: 18vh;
          font-size: 60px;
          line-height: 65px;
          margin-bottom: 24px;
          width: 450px;
        }
        .text-container p {
          margin-left: 18vh;
          font-size: 20px;
          line-height: 24px;
          margin-bottom: 24px;
          width: 450px;
        }
        .disclosures {
          
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default InvestmentInfo;
