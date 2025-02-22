import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
    const [countries, setCountries] = useState([]); //'too many matches specify another filter'
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((response) => {
                setCountries(response.data);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    const handleShowCountry = (countryName) => {
        setFilter(countryName);
    };

    return (
        <div>
            find countries
            <input value={filter} onChange={handleFilterChange} />
            {filter && filteredCountries.length > 10 && (
                <p>too many matches specify another filter</p>
            )}
            {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
                <ul>
                    {filteredCountries.map((country) => (
                        <li key={country.name.common}>
                            {country.name.common}{' '}
                            <button
                                onClick={() => {
                                    handleShowCountry(country.name.common);
                                }}
                            >
                                Show
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {filteredCountries.length === 1 && (
                <Country country={filteredCountries} />
            )}
        </div>
    );
};

export default App;
