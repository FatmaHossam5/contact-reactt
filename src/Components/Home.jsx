import React, { useState ,useEffect} from 'react'
import axios from 'axios'

import  prof from'../assest/prof.jpeg'

export default function Home() {
    // let userId= "64fc4a747b1786417e354f31";
    let baseUrl="https://dummyapi.io/data/v1/user";
   
    const[input,setInput]=useState("");
    const[contacts,setContacts]=useState([])
    const[results,setResults]=useState([])
    const[contact,setContact]=useState({"firstName":"","lastName":"","email":"","picture":"","app-id":"64fc4a747b1786417e354f31"})




  async function getContacts(value){
    let {data}=await axios.get("https://dummyapi.io/data/v1/user",{
        headers:{
           "app-id":"64fc4a747b1786417e354f31"}
    })
 let result=data.data
  const res=result.filter((user)=>{
    return value&&user&&user.firstName&&user.firstName.toLowerCase().includes(value)
  })
  setResults(res)


    setContacts(data.data)



   


  }
  const getResult=(result)=>{
    setInput(result)
    getContacts(result)
    
}

  useEffect(()=>{
    getContacts()
  },[])

 function getContact ({target}){
    setContact({...contact,[target.name]:target.value})
 }
     
async function addContact(e){
    e.preventDefault();
    let {data}=await axios.post("https://dummyapi.io/data/v1/user/create",contact,{headers:{"app-id":"64fc4a747b1786417e354f31"}})
console.log(data)
if(data){

    document.getElementById('add-form').reset()
  getContacts()
}

}
async function deleteNote(id){
let{data}=await axios.delete(`https://dummyapi.io/data/v1/user/`+id,{headers:{"app-id":"64fc4a747b1786417e354f31"}},{


})
console.log(data)
if(id){
    getContacts()

}}


function getFName (e){
  
    setContact({...contact,firstName: e.target.value})
}
function getLName (e){
    setContact({...contact,lastName: e.target.value})
}

 function getData(idx){
  
setContact({...contact,'firstName':contacts[idx].firstName,"lastName":contacts[idx].lastName,contactID:contacts[idx].id})

 }
 async function updateContact(e,updatedData){
    e.preventDefault();
    const updateFields={};
    if(updatedData.firstName!==contact.firstName){
        updateFields.firstName=updatedData.firstName
    }
    if(updatedData.lastName!==contact.lastName){
        updateFields.lastName=updatedData.lastName
    }
  if(Object.keys(updateFields).length>0){
    let {data}= await axios.put(`https://dummyapi.io/data/v1/user/${contact.id}`,{updateFields},{headers:{"app-id":"64fc4a747b1786417e354f31"}},)

  }
  
 


}
return <>
<div className="container border my-5">
    <div className="search col-md-8 m-auto py-3">
        <input onChange={(e) => getResult(e.target.value)} type="text"placeholder='search by Name'id="search" />
    </div>
    {results.map((res, index) => {
               return (
                   <div key={index} className="users d-flex col-md-8 m-auto ">
                      <div className="left d-flex ">
                           <img className='prof ' src={res.picture} alt="profile" />
                          <div className="inform ms-5 my-3">
                              <h6 className='name py-2'>{res.firstName}</h6>
                               <h5 className='number'>{res.lastName}</h5>
                           </div>
                      </div>
                      <div className="icons  ">
                          <i className="fa-solid fa-pen-to-square fa-2x bg-white m-5  edit"></i>
                          <i className="fa-solid fa-trash bg-white fa-2x delete m-3"></i>
                      </div>
                  </div>
              )
          })}
    <div className="container my-5">
                <div className="col-md-12 text-end">
                    <a className="  add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-plus"></i> Add
                        New Contact</a>
                </div>
            </div>
              {/* <!-- Add Modal --> */}
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form id="add-form" onSubmit={addContact}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body  d-flex mx-2">
                            <input onChange={getContact} placeholder="firstName" name="firstName"id="firstName" className="form-control mx-2" type="text" />
                             <input onChange={getContact} placeholder="lastName" name="lastName" id="lastName" className="form-control mx-2" type="text" />
                            </div>
                            <div className="modal-body mx-2  d-flex">
                            <input onChange={getContact} placeholder="Email" name="email" className="form-control mx-2" type="text" />
                             <input onChange={getContact} placeholder="phone" name="phone" className="form-control mx-2" type="text" />
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Contact</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

             <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form  id="edit-form" onSubmit={(e,updatedData)=>{updateContact(e,updatedData)}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex mx-2">
                            <input onChange={(e)=>{getFName(e)}} placeholder="firstName" name="firstName" value={contact.firstName} className="form-control mx-2" type="text" />
                            <input onChange={(e)=>{getLName(e)}}  placeholder="lastName" name="lastName" value={contact.lastName}className="form-control mx-2" type="text" />
                            </div>
                            <div className="modal-body d-flex mx-2">
                            {/* <input onChange={getContact} placeholder="Email" name="email" className="form-control mx-2" type="text" /> */}
                            {/* <input onChange={getContact} placeholder="phone" name="phone" className="form-control mx-2" type="text" /> */}
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Contact</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

<div className="container">
    <div className="row">
    {contacts.map((cont,idx)=>{
        return(
            <div key={idx} className="users d-flex col-md-8 m-auto my-3 ">
            <div className=" cont left d-flex ">
                <div className="img-holder m-2">
                <img className='prof'src={cont.picture}  alt="profile" />
                </div>
           
<div className="inform  m-3">
<h6 className='name '>{cont.firstName} </h6>
<h5 className='number'>{cont.lastName}</h5>

</div>
</div>
<div className="icons m-4  ">
<a >
<i  data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>{getData(idx)}}   className="fa-solid fa-pen-to-square fa-2x mx-2  edit "></i>
</a>
<i onClick={()=>{deleteNote(cont.id)}} className="fa-solid fa-trash  fa-2x delete"></i>
</div>
</div>
        )
    })}
    </div>
</div>
  


</div>
</>


//   return <>
//      <div className="container border my-5">
//           {/* search-input */}
//           <div className='col-md-8 m-auto py-3'>
//               <input onChange={(e) => getResult(e.target.value)} type="text" name='search' id='search' placeholder='search by Name' />
//           </div>
//           {results.map((res, index) => {
//               return (
//                   <div key={index} className="users d-flex col-md-8 m-auto ">
//                       <div className="left d-flex ">
//                           <img className='prof ' src={res.picture} alt="profile" />
//                           <div className="inform ms-5 my-3">
//                               <h6 className='name py-2'>{res.firstName}</h6>
//                               <h5 className='number'>{res.lastName}</h5>
//                           </div>
//                       </div>
//                       <div className="icons  ">
//                           <i className="fa-solid fa-pen-to-square fa-2x bg-white m-5  edit"></i>
//                           <i className="fa-solid fa-trash bg-white fa-2x delete m-3"></i>
//                       </div>
//                   </div>
//               )
//           })}
//           {/* Add btn */}
       
         
        


//       </div> 
//                                         {/* Add-Modal */}
//       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <form id="add-form " onSubmit={addContact} >
//               <div className="modal-dialog">
//                   <div className="modal-content">
//                       <div className="modal-header">

//                       </div>
//                       <div className="modal-body  ">
//                           <div className="first d-flex py-4 ">
//                               <input  name="firstName" onChange={getContact} placeholder="firstName" className="form-control mx-5 " type="text" />
//                               <input name="lastName" onChange={getContact} placeholder="lastName"  className="form-control" type="text" />
//                           </div>
//                           <div className="sec d-flex">
//                               <input name="email" onChange={getContact} placeholder="email"  className="form-control mx-5" type="text" />
//                               <input name="picture" onChange={getContact} placeholder="picture"  className="form-control" type="text" />
//                           </div>



//                       </div>
//                       <div className="footer d-flex">
//                           <div className='cancel ms-5 my-1' >
//                               <button type="button" className="btn btn-secondary " data-dismiss="modal">cancel</button>

//                           </div>
//                           <div className='save me-5 my-1' >

//                               <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> save</button>
//                           </div>

//                       </div>

//                   </div>
//               </div>
//           </form>
//       </div> 
            
//       <div className="container my-5 btn col-md-12">
//               <div className="col-md-2 con ms-auto">
//                   <button className='Add '>
//                       <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-plus"></i>Add New Contact</a>
//                   </button>
//               </div>
//           </div>
          
//             {contacts.map((contact, index) => {
//               return (
//                   <div key={index} className="users d-flex col-md-8 m-auto my-3 ">
//                       <div className="left d-flex ">
//                         <div className="imgholder">
//                         <img className='prof w-100 ' src={contact.picture} alt="profile" />

//                         </div>
//                           <div className="inform  ">
//                               <h6 className='name '>{contact.firstName}</h6>
//                               <h5 className='number'>{contact.lastName}</h5>
//                           </div>
//                       </div>
//                       <div className="icons  m-3 d-flex  ">
//                           <i className="fa-solid fa-pen-to-square fa-2x mx-2 edit"></i>
//                           <i className="fa-solid fa-trash  fa-2x delete "></i>
//                       </div>
//                   </div>
//               )
//           })}
     
            
            
//  </>
 

}
 