import React from 'react';
import ReactCardFlip from 'react-card-flip';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [
        { id: 1, isFlipped: false, frontTitle: "How are we different?", backTitle: "We care for both our young ones and the grown ups. We provide goal based investing for the newbies and trading tools for experienced traders on a single platform !!" },
        { id: 2, isFlipped: false, frontTitle: "Utmost Privacy", backTitle: "We do not integrate any third party application for trading or investing. Your trading and investing data remains secured with us." },
        { id: 3, isFlipped: false, frontTitle: "Diversify with ease", backTitle: "Invest in stocks, crypto and much more on a single platform. We host 4 asset classes for you to choose from." },
        { id: 4, isFlipped: false, frontTitle: "We create you invest", backTitle: "We design portfolios catered specifically toward your goals. Leverage our AI to make your goals a reality." },
        { id: 5, isFlipped: false, frontTitle: "A complete analysis of your investments ", backTitle: "We analyse your profits and losses both based on the entirety of your portfolio, and also segment wise for each of the different asset classes you have invested in." },
    
      ]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(cardId) {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => {
        if (card.id === cardId) {
          return { ...card, isFlipped: !card.isFlipped };
        } else {
          return card;
        }
      })
    }));
  }

  render() {
    return (
      <div style={{
        height: '190vh',
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '60px', color: '#000', lineHeight: '60px', marginBottom: '50px' }}>Our Features</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '20px'
        }}>
          {this.state.cards.map(card => (
            <ReactCardFlip key={card.id} isFlipped={card.isFlipped} flipDirection="horizontal">
              {/* Front of the card */}
              <div
                onClick={() => this.handleClick(card.id)} // Handle click on the card container
                style={{
                  position: 'relative',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'rgb(255, 255, 255)',
                  borderRadius: '20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  width: '300px',
                  height: '500px' // Set the height of the card container
                }}
              >
                <img
                  src={`add.png`} alt={`Front of Card ${card.id}`}
                  style={{
                    position: 'absolute',
                    top: '25px',
                    right: '10px',
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
                <h2 style={{
                  fontFamily: '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                  fontSize: '32px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '-0.32px',
                  lineHeight: '40px',
                  textDecoration: 'unset'
                }}>{card.frontTitle}</h2>
                <img src={`image${card.id}.png`} alt={`Front of Card ${card.id}`} />
              </div>

              {/* Back of the card */}
              <div
                onClick={() => this.handleClick(card.id)} // Handle click on the card container
                style={{
                  position: 'relative',
                  backfaceVisibility: 'hidden',
                  backgroundColor: 'rgb(255, 255, 255)',
                  borderRadius: '20px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  width: '300px',
                  height: '500px' // Set the height of the card container
                }}
              >
                <img
                  src={`sub.png`} alt={`Back of Card ${card.id}`}
                  style={{
                    position: 'absolute',
                    top: '25px',
                    right: '10px',
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
                <h2 style={{
                    marginTop:'30px',
                  fontFamily: '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                  fontSize: '25px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  letterSpacing: '-0.32px',
                  lineHeight: '40px',
                  textDecoration: 'unset',
                  
                  width:'90%',
                }}>{card.backTitle}</h2>
              
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
