

import styles from "./contact.module.css"

export function Contact(props){
    const {contact, deleteContact, setShowContact,setPage }= props
    if(!contact){
        console.log(contact)
        return
    }



    const handleEdit = ()=>{
        
        setPage("add Contact")
        setShowContact(contact)
    }

    const handleDelete= (id)=>{
        deleteContact(id)
    }

    let address= contact.address;
    let company=contact.company;


    

    return (
        <>

        <div className={styles.contact}>
        <div className={styles.icon}>
        <i class="fa-solid fa-user-pen" onClick={()=>handleEdit()}></i>
        <i class="fa-solid fa-delete-left" onClick={()=>handleDelete(contact.id)}></i>
        </div>
            <h3>
                {contact.name}
                 
            </h3>
            <div className={styles.company}>
                <h4>Working At:</h4>
                <p>{company.name}</p>
                <br/>
                <h4>About:</h4>
                <p>{company.bs},</p>
                <p>{company.catchPhrase}</p>
            </div>
            
            <div className={styles.address}>
                <h4>Address:</h4>
                <p>{address.suite}</p> 
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.zipcode +"zip"}</p> 
            </div>

            <div className={styles.ep}>
                Email: 
                {contact.email}
            </div>

            <div className={styles.ep}>
                Phone: 
                {contact.phone}
            </div>
            
            {/* <button>Update</button>
            <button>Delete</button> */}
        </div>

        
        </>
    )

}