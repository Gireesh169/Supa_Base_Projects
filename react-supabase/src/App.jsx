import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <p key={user.id}>
  {user.name} - {user.age || "No age"}
</p>
      ))}

    </div>
  );
}

export default App;