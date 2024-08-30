import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store"
import { fetchGeneralInfo } from "../../store/slices/general-info";
import { ResearchTabs } from "../../components/ResearchTabs/ResearchTabs";
import styles from "./Research.module.scss";

export function Research():JSX.Element {
    const dispatch = useAppDispatch();
    const {status, error} = useAppSelector((state) => state.generalInfo);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchGeneralInfo());
        }
    },[status, dispatch]);

    if(status === 'loading') return <p>Loading...</p>
    if(status === 'failed') return <p>Error: {error}</p>
    return (
        <div className={styles.ResearchWrapper}>
            <ResearchTabs />
        </div>
    )
}