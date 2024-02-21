import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { BACKEND_URL } from "../../constants/baseurl";

function DashboardContent() {
    const [userName, setUserName] = useState("");

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

        fetchUserDetails();
    }, []);

    return (
        <div className={styles.dashboardScreen}>
            <div>
                <h1>Welcome, {userName}!</h1>
            </div>
        </div>
    );
}

export default DashboardContent;
