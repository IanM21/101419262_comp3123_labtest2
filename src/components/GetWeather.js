import { getWeatherUrl } from './Constants';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Navigation from './Navbar';
import ForecastList from './ForcastList';

const GetWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(''); // New state for location
    const [error, setError] = useState(null);

    const handleSearch = async (city) => {
        try {
            const response = await fetch(getWeatherUrl(city));
            const data = await response.json();
            if (data.list) {
                const forecasts = data.list.filter((days) =>
                    days.dt_txt.includes("12:00:00")
                ).slice(0, 5); // Limit to 5 days
                setWeatherData(forecasts);
                setLocation(data.city.name); // Set the city name
                setError(null);
            } else {
                setError('City not found');
                setWeatherData(null);
                setLocation('');
            }
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeatherData(null);
            setLocation('');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navigation onSearch={handleSearch} />
            <Container className='mt-4'>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(e.target.city.value);
                }}>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            <Form.Group className="d-flex w-100 gap-3">
                                <Form.Control
                                    type="text"
                                    name="city"
                                    placeholder="Enter city name"
                                    className="rounded-3"
                                    required
                                />

                                <button className="btn btn-primary rounded-3" type="submit">
                                    Search
                                </button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row className="justify-content-center mt-4">
                    <Col md={10}>
                        {error && (
                            <Alert variant="danger" className="mb-4 rounded-3">
                                {error}
                            </Alert>
                        )}
                        {weatherData && <ForecastList forecasts={weatherData} location={location} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default GetWeather;