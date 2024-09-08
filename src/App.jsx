import phonebook from './modules/phonebook';
import Filter from './componets/Filter';
import Input from './componets/Input';
import Display from './componets/Display';
import Notification from './componets/Notification';
import './index.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [message, setMessage] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  // fetching all numbers
  useEffect(() => {
    phonebook.getAll().then(resolve => setPeople(resolve.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (newName === '' || newNumber === '') {
      setErrMessage('You have to input some values');
      return setTimeout(() => setErrMessage(null), 1500);
    };

    const nameIncluded = people.find((person) => person.name === newName);

    if (nameIncluded) return updatePhone(nameIncluded);

    const newPerson = { name: newName, number: newNumber };

    phonebook.addNumber(newPerson)
      .then(response => {
        setPeople(people.concat(response.data));
        clearInputs();
  
        setMessage('Added to phonebook');
        setTimeout(() => setMessage(null), 1500);
      });
  };

  const deletePhone = (id) => {
    return () => {
      if (!window.confirm('are you sure?')) return;

      phonebook.deleteNumber(id)
        .then(response => {
          console.log(response);
          const newPeople = people.filter(n => n.id !== id);
          setPeople(newPeople);
          clearInputs();
  
          setMessage('Deleted ' + response.data.name);
          setTimeout(() => setMessage(null), 1500);
        })
        .catch(error => {
          const newPeople = people.filter(p => p.id !== id);
          setPeople(newPeople);
  
          setErrMessage(`Information was deleted from server`);
          setTimeout(() => setErrMessage(null), 2000);
        });
    }
  };

  const updatePhone = (person) => {
    const text = `${person.name} was already added to phonebook, are you sure to update it ?`;

    if (!window.confirm(text)) return clearInputs();

    const newPerson = { ...person, number: newNumber };

    phonebook.updateNumber(person.id, newPerson)
      .then(response => {
        const newPeople = people.map(n => n.id === person.id ? response.data : n);
        setPeople(newPeople);
        clearInputs();
  
        setMessage('Updated phonebook');
        setTimeout(() => setMessage(null), 1500);
      })
      .catch(error => {
        const newPeople = people.filter(p => p.id !== person.id);
        setPeople(newPeople);
        clearInputs();
  
        setErrMessage(`Information of ${newName} was deleted from server`);
        setTimeout(() => setErrMessage(null), 2000);
      });
  };
  
  const filterPeople =(e) => {
    const target = e.target.value.toLowerCase();

    if (target === '') return setFilteredPeople([]);

    const filtered = people.filter(p => p.name.toLowerCase().includes(target));
    setFilteredPeople(filtered);
  };

  const changeName = (e) => setNewName(e.target.value);
  const changeNumber = (e) => setNewNumber(e.target.value);
  const clearInputs = () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
    setNewName('');
    setNewNumber('');
  };
  
  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification text={message} classN='succes' />
      <Notification text={errMessage} classN='error' />
      <Filter onFilter={filterPeople} filteredData={filteredPeople} />
      <form onSubmit={addPerson}>
        <Input text='Name' onChange={changeName} />
        <Input text='Number' onChange={changeNumber} />
        <button type='submit'>Add</button>
      </form>
      <Display text='Numbers' data={people} deleteFunc={deletePhone} />
    </div>
  );
};

export default App;