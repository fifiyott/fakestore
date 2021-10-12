import styles from "../../styles/Home.module.scss";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="Navigation-bar">
      <div className={styles.navbar}>
        <a href="/">Home</a>
      </div>

      <div className={styles.sidenav}>
        <div className={styles.logo}>
          <Image src="/icon.png" width={50} height={40} />
          <h3>Fake Store</h3>
        </div>

        <a href="../Products">Products</a>
        <a href="../Users">User</a>
        <a href="../Carts">Cart User</a>
        <br />
        <a href="#contact" style={{ color: "red" }}>
          Log Out
        </a>
      </div>
    </div>
  );
};

export default Navbar;
