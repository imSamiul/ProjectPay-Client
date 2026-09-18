// import { ClientType } from "../../types/clientType";

// function ClientList() {
//   const { data, isLoading, isError } = useClientList();

//   // Handle loading state
//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   // Handle error state
//   if (isError) {
//     return <p>Something went wrong while fetching the client list.</p>;
//   }

//   // Handle empty data state
//   if (!data || data.clientsList.length === 0) {
//     return <p>No clients available.</p>;
//   }
//   return (
//     <div className="container mx-auto my-5 px-10">
//       <h1 className="text-3xl font-bold">Client List</h1>
//       <div className="divider"></div>

//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>View Profile</th>
//               <th>Assign a project</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.clientsList.map((client: ClientType, index: number) => (
//               <tr key={index} className="hover">
//                 <th>{index}</th>
//                 <td>{client.name}</td>
//                 <td>{client.email}</td>
//                 <td>{client.phone}</td>
//                 <td>
//                   <button>Profile</button>
//                 </td>
//                 <td>
//                   <button>Assign</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ClientList;
