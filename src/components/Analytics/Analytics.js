import React from "react";
import styles from "./Analytics.module.css";

function AnalyticsContent() {
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
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>To-do Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>In-Progress Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Completed Tasks</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>

                </div>
                <div className={styles.analyticsData}>
                <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Low Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>Moderate Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
                    </div>
                    <div className={styles.analyticsRow}>
                        <div className={styles.dataName}>
                            <div className={styles.bullet}></div>
                            <p>High Priority</p>
                        </div>
                        <p className={styles.analyticsNumbers}>00</p>
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
