import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

const UserListScreen = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery(null);
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  let errMsg = "";
  if (error) {
    if ("status" in error) {
      errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errMsg = error.message ? error.message : "";
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm("Are you Sure?")) {
      try {
        await deleteUser(id);
        refetch();
        toast("User deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{errMsg}</>
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.length !== 0 &&
              users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user?.name}</td>
                  <td>
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                  </td>
                  <td>
                    {user?.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm mx-2"
                      variant="danger"
                      onClick={() => deleteHandler(user?._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
