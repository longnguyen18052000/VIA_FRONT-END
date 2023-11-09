import styles from "./header.module.scss";
import logo from "../../asstes/images/logo.png";
import Login from "./login";
const Header = () => {
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["banner"]}>
          <img className={styles["logo"]} src={logo} alt="Logo" />
          <Login />
        </div>
      </div>
    </>
  );
};

export default Header;
