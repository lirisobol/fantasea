import "./assets/styles/_main.scss";
import styles from "./App.module.scss";
import { Layout } from "./layout/Layout";
function App() {

    return (
        <div className={styles.App}>
            <Layout />
        </div>
    )
}

export default App
