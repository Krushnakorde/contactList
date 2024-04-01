import styles from "./contactList.module.css"
import { Contact } from "../contact/contact"
import {AddContact} from "../addContact/addContact"
import { useEffect , useState} from "react"
import { toast } from "react-toastify";


export function ContactList (){
    const [contacts, setContacts]=useState([]);
    const [showContact, setShowContact]= useState(null);
    const [page, setPage]= useState("contacts");

    useEffect(()=>{
        try{

            async function fetchContacts (){
                await fetch("https://jsonplaceholder.typicode.com/users")
                    .then((res)=>res.json())
                    .then((res)=>setContacts(res));
            }
            fetchContacts()

        }catch(error){
            console.log(error)
        }
        
        
    },[])

    useEffect(()=>{
        
    },[contacts])

    const addContact = async (contact)=>{
        try{

            await fetch("https://jsonplaceholder.typicode.com/users", {
                method:"POST",
                body:JSON.stringify(contact),
                headers:{
                    'Content-type':'application/json; charset=UTF-8',
                },
            })
            .then(response=>response.json())
            .then((json)=>console.log(json));
    
            setContacts([...contacts, contact])
            
            toast.success("Contact saved.",{
                toastId:"delete"
            })

        }catch(error){
            console.log(error)
        }
    
        
    }


    const deleteContact = async (id)=>{
        try{

            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method:"DELETE",
            })
           const conta= contacts.filter((con)=>con.id!==id) 
    
           setContacts(conta)
    
           toast.dark("Contact is deleted.", {
            toastId:"2"
           }) 

        }catch(error){
            console.log(error)
        }
        

    }


    const updateContact = async (contact)=>{
        
        try{
            await fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
                method:"PUT",
                body:JSON.stringify(contact),
                headers:{
                    'Content-Type':'application/json; charset=UTF-8'
                }
            })
            .then(response=>response.json())
            .then(json=>console.log(json))

            const index = contacts.findIndex(conta=>conta.id==contact.id)
            contacts[index]=contact;
            setContacts([...contacts])

            toast.info("Contact updated.", {
                toastId:"update1"
            })

        }catch(err){
            console.log(err)
        }
    }

    const toggle = (e)=>{
        e.preventDefault();
        console.log(page)
        if(page=="contacts"){
            setPage("addContact")
        }else{
            setPage("contacts");
        }
    }


    if(!contacts){
        return;
    }


    return (
        <>
        <nav className={styles.nav}>
            <h1>ContactList</h1>
            <button onClick={toggle}>{page=="contacts"?"Add New Contact":"Show Contacts"}</button>
        </nav>

        {page!=="contacts"?
             <AddContact addContact={addContact} showContact={showContact} setShowContact={setShowContact} updateContact= {updateContact}/>
        :
            <div className={styles.contactListContainer}>
                {contacts.map((contact, i)=><><Contact key={i} contact={contact} deleteContact={deleteContact} setShowContact={setShowContact} setPage={setPage}/></>)}
            </div>
        }
       </>
    )
}