import React from "react";
import { ContactForm } from "../../../components/Dashboard/ContactForm";
import { getContacts } from "@/lib/api";

const ContactsPage = async () => {
  const contactsData = await getContacts();

  return (
    <div className="container mx-auto px-4 py-8">
      <ContactForm initialContacts={contactsData?.data || []} />
    </div>
  );
};

export default ContactsPage;
