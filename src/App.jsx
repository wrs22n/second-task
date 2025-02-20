import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({
        message: '',
        type: '',
    });

    useEffect(() => {
        personsService.getAll().then((response) => setPersons(response));
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with new one?`
                )
            ) {
                const person = persons.find((n) => newName === n.name);
                const changePersonNumber = { ...person, number: newNumber };

                personsService
                    .update(changePersonNumber.id, changePersonNumber)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === changePersonNumber.id
                                    ? returnedPerson
                                    : person
                            )
                        );
                        setNotificationMessage({
                            message: 'Number Changed',
                            type: 'success',
                        });
                        setTimeout(() => {
                            setNotificationMessage({
                                message: '',
                                type: '',
                            });
                        }, 5000);
                    })
                    .catch((error) => {
                        setNotificationMessage({
                            message: `Information of ${person.name} has already been removed from server`,
                            type: 'error',
                        });
                        setTimeout(() => {
                            setNotificationMessage({
                                message: '',
                                type: '',
                            });
                        }, 5000);
                    });
            } else {
                return;
            }
        } else {
            const personObject = {
                name: newName,
                id: String(persons.length + 1),
                number: newNumber,
            };
            personsService
                .create(personObject)
                .then((response) => {
                    setPersons(persons.concat(response));
                    setNewName('');
                    setNewNumber('');
                    setNotificationMessage({
                        message: `Added ${response.name}`,
                        type: 'success',
                    });
                    setTimeout(() => {
                        setNotificationMessage({
                            message: '',
                            type: '',
                        });
                    }, 5000);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const deletePerson = (id) => {
        personsService
            .remove(id)
            .then(() => setPersons(persons.filter((p) => p.id !== id)))
            .catch((error) => {
                console.error(error);
            });
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            {notificationMessage.message && (
                <Notification
                    message={notificationMessage.message}
                    type={notificationMessage.type}
                />
            )}
            <Filter value={filter} onChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} onClick={deletePerson} />
        </div>
    );
};

export default App;
