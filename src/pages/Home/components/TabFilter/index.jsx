import { NavLink } from "react-router-dom";
import Icon from "../../../../components/Icon";
import styles from "./tab-filter.module.scss";

const TabFilter = (props) => {
  const { data, activeId, onTabChange } = props;
  return (
    <ul className={styles.container}>
      {data.map(({ name, title, id, url }) => {
        return (
          <li
            key={id}
            data-active={id === activeId}
            onClick={() => onTabChange({ title, id, url })}
          >
            {url ? (
              <NavLink to={url}>
                <Icon name={name} size={22} />
                &nbsp;{title}
              </NavLink>
            ) : (
              <>
                <Icon name={name} size={22} />
                &nbsp;{title}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TabFilter;
