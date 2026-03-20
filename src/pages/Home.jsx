import { useEffect, useState } from "react";
import EnvelopeLogo from "../assets/EnvelopeLogo";
import { getUsers } from "../services/userService";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(Array.isArray(data?.utilisateurs) ? data.utilisateurs : []);
      } catch (error) {
        console.error("Error fetching users", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 rounded-xl">
      <div className="w-full max-w-6xl bg-[#f8f5f1] rounded-3xl shadow-xl p-10">
        <div className="mb-10 flex items-center gap-2">
          <h1 className="text-4xl font-bold text-gray-800 mt-2">Welcome</h1>
          <EnvelopeLogo className="w-24 h-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Subscriber(s):
            </h2>

            {users.length === 0 ? (
              <p data-testid="no-users" className="text-gray-500">
                No registered user yet.
              </p>
            ) : (
              <ul data-testid="users-list" className="space-y-2">
                {users.map((user, index) => (
                  <li key={index} className="text-lg font-semibold text-gray-900">
                    {user.prenom} {user.nom} - {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-center items-center">
            <h3 className="font-semibold text-gray-700 mb-2">
              Subscribers count
            </h3>
            <p data-testid="users-count" className="text-4xl font-bold text-indigo-600">
              {users.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;