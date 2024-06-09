import React from 'react';
import './index.css'; // Ensure Tailwind CSS is properly included
import ContactList from './Components/ContactList';
import ContactForm from './Components/ContactForm';
import "./App.css";

function App() {
  return (
    <div className="min-h-screen  flex flex-col">
      <header className="bg-indigo-600 bg-opacity-25 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-bold">Contact Manager</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <ContactForm />
        </div>
        <div className="md:w-1/2">
          <ContactList />
        </div>
      </main>
    </div>
  );
}

export default App;
