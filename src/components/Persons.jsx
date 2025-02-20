const Persons = (props) => {
    return (
        <ul>
            {props.persons.map((person) => (
                <li key={person.id}>
                    {`${person.name} ${person.number}`}
                    <button
                        onClick={() => {
                            props.onClick(person.id);
                        }}
                    >
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Persons;
