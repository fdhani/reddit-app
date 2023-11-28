import styles from "./layout.module.scss";

const Layout = (props) => {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
