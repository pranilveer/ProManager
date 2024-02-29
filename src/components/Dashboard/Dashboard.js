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
    // const [backlogTasks, setBacklogTasks] = useState([]);
    // const [progressTasks, setProgressTasks] = useState([]);
    // const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        // const fetchTask = async () => {
        //     try {
        //         const response = await axios.get(`${BACKEND_URL}/dashboard`); // Assuming the backend route is '/dashboard'
        //         const { backlogTasks, progressTasks, doneTasks } = response.data;

        //         setBacklogTasks(backlogTasks);
        //         setProgressTasks(progressTasks);
        //         setDoneTasks(doneTasks);
        //     } catch (error) {
        //         console.error('Error fetching tasks:', error);
        //     }
        // };
        // Set current date when the component mounts
        const currentDate = new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            year: 'numeric',
            month: 'long'
        });
        setCurrentDate(currentDate);
        // fetchTask();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`${BACKEND_URL}/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data.tasks);
                console.log("responce here", response.data)
                console.log("task here", response.data.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
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
                        <div className={styles.backlogHeader}>
                            <h2 className={styles.blockHeader}>Backlog</h2>
                        </div>
                        <div className={styles.BacklogContent}>
                            {tasks.map((task) => (
                                task.status === 'backlog' && <Card key={task._id} task={task} />
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
                        {/* <div className={styles.toDoContent}>
                            {tasks.map((task) => (
                                <Card key={task._id} task={task} />
                            ))}
                        </div> */}
                        <div className={styles.toDoContent}>
                            {tasks.map((task) => (
                                task.status === 'todo' && <Card key={task._id} task={task} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.dashboardBlock}>
                        <div className={styles.progressBlockHeader}>
                            <h2 className={styles.progressHeader}>In Progress</h2>
                        </div>
                        <div className={styles.progressContent}>
                            {tasks.map((task) => (
                                task.status === 'progress' && <Card key={task._id} task={task} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.dashboardBlock}>
                        <div className={styles.doneBlockHeader}>
                            <h2 className={styles.doneHeader}>Done</h2>
                        </div>
                        <div className={styles.doneContent}>
                            {tasks.map((task) => (
                                task.status === 'done' && <Card key={task._id} task={task} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <ToDoModal isOpen={isModalOpen} closeModal={toggleModal} />
        </>
    );
}

export default DashboardContent;
