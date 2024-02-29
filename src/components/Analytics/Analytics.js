import React, {useState, useEffect} from "react";
import styles from "./Analytics.module.css";

function AnalyticsContent() {
    const [statusCounts, setStatusCounts] = useState({}); // State to store status counts
    const [priorityCounts, setPriorityCounts] = useState({});
    // const [dueDate, setDuedate] = useState(0);

    useEffect(() => {
        // Retrieve status counts from localStorage
        const storedCounts = localStorage.getItem("statusCounts");
        const priorityCounts = localStorage.getItem("priorityCounts");
        if (storedCounts) {
            setStatusCounts(JSON.parse(storedCounts));
        }
        if(priorityCounts){
            setPriorityCounts(JSON.parse(priorityCounts));
        }
        // setDuedate = priorityCounts['High'] + priorityCounts['Low'] + priorityCounts['Moderate'];
    }, []);



    return (
        <div className={styles.analyticsScreen}>
            <h1 className={styles.analyticsTitle}>Analytics</h1>
            <div className={styles.analyticsContent}>
                <div className={styles.analyticsData}>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Backlog Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{statusCounts['backlog'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>To-do Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{statusCounts['todo'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>In-Progress Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{statusCounts['progress'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Completed Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{statusCounts['done'] || 0}</p>
                    </div>

                </div>
                <div className={styles.analyticsData}>
                <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Low Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{priorityCounts['Low'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Moderate Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{priorityCounts['Moderate'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>High Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>{priorityCounts['High'] || 0}</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Due Date Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsContent;
