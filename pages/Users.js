import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Users.module.scss";
import DetailUser from "react-modal";
import Swal from "sweetalert2";

DetailUser.setAppElement();

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Users);
  const { loading, error, users } = allUsers;

  // LOAD DATA
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  //userEdit
  const [userEdit, setUserEdit] = useState({
    id: "",
    email: "",
    username: "",
    fullname: "",
    phone: "",
    address: "",
  });

  // MODAL
  const [detailUser, setDetailUser] = useState(false);

  //Handle Change
  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const handleEdit = (user) => {
    setUserEdit({
      id: user.id,
      email: user.email,
      username: user.username,
      fullname: user.name.firstname + " " + user.name.lastname,
      phone: user.phone,
      address:
        user.address.street +
        ", No. " +
        user.address.number +
        ", " +
        user.address.city +
        ", " +
        user.address.zipcode,
    });
    console.log("User = " + user.id);
  };
  return (
    //MODAL

    <div>
      <DetailUser
        isOpen={detailUser}
        ariaHideApp={false}
        style={{
          content: {
            top: "50px",
            left: "180px",
            right: "40px",
            bottom: "40px",
          },
        }}
      >
        <button
          onClick={() => setDetailUser(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <section style={{ fontSize: "24px" }}>
          <table>
            <tr>
              <td>id </td>
              <td> : </td>
              <td>{userEdit.id}</td>
            </tr>
            <tr>
              <td>email </td>
              <td> : </td>
              <td>{userEdit.email}</td>
            </tr>
            <tr>
              <td>username </td>
              <td> : </td>
              <td>{userEdit.username}</td>
            </tr>
            <tr>
              <td>fullname </td>
              <td>: </td>
              <td>{userEdit.fullname}</td>
            </tr>
            <tr>
              <td>phone </td>
              <td> : </td>
              <td>{userEdit.phone}</td>
            </tr>
            <tr>
              <td>address </td>
              <td> : </td>
              <td>{userEdit.address}</td>
            </tr>
          </table>
        </section>
      </DetailUser>

      <section className="article">
        <title>Users</title>
        <h1 style={{ lineHeight: "0px", marginTop: "80px" }}>List User</h1>
        <div className="header">
          <button onClick={() => setModalIsOpen(true)} className="bn54">
            Add New User
          </button>
          <br />
        </div>
        <div>
          {loading
            ? "Loading..."
            : error
            ? error.message
            : users.map((u) => (
                <div key={u.id}>
                  <div className={styles.list}>
                    <div className="id">
                      <p>{u.id}</p>
                    </div>

                    <div className={styles.leftcolumn}>
                      <p>
                        {u.name.firstname} {u.name.lastname}
                      </p>
                    </div>

                    <div className={styles.rightcolumn}>
                      <p>{u.username}</p>
                    </div>

                    <div className={styles.actioncolumn}>
                      {/* DETAIL PRODUCT */}
                      <button
                        onClick={() => setDetailUser(true) & handleEdit(u)}
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          size="1x"
                          style={{ color: "green" }}
                        />
                      </button>

                      {/* EDIT PRODUCT */}
                      <button
                        onClick={() =>
                          seteditModalIsOpen(true) & handleEdit(product)
                        }
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          size="1x"
                          style={{ color: "blue" }}
                        />
                      </button>

                      {/* DELETE PRODUCT */}
                      <button
                        onClick={() =>
                          dispatch(
                            deleteUsers(u.id),
                            Swal.fire(
                              "Berhasil Menghapus!",
                              "User " + u.username + " Berhasil di Hapus!",
                              "success"
                            )
                          )
                        }
                        className="button-ud"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="1x"
                          style={{ color: "red" }}
                        />
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Users;
