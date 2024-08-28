import { Navigation } from "../components/Navigation/Navigation";
import { Routing } from "../routes/Routing"
import styles from "./Layout.module.scss";
export const Layout = ():JSX.Element => {
    return (
        <div className={styles.Layout}>
            <div className={styles.Nav}>
                <Navigation />
            </div>
            <div className={styles.Content}>
                <Routing />
            </div>
        </div>
    )
}