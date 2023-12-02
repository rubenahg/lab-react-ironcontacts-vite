import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"

function App() {
  const [contactState, changeContactState] = useState(contacts.slice(0,5))

  function getRandomContact() {
    const uniqueContacts = contacts.filter((contact) => !contactState.includes(contact))

    if (uniqueContacts.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * uniqueContacts.length);
    return uniqueContacts[randomIndex];
  }

  function addRandomContact() {
    const newContact = getRandomContact();
    changeContactState([...contactState, newContact]);
  }

  function sortByPopularity() {
    const unsortedContacts = [...contactState];
    const sortedContacts = unsortedContacts.sort((a, b) => b.popularity - a.popularity);
    changeContactState(sortedContacts);
  }
  
  function sortByName() {
    const unsortedContacts = [...contactState];
    const sortedContacts = unsortedContacts.sort((a, b) => a.name.localeCompare(b.name));
    changeContactState(sortedContacts);
  }

  function deleteItem(id){
    const currentList = [...contactState]
    const index = currentList.findIndex((contact) => contact.id === id);
    currentList.splice(index, 1);
    changeContactState(currentList);
  }

  return (
    <div className="App">
      <div style={{display: "flex", gap: "10px", margin: "30px 0"}}>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <p style={{padding: "0 50px"}}>|</p>
        <button onClick={sortByPopularity}>Sort by popularity</button>
        <button onClick={sortByName}>Sort by name</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Pop</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactState.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                    src={oneContact.pictureUrl}
                    alt={oneContact.name}
                    style={{ height: "100px" }}
                  />
                </td>
                <td>{oneContact.name}</td>
                <td>{oneContact.popularity}</td>
                <td>{oneContact.wonOscar ? "🏆" : ""}</td>
                <td>{oneContact.wonEmmy ? "🌟" : ""}</td>
                <td><button onClick={() => deleteItem(oneContact.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}



export default App;
