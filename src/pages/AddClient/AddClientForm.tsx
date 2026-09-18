// import { useState } from "react";
// import { useCreateClient } from "../../services/mutations/userMutations";
// import { ClientType } from "../../types/clientType";

// const initialFormValues = {
//   clientName: "",
//   clientPhone: "",
//   clientEmail: "",
// };

// function AddClientForm() {
//   const [formValues, setFormValues] = useState<ClientType>(initialFormValues);
//   // const createClientMutation = useCreateClient();
//   function handleFormValues(event: React.ChangeEvent<HTMLInputElement>) {
//     setFormValues({
//       ...formValues,
//       [event.target.name]: event.target.value,
//     });
//   }
//   function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     console.log(formValues);
//     // createClientMutation.mutate(formValues);
//     // console.log(createClientMutation.data);
//     // setFormValues(initialFormValues);
//   }
//   return (
//     <div>
//       <form className="grid grid-cols-3 gap-10" onSubmit={handleFormSubmit}>
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">Client Name: </span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             name="clientName"
//             value={formValues.clientName}
//             className="input input-bordered w-full max-w-xs"
//             onChange={handleFormValues}
//           />
//         </label>
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">Client Phone:</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             name="clientPhone"
//             value={formValues.clientPhone}
//             className="input input-bordered w-full max-w-xs"
//             onChange={handleFormValues}
//           />
//         </label>
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">Client Email:</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             name="clientEmail"
//             value={formValues.clientEmail}
//             className="input input-bordered w-full max-w-xs"
//             onChange={handleFormValues}
//           />
//         </label>

//         <button className="btn">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default AddClientForm;
