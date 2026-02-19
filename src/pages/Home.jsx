/**
 * @module Home
 * @description Home page component displaying registered users stored in localStorage.
 */

import { useEffect, useState } from "react";
import EnvelopeLogo from "../assets/EnvelopeLogo";

/**
 * @typedef {Object} User
 * @property {string} lastname - User's last name
 * @property {string} firstname - User's first name
 * @property {string} email - User's email address
 * @property {string} birth - User's birth date (ISO format)
 * @property {string} postCode - User's postal code
 * @property {string} town - User's city/town
 */

/**
 * Home Component
 *
 * Displays:
 * - A welcome header with a logo
 * - The list of registered users stored in localStorage
 * - The total number of registered users
 *
 * Behavior:
 * - On mount, retrieves users from localStorage (key: "users")
 * - If no users are found, displays a fallback message
 * - Dynamically updates the UI based on users array length
 *
 * @component
 * @returns {React.ReactElement} Rendered Home page
 *
 * @state {User[]} users - Array of registered users loaded from localStorage
 *
 * @example
 * // localStorage structure
 * [
 *   {
 *     "lastname": "Jean",
 *     "firstname": "Pierre",
 *     "email": "jean@test.com",
 *     "birth": "1995-05-15",
 *     "postCode": "75001",
 *     "town": "Paris"
 *   }
 * ]
 */
function Home() {
  /**
   * Registered users state
   * @type {[User[], Function]}
   */
  const [users, setUsers] = useState([]);

  /**
   * Effect hook:
   * Loads users from localStorage when component mounts.
   *
   * If no users exist, initializes with an empty array.
   *
   * @effect
   */
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 rounded-xl">
      <div className="w-full max-w-6xl bg-[#f8f5f1] rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="mb-10 flex items-center gap-2">
          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            Welcome
          </h1>
          <EnvelopeLogo className="w-24 h-24" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Subscribers list */}
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
                  <li
                    key={index}
                    className="text-lg font-semibold text-gray-900"
                  >
                    {user.firstname} {user.lastname}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Subscribers count */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-center items-center">
            <h3 className="font-semibold text-gray-700 mb-2">
              Subscribers count
            </h3>

            <p
              data-testid="users-count"
              className="text-4xl font-bold text-indigo-600"
            >
              {users.length}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
