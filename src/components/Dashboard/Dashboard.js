import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { BACKEND_URL } from "../../constants/baseurl";
import addLogo from "../../assets/images/add.svg"
import ToDoModal from "../ToDoModal/ToDoModal";
import Card from "../Card/Card";

function DashboardContent() {
    const [userName, setUserName] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task => {
                if (task._id === taskId) {
                    return { ...task, status: newStatus };
                }
                return task;
            });
    
            countStatuses(updatedTasks);
            countPriorities(updatedTasks);
            return updatedTasks;
        });
    };

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            year: 'numeric',
            month: 'long'
        });
        setCurrentDate(currentDate);
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${BACKEND_URL}/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("response here", response.data)
                setTasks(response.data.tasks);
                countStatuses(response.data.tasks); 
                countPriorities(response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            try {
                const token = localStorage.getItem('userToken'); // Get the JWT token from localStorage
                const response = await axios.get(`${BACKEND_URL}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Set the Authorization header with the token
                    }
                });
                setUserName(response.data.user.name)
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };
        fetchUserData();
    }, []);

    // Count the number of tasks with each status
    const countStatuses = (tasks) => {
        const counts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
        localStorage.setItem('statusCounts', JSON.stringify(counts)); // Store counts in localStorage
    };

    const countPriorities = (tasks) => {
        const counts = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});
        localStorage.setItem("priorityCounts", JSON.stringify(counts)); // Store counts in localStorage
    };

    // Function to handle opening and closing of modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleTaskAdded = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`${BACKEND_URL}/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data.tasks);
            countStatuses(response.data.tasks); 
            countPriorities(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
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
                        <div className={styles.backlogHeader}>
                            <h2 className={styles.blockHeader}>Backlog</h2>
                        </div>
                        <div className={styles.backlogContent}>
                            {tasks.map((task) => (
                                task.status === 'backlog' && <Card key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.dashboardBlock}>
                        <div className={styles.todoBlockHeader}>
                            <h2 className={styles.blockHeader}>To Do</h2>
                            <div className={styles.BtnDiv}>
                                <button className={styles.addButton} onClick={toggleModal}><img src={addLogo} alt="add logo" /></button>
                            </div>
                        </div>

                        <div className={styles.toDoContent}>
                            {tasks.map((task) => (
                                task.status === 'todo' && <Card key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.dashboardBlock}>
                        <div className={styles.progressBlockHeader}>
                            <h2 className={styles.blockHeader}>In Progress</h2>
                        </div>
                        <div className={styles.progressContent}>
                            {tasks.map((task) => (
                                task.status === 'progress' && <Card key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.dashboardBlock}>
                        <div className={styles.doneBlockHeader}>
                            <h2 className={styles.blockHeader}>Done</h2>
                        </div>
                        <div className={styles.doneContent}>
                            {tasks.map((task) => (
                                task.status === 'done' && <Card key={task._id} task={task} updateTaskStatus={updateTaskStatus} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <ToDoModal isOpen={isModalOpen} closeModal={toggleModal} onTaskAdded={handleTaskAdded}/>
        </>
    );
}

export default DashboardContent;
