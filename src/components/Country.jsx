const Country = ({ country }) => {
    const [countryData] = country;
    return (
        <div>
            <h2>{countryData.name.common}</h2>
            <p>{`Capital ${countryData.capital}`}</p>
            <p>{`Area ${countryData.area}`}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={countryData.flags.png} />
        </div>
    );
};

export default Country;
