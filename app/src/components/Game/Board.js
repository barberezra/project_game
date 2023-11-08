import {PlayingPits, ScoringPits } from './AllPits.js';
import {Container, Col, Row} from 'react-bootstrap';
import '../styles/Board.css';

const Board = () => {
  function hey() {
    console.log('give it up');
  }
    return (
        <div>
        <Container className='board'>
          <Col className='section'>
            <ScoringPits position={14} pitVal={0} />
          </Col>
          <Col className='middle'>
            <Row style={{ display:'inline' }}>
              <PlayingPits position={13} pitVal={4} group={1}/>
              <PlayingPits position={12} pitVal={4} group={1}/>
              <PlayingPits position={11} pitVal={4} group={1}/>
              <PlayingPits position={10} pitVal={4} group={1}/>
              <PlayingPits position={9} pitVal={4} group={1}/>
              <PlayingPits position={8} pitVal={4} group={1}/>
            </Row>
            <br />
            <Row style={{ display:'inline' }}>
              <PlayingPits position={1} pitVal={4} group={2}/>
              <PlayingPits position={2} pitVal={4} group={2}/>
              <PlayingPits position={3} pitVal={4} group={2}/>
              <PlayingPits position={4} pitVal={4} group={2}/>
              <PlayingPits position={5} pitVal={4} group={2}/>
              <PlayingPits position={6} pitVal={4} group={2}/>
            </Row>
          </Col>
          <Col className='section'>
            <ScoringPits position={7} pitVal={0}/>
          </Col>
        </Container>
      </div>
    );
}

export default Board;