import React from 'react';
import Modal from './Modal';
import { Field, Form, Formik } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

function AddUpdate({ isOpen, Close, isUpdate, selectedContact }) {
  // Function to handle adding a new contact
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Added contact successfully")
      Close();
    } catch (error) {
      console.log("Error adding contact...", error);
    }
  };

  // Function to handle updating an existing contact
  const updateContact = async (contact) => {
    try {
      const contactRef = doc(db, "contacts", selectedContact.id);
      await updateDoc(contactRef, contact);
      Close();
      toast.success("updated contact successfully")
    } catch (error) {
      console.log("Error updating contact...", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} isClose={Close}>
        <Formik
          initialValues={
            isUpdate && selectedContact
              ? {
                  name: selectedContact.name || "",
                  email: selectedContact.email || "",
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            if (isUpdate) {
              updateContact(values); // Update the contact if in update mode
            } else {
              addContact(values); // Add a new contact otherwise
            }
          }}
        >
          <Form>
            <div className='flex flex-col gap-2 mb-3'>
              <label htmlFor='name'>Name</label>
              <Field name='name' className="border-black outline-none border" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email</label>
              <Field name='email' className="border-black outline-none border" />
            </div>

            <button
              type='submit'
              className='bg-orange-500 mt-3 rounded text-black px-3 py-1.5 border border-black hover:bg-white'
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddUpdate;
