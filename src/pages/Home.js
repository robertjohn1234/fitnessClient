import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

	return (
		<>
        <Row>
            <Col className="p-4 text-center">
                <h1>Welcome To Your Workouts Tracker</h1>
                <p>Create, Update, Delete and View Your workouts</p>
                <Link className="btn btn-primary" to={'/workout-list'}>Check your Workouts</Link>
            </Col>
        </Row>
		</>
	)
}