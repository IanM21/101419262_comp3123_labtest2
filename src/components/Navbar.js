import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Navigation({ onSearch }) {
    const [loading, setLoading] = useState(false);

    // Array of cities to get random city
    const cities = [
        // North America
        'New York', 'Los Angeles', 'Toronto', 'Chicago', 'Vancouver', 'Montreal', 'Miami', "Calgary",
        "Houston", "Dallas", "Atlanta", "Seattle", "Boston", "San Francisco", "Las Vegas", "Washington",
        "Philadelphia", "Denver", "Phoenix", "San Diego", "Detroit", "Minneapolis", "Tampa", "Orlando",
        "Mexico City", "Monterrey", "Guadalajara", "Cancún", "Puerto Vallarta", "Acapulco", "Tijuana",
        "Havana", "Kingston", "Montego Bay", "Nassau", "San Juan", "Santo Domingo", "Port-au-Prince",

        // Europe
        'London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Helsinki',
        'Prague', 'Barcelona', 'Oslo', 'Zurich', 'Reykjavik',

        // Asia
        'Tokyo', 'Seoul', 'Beijing', 'Shanghai', 'Singapore', 'Dubai', 'Mumbai', 'Istanbul',
        'Kuala Lumpur',

        // Oceania
        'Sydney', 'Melbourne', 'Auckland', 'Brisbane', 'Perth',

        // South America
        'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Santiago', 'Medellín',

        // Africa
        'Cairo', 'Cape Town', 'Nairobi', 'Casablanca', 'Lagos', 'Marrakech',

        // Other
        'Honolulu', 'Tahiti', 'Bora Bora', 'Fiji', 'Bali', 'Maldives', 'Seychelles'
    ];


    const getRandomCity = async () => {
        setLoading(true);
        try {
            // Get random city from array
            const randomCity = cities[Math.floor(Math.random() * cities.length)];

            // Call the onSearch prop with the random city
            await onSearch(randomCity);
        } catch (error) {
            console.error('Error getting random city:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#" className='disabled'>
                    <i className="fas fa-cloud-sun me-2"></i>
                    Weather App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Button
                        variant="primary"
                        onClick={getRandomCity}
                        disabled={loading}
                        className="d-flex align-items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-random"></i>
                                Random City
                            </>
                        )}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;