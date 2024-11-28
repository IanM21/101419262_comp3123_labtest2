import { Card, Row, Col, Container } from 'react-bootstrap';
import { getIconUrl } from './Constants';
import './Card.css';

const ForecastList = ({ forecasts, location }) => {
    if (!forecasts || forecasts.length === 0) return null;

    // Separate current day and remaining days
    const currentDay = forecasts[0];
    const nextDays = forecasts.slice(1);

    const getBackgroundClass = (temp) => {
        if (temp > 25) return 'bg-success bg-opacity-25';
        if (temp > 17) return 'bg-warning bg-opacity-25';
        if (temp > 10) return 'bg-info bg-opacity-25';
        return 'bg-primary bg-opacity-25';
    };

    return (
        <Container>
            {/* Current day as a large card */}
            <Card className={`${getBackgroundClass(currentDay.main.temp)} border-0 shadow-sm rounded-4 mb-4 p-3`}>
                <Card.Body>
                    <h3 className="text-center mb-4">{location}</h3>
                    <div className="text-center">
                        <p className="text-muted mb-1">
                            {new Date(currentDay.dt_txt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </p>
                        <img
                            src={getIconUrl(currentDay.weather[0].icon)}
                            alt={currentDay.weather[0].description}
                        />
                        <h5 className="text-capitalize">{currentDay.weather[0].description}</h5>
                        <h3>{currentDay.main.temp.toFixed(1)}°C</h3>
                        <p className="text-muted">
                            Feels like: {currentDay.main.feels_like.toFixed(1)}°C
                        </p>
                    </div>
                </Card.Body>
            </Card>

            {/* Next 4 days as smaller cards */}
            <Row xs={2} sm={2} md={4} className="g-3">
                {nextDays.map((forecast, index) => (
                    <Col key={index}>
                        <Card className={`${getBackgroundClass(currentDay.main.temp)} border-0 shadow-sm rounded-4 p-3 text-center`}>
                            <p className="text-muted mb-1">
                                {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                            <img
                                src={getIconUrl(forecast.weather[0].icon)}
                                alt={forecast.weather[0].description}
                            />
                            <p className="text-capitalize small">{forecast.weather[0].description}</p>
                            <p className="fw-bold">{forecast.main.temp.toFixed(1)}°C</p>
                            <p className="small text-muted">
                                Feels like: {forecast.main.feels_like.toFixed(1)}°C
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ForecastList;
