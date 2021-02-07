import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReservationsView = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Link to="/">&larr; Tillbaka</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            Reservations!
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ReservationsView;