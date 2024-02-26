import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { BACKEND_URL } from "../../constants/baseurl";
import addLogo from "../../assets/images/add.svg"
import ToDoModal from "../ToDoModal/ToDoModal";

function DashboardContent() {
    const [userName, setUserName] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch user details when the component mounts
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const response = await axios.get(`${BACKEND_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Set the user's name in the state
                setUserName(response.data.name);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        // Set current date when the component mounts
        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            year: 'numeric',
            month: 'long'
        });
        setCurrentDate(currentDate);

        fetchUserDetails();
    }, []);

    // Function to handle opening and closing of modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className={styles.dashboardScreen}>
                <div className={styles.dashboardHeader}>
                    <h1 className={styles.dashboardHeaderName}>Welcome! {userName}</h1>
                    <p className={styles.dashboardDate}>{currentDate}</p>
                    <h1 className={styles.dashboardTitle}>Board</h1>
                    <div className={styles.dashboardOptionDiv}>
                        <select className={styles.dashboardOptions}>
                            <option className={styles.optionList} value="today">Today</option>
                            <option className={styles.optionList} value="week">This Week</option>
                            <option className={styles.optionList} value="month">This Month</option>
                        </select>
                    </div>
                </div>
                <div className={styles.dashboardData}>
                    <div className={styles.dashboardBlock}>
                        <h2 className={styles.blockHeader}>Backlog</h2>
                    </div>
                    <div className={styles.dashboardBlock}>
                        <div className={styles.todoBlockHeader}>
                            <h2 className={styles.blockHeader}>To Do</h2>
                            <div className={styles.BtnDiv}>
                                <button className={styles.addButton} onClick={toggleModal}><img src={addLogo} alt="add logo" /></button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dashboardBlock}>
                        <h2 className={styles.blockHeader}>In Progress</h2>
                    </div>
                    <div className={styles.dashboardBlock}>
                        <h2 className={styles.blockHeader}>Done</h2>
                    </div>
                </div>
            </div>
            <ToDoModal isOpen={isModalOpen} closeModal={toggleModal} />
        </>
    );
}

export default DashboardContent;
