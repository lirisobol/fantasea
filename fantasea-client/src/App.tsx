import "./assets/styles/_main.scss";
import styles from "./App.module.scss";
import { Layout } from "./layout/Layout";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { fetchGeneralInfo } from "./store/slices/general-info";
function App() {
    const dispatch = useAppDispatch();
    const {status, error} = useAppSelector(state => state.generalInfo);

    useEffect(() => {
        dispatch(fetchGeneralInfo());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            {status === 'loading' && <div>Loading !!</div>}
            {error && <div>{error}</div>}
            <Layout />
        </div>
    )
}

export default App
