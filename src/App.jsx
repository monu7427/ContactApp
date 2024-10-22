import { FaSearch, FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import './App.css';
import Navbar from './components/Navbar';
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import AddUpdate from "./components/AddUpdate";
import ClouserSet from "./hook/ClouserSet";
import NoFound from "./components/NoFound";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search state
  const [selectedContact, setSelectedContact] = useState(null);
  const { Open, Close, isOpen } = ClouserSet();
  const [isUpdate, setUpdate] = useState(false);

  // Function to handle contact deletion
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.error("Deleted contact", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log("Error deleting contact...", error);
    }
  };

  // Fetching data from Firebase DB
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);
        const contactList = contactSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContact(contactList);
      } catch (error) {
        console.log("Error fetching contacts...", error);
      }
    };

    getContacts();
  }, []);

  // Function to handle edit button click
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setUpdate(true);
    Open();
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };

  // Filter contacts based on search term (case insensitive)
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className='flex justify-center mt-4'>
        {/* Search component */}
        <div className='flex bg-black border-2 px-3 py-1 border-slate-400 w-[60%] rounded'>
          <FaSearch className="text-slate-300 text-2xl" />
          <input
            type="text"
            className="bg-black w-full ml-2 outline-none text-slate-400"
            placeholder="Search Contacts"
            value={searchTerm} // Bind the search term state to the input field
            onChange={handleSearchChange} // Trigger the change handler
          />
        </div>
        <IoIosAddCircle
          onClick={() => {
            setSelectedContact(null);
            setUpdate(false);
            Open();
          }}
          className="bg-black ml-2 text-white text-4xl cursor-pointer"
        />
      </div>

      {/* Contact list */}
      <div className="flex justify-center items-center mt-6 px-4 flex-col space-y-4 text-black">
        {filteredContacts.length === 0 ? (
          <NoFound />
        ) : (
          filteredContacts.map((val) => (
            <div key={val.id} className="bg-[#fff197] w-full max-w-[90%] py-5 flex items-center rounded-lg md:max-w-[65%] overflow-hidden">
              <div className="flex justify-center items-center w-[10%] min-w-[40px]">
                <IoMdContact className="text-3xl md:text-4xl text-black" />
              </div>
              <div className="text-slate-800 ml-3 flex-grow overflow-hidden">
                <h3 className="truncate text-sm md:text-base">{val.name}</h3>
                <p className="truncate text-xs md:text-sm">{val.email}</p>
              </div>
              <div className="flex ml-auto space-x-3 items-center mr-2">
                <FaEdit
                  onClick={() => handleEdit(val)}
                  className="text-black text-lg md:text-xl cursor-pointer"
                />
                <MdDelete
                  onClick={() => deleteContact(val.id)}
                  className="text-red-600 text-lg md:text-xl cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <AddUpdate
        isOpen={isOpen}
        Close={Close}
        isUpdate={isUpdate}
        selectedContact={selectedContact}
      />

      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
