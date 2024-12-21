import React from "react";
import useAllUsers from "../../../Utils/Hooks/useAllUsers";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa6";
const ManegeUsers = () => {
  const [users] = useAllUsers();
  console.log(users);
  return (
    <div class="mx-auto pt-2">
      <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
        <p class="block w-full px-4 py-1 text-center text-black transition-all ">
          Manage All <b>Users</b>.
        </p>
      </div>

      {users.length === 0 ? (
       <div className="flex justify-center py-5">
       <div className="inline-flex items-center gap-1 border border-gray-700 rounded-md px-4 py-2">
         <FaExclamation />
         No Users Found
       </div>
     </div>
     
      ) : (
        <div class="relative flex flex-col w-full h-full overflow-scroll text-black bg-white shadow-md rounded-lg bg-clip-border">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="p-4 border-b border-slate-600 bg-white">
                  <p class=" text-sm leading-none text-gray-900 font-semibold">
                    Image
                  </p>
                </th>
                <th class="p-4 border-b border-slate-600 bg-white">
                  <p class=" text-sm leading-none text-gray-900 font-semibold">
                    Name
                  </p>
                </th>
                <th class="p-4 border-b border-slate-600 bg-white">
                  <p class="text-sm  leading-none text-gray-900 font-semibold">
                    Email
                  </p>
                </th>
                <th class="p-4 border-b border-slate-600 bg-white">
                  <p class="text-sm  leading-none text-gray-900 font-semibold">
                    Status
                  </p>
                </th>
                <th class="p-4 border-b border-slate-600 bg-white">
                  <p class="text-sm  leading-none text-gray-900 font-semibold">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} class="hover:bg-slate-200">
                  <td class="p-4 border-b border-slate-700">
                    <img
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                      src={user?.photoURL}
                    />
                  </td>
                  <td class="p-4 border-b border-slate-700">
                    <p class="text-sm text-black font-medium">{user?.name}</p>
                  </td>
                  <td class="p-4 border-b border-slate-700">
                    <p class="text-sm text-black">{user?.email}</p>
                  </td>
                  <td class="p-4 border-b border-slate-700">
                    <div className="flex  items-center gap-2">
                      <button className="flex items-center justify-center gap-2 text-black bg-gray-300  py-1 px-3 rounded-md">
                        {user?.status}
                      </button>
                      {user?.status === "Sellers" && (
                        <button
                          onClick={() => handleStatusChange(user._id, "Buyers")}
                          className="text-white bg-blue-500 py-1 px-3 rounded-md hover:bg-blue-600"
                        >
                          To Buyers
                        </button>
                      )}
                      {user?.status === "Buyers" && (
                        <button
                          onClick={() =>
                            handleStatusChange(user._id, "Sellers")
                          }
                          className="text-white bg-green-500 py-1 px-3 rounded-md hover:bg-green-600"
                        >
                          To Sellers
                        </button>
                      )}
                    </div>
                  </td>
                  <td class="p-4 border-b border-slate-700">
                    <p class="flex items-center justify-center gap-2 text-white bg-[#f50963] py-2 rounded-md">
                      <RiDeleteBin2Line size={20} />
                      <p>Delete</p>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManegeUsers;
