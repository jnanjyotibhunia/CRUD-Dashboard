import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../features/users/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError } = useSelector(
    state => state.users
  );

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name.trim()) return;

    dispatch(
      addUser({
        id: Date.now(),
        name,
      })
    );
    setName("");
  };

  const handleUpdate = id => {
    const newName = prompt("Enter new name");
    if (newName) {
      dispatch(updateUser({ id, name: newName }));
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error fetching data</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add User</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleUpdate(user.id)}>
                  Edit
                </button>
                <button onClick={() => dispatch(deleteUser(user.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
