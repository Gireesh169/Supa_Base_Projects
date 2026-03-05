import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setUsers(data);
    }
  }

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.age}
        </p>
      ))}
    </div>
  );
}

export default App;