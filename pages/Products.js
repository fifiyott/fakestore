import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  editProduct,
  addProduct,
} from "../redux/actions/productActions";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ProductDetail from "react-modal";
import EditProduct from "react-modal";
import Swal from "sweetalert2";

(Modal, ProductDetail, EditProduct).setAppElement();

const Products = () => {
  const dispatch = useDispatch();
  const allProductsData = useSelector((state) => state.Products);
  const { loading, error, products } = allProductsData;

  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // LOAD DATA
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // SEARCH TITLE
  const [inputSearch, setInputSearch] = useState("");

  // HANDLE CHANGE
  const handleChange = (e) => {
    let data = { ...userInput };
    data[e.target.name] = e.target.value;
    setUserInput(data);
  };

  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  // ADD PRODUCT
  const [userInput, setUserInput] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (userInput.title === "",
      userInput.price === "",
      userInput.description === "",
      userInput.image === "",
      userInput.category === "")
    ) {
      return false;
    }

    dispatch(
      addProduct({
        title: userInput.title,
        price: userInput.price,
        description: userInput.description,
        image: userInput.image,
        category: userInput.category,
      })
    );
    Swal.fire(
      "Berhasil Tambah Produk!",
      "Product " + userInput.title + " Berhasil di Tambah!",
      "success"
    );

    setUserInput({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  // EDIT AND UPDATE PRODUCT
  const [userEdit, setUserEdit] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleEdit = (product) => {
    setUserEdit({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    console.log("Product = " + product.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        id: userEdit.id,
        title: userEdit.title,
        price: userEdit.price,
        description: userEdit.description,
        image: userEdit.image,
        category: userEdit.category,
      })
    );
    Swal.fire(
      "Berhasil Update Produk!",
      "Product " + userEdit.title + " Berhasil di Update!",
      "success"
    );

    setUserEdit({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  return (
    <section className="article">
      <h1 style={{ lineHeight: "0px", marginTop: "80px" }}>List Products</h1>
      {/* MODAL PRODUCT DETAIL BILA LIST PRODUCT DI KLIK AKAN MUNCUL DETAIL PRODUCT */}
      <ProductDetail
        isOpen={descModalIsOpen}
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
          onClick={() => setdescModalIsOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <section className="product-detail">
          <div className="left-column">
            <Image
              src={userEdit.image}
              alt="A image of product"
              width={400}
              height={450}
            />
          </div>

          <div className="right-column">
            <div className="product-description">
              <span>{userEdit.category}</span>
              <h1 style={{ textAlign: "justify" }}>{userEdit.title}</h1>
              <p style={{ textAlign: "justify" }}>{userEdit.description}</p>
            </div>
          </div>
        </section>
      </ProductDetail>

      {/* MODAL EDIT PRODUCT */}
      <EditProduct
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "50px",
            left: "250px",
            right: "40px",
            bottom: "40px",
          },
        }}
      >
        <button
          onClick={() => seteditModalIsOpen(false)}
          style={{ float: "right" }}
          className="button-ud"
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "red" }}
          />
        </button>
        <div>
          <section className="content-product">
            <section className="add-product">
              <h1> Edit Product</h1>
              <div className="form-container">
                <form id="form" className="form">
                  <div className="page">
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Title"
                        name="id"
                        value={userEdit.id}
                        disabled
                      />
                      <label className="form__label">product id</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Title"
                        name="title"
                        onChange={handleChangeEdit}
                        value={userEdit.title}
                      />
                      <label className="form__label">Title</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Price"
                        name="price"
                        onChange={handleChangeEdit}
                        value={userEdit.price}
                      />
                      <label className="form__label">Price</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Description"
                        name="description"
                        onChange={handleChangeEdit}
                        value={userEdit.description}
                      />
                      <label className="form__label">Description</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Image"
                        name="image"
                        onChange={handleChangeEdit}
                        value={userEdit.image}
                      />
                      <label className="form__label">Image</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Category"
                        name="category"
                        onChange={handleChangeEdit}
                        value={userEdit.category}
                      />
                      <label className="form__label">Category</label>
                    </div>
                  </div>

                  <div className="button">
                    <button
                      className="bn54"
                      type="button"
                      onClick={handleUpdate}
                    >
                      <span className="bn54span">Update</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        </div>
      </EditProduct>

      <div className="Modal">
        {/* MODAL TAMBAH PRODUCT */}
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          style={{
            content: {
              top: "50px",
              left: "250px",
              right: "40px",
              bottom: "40px",
            },
          }}
        >
          <button
            onClick={() => setModalIsOpen(false)}
            style={{ float: "right" }}
            className="button-ud"
          >
            <FontAwesomeIcon
              icon={faWindowClose}
              size="2x"
              style={{ color: "red" }}
            />
          </button>
          <section className="content-product">
            <section className="add-product">
              <h1> New Product </h1>
              <div className="form-container">
                <form id="form" className="form">
                  <div className="page">
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        value={userInput.title}
                      />
                      <label className="form__label">Title</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                        value={userInput.price}
                      />
                      <label className="form__label">Price</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                        value={userInput.description}
                      />
                      <label className="form__label">Description</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Image"
                        name="image"
                        onChange={handleChange}
                        value={userInput.image}
                      />
                      <label className="form__label">Image</label>
                    </div>
                    <div className="form__group field">
                      <input
                        type="input"
                        className="form__field"
                        placeholder="Category"
                        name="category"
                        onChange={handleChange}
                        value={userInput.category}
                      />
                      <label className="form__label">Category</label>
                    </div>
                  </div>

                  <div className="button">
                    <button
                      className="bn54"
                      type="button"
                      onClick={handleSubmit}
                    >
                      <span className="bn54span">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </section>
          <br />
        </Modal>
      </div>

      <div className="Header">
        <button onClick={() => setModalIsOpen(true)} className="bn54">
          Add New Product
        </button>

        {/* SEACRH PRODUCT BY TITLE */}
        <div className="search">
          <form id="animated">
            {" "}
            <input
              name={inputSearch}
              type="text"
              placeholder="Search Product Here..."
              onChange={handleChangeSearch}
              value={inputSearch}
              className="input-search"
            />
          </form>
        </div>
      </div>

      <section>
        <section className="product">
          <title>Product List</title>
          {loading
            ? "Loading..."
            : error
            ? error.message
            : products
                .filter((product) => {
                  if (inputSearch === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(inputSearch.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product) => (
                  <div>
                    <div className="product-detail" key={product.id}>
                      <div className="id">
                        <span>{product.id}</span>
                      </div>

                      <div className="left-column">
                        <span>{product.title}</span>
                      </div>

                      <div className="right-column">
                        <div className="product-description">
                          <span>{product.category}</span>
                        </div>
                      </div>

                      <div className="action-column">
                        {/* DETAIL PRODUCT */}
                        <button
                          onClick={() =>
                            setdescModalIsOpen(true) & handleEdit(product)
                          }
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
                              deleteProduct(product.id),
                              Swal.fire(
                                "Berhasil Menghapus!",
                                "Product " +
                                  product.title +
                                  " Berhasil di Hapus!",
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
        </section>
      </section>
    </section>
  );
};

export default Products;
