import { useRef, useEffect } from "react";
import styles from "./addContact.module.css"


export function AddContact (props){
    let name= useRef();
    let email = useRef();
    let phone = useRef();
    let suite = useRef();
    let street= useRef();
    let city= useRef();
    let zipcode = useRef();
    let companyname= useRef();
    let companycatchphrase = useRef();
    let companybs = useRef();


    const {addContact, setShowContact, showContact, updateContact}= props;
    console.log(showContact)

    useEffect(()=>{
        if(showContact){
            let address= showContact.address;
            let company=showContact.company;
            
                name.current.value= showContact.name;
                email.current.value=showContact.email;
                phone.current.value=showContact.phone;
            
            if(address){
                suite.current.value=address.suite;
                street.current.value= address.street;
                city.current.value=address.city;
                zipcode.current.value=address.zipcode;
            }
            if(company){
                companyname.current.value=company.name;
                companycatchphrase.current.value=company.catchPhrase;
                companybs.current.value=company.bs;
            }
        }
    }, [showContact])

    const handleSubmit=(e)=>{
        e.preventDefault();
      
        let contact ={
            name:name.current.value, 
            email:email.current.value, 
            phone:phone.current.value, 
            address:{
                suite:suite.current.value, 
                street: street.current.value, 
                city:city.current.value, 
                zipcode:zipcode.current.value
            }, 
            company:{
                name:companyname.current.value,
                catchPhrase:companycatchphrase.current.value, 
                bs:companybs.current.value
            }}
        addContact(contact)
        clear();
    
    }   

    const update=async (e)=>{
        e.preventDefault();
        let contact ={
            id:showContact.id,
            name:name.current.value, 
            email:email.current.value, 
            phone:phone.current.value, 
            address:{
                suite:suite.current.value, 
                street: street.current.value, 
                city:city.current.value, 
                zipcode:zipcode.current.value
            }, 
            company:{
                name:companyname.current.value,
                catchPhrase:companycatchphrase.current.value, 
                bs:companybs.current.value
            }}

            await updateContact(contact);
            clear(); 
            setShowContact(null);
    }




    const clear =()=>{
        name.current.value="";
        email.current.value="";
        phone.current.value='';
        suite.current.value='';
        street.current.value='';
        city.current.value='';
        zipcode.current.value='';
        companyname.current.value='';
        companycatchphrase.current.value=''
        companybs.current.value=''
    }

    return (
        <>
        <div className={styles.formContainer}>
            <form onSubmit={showContact? update: handleSubmit}>
                <h2>Contact Details</h2>

                <label>NAME:</label>
                <input ref={name} required/>
                <br/>

                <label>PHONE:</label>
                <input ref={phone} required/>

                <label>EMAIL:</label>
                <input ref={email} required/>

                <div className={styles.address}>
                    <h4>ADDRESS</h4>

                    <label>Area:</label>
                    <input ref={suite} required />

                    <label>Street:</label>
                    <input ref={street} required />

                    <div>
                    <label>City:</label>
                    <input ref={city} required />

                    <label>Zipcode:</label>
                    <input ref={zipcode} required/>
                    </div>
                </div>

            

                <div className={styles.company}>
                    <h4>JOB DETAILS</h4>
                    <label>Company Name:</label>
                    <input ref={companyname} required />

                    <label>Company Moto:</label>
                    <input ref={companycatchphrase} required />
                    <br/>
                    <label className={styles.textareaLabel}>About Company:</label>
                    <textarea ref={companybs} required />
                
                </div>

                <button>{showContact?"Update Contact":"Save Contact"}</button>

            </form>
        </div>  
        </>
    )
}