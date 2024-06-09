import React, { useEffect, useState } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('http://localhost:5000/contacts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        fetchContacts(); // Re-fetch contacts after deletion
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Contact List</h2>
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
              <span>
                {contact.name} - {contact.email}
              </span>
              <button
                onClick={() => deleteContact(contact._id)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;
