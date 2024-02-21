import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../../constants/baseurl";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Setting.module.css";
import userIcon from "../../assets/images/profile.svg"
import lockIcon from "../../assets/images/lock.svg"

function SettingContent() {
    const [name, setName] =useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePassword = async () => {
        setIsLoading(true);

        try {
            const jwtToken = localStorage.getItem("userToken");
    
            const response = await fetch(`${BACKEND_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ name, oldPassword, newPassword })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }

        // try {
        //     const response = await axios.put(`${BACKEND_URL}/users/profile`, {
        //         oldPassword,
        //         newPassword,
        //     });

        //     toast.success(response.data.message);
        // } catch (error) {
        //     if (error.response && error.response.status === 401) {
        //         toast.error("Old password is incorrect");
        //     } else {
        //         toast.error("An error occurred");
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className={styles.settingScreen}>
            <h1 className={styles.settingTitle}>Settings</h1>
            <form
                className={styles.formContainer}
            >
                <div className={styles.formAttribute}>
                    <span className={styles.logo}><img className={styles.Icon} src={userIcon} alt="email icon" /></span>
                    <input
                        type="Name"
                        id="Name"
                        name="Name"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className={styles.formInput}
                    />
                </div>

                <div className={styles.formAttribute}>
                    <span className={styles.logo}><img className={styles.Icon} src={lockIcon} alt="email icon" /></span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={styles.formInput}
                    />
                </div>
                <div className={styles.formAttribute}>
                    <span className={styles.logo}><img className={styles.Icon} src={lockIcon} alt="email icon" /></span>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.formInput}
                    />
                </div>
                <button onClick={handleUpdatePassword} disabled={isLoading} className={styles.updateBtn}>
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default SettingContent;
