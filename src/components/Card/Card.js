import React, { useState } from 'react';
import styles from './Card.module.css';
import dotLogo from "../../assets/images/dots.svg"
import collapseDownIcon from "../../assets/images/collapsedown.svg"
import collapseUpIcon from "../../assets/images/collapseup.svg"
import { BACKEND_URL } from '../../constants/baseurl';
import axios from 'axios';


const Card = ({ task }) => {
    const { _id, title, priority, checklist: taskChecklist, dueDate } = task; // Renamed checklist to taskChecklist
    const [showOptions, setShowOptions] = useState(false);
    const [showChecklist, setShowChecklist] = useState(false);

    const checkedTasks = taskChecklist.filter(task => task.isChecked).length; // Updated to use taskChecklist
    const totalTasks = taskChecklist.length; // Updated to use taskChecklist
    const [collapseIcon, setCollapseIcon] = useState(collapseDownIcon);
    const [cardStatus, setCardStatus] = useState('todo'); // State variable for card status


    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const toggleChecklist = () => {
        setShowChecklist(!showChecklist); // Toggle checklist visibility
        setCollapseIcon(showChecklist ? collapseDownIcon : collapseUpIcon);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'rgb(255, 0, 225)';
            case 'Moderate':
                return 'rgb(0, 200, 255)';
            case 'Low':
                return 'rgb(0, 255, 60)';
            default:
                return 'gray';
        }
    };

    const handleChecklistToggle = async (index) => {
        const updatedChecklist = [...taskChecklist]; // Updated to use taskChecklist
        updatedChecklist[index].isChecked = !updatedChecklist[index].isChecked;

        try {
            const token = localStorage.getItem('userToken');
            const taskId = updatedChecklist[index]._id;
            const response = await axios.put(`${BACKEND_URL}/tasks/${taskId}`, {
                isChecked: updatedChecklist[index].isChecked,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data); // Log the response from the backend
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleStatusChange = async (status) => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.put(`${BACKEND_URL}/tasks/${_id}`, {
                status: status,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data); // Log the response from the backend
            setCardStatus(status);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.priorityDiv}>
                    <div className={styles.colorDiv} style={{ backgroundColor: getPriorityColor(priority) }}></div>
                    <div className={styles.priorityIndicator}>{priority} Priority</div>
                </div>
                <div className={styles.optionsMenu}>
                    <div className={styles.dots} onClick={toggleOptions}>
                        <img src={dotLogo} alt='dot logo' />
                    </div>
                </div>
            </div>
            <div className={styles.optionsDiv}>
                {showOptions && (
                    <div className={styles.options}>
                        <div className={styles.optionBtn}>Edit</div>
                        <div className={styles.optionBtn}>Share</div>
                        <div className={styles.optionBtnDelete}>Delete</div>
                    </div>
                )}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.checklist}>
                <div className={styles.checklistData}>
                    Checklist ({checkedTasks}/{totalTasks})
                </div>
                <div className={styles.collapseImg} onClick={toggleChecklist}>
                    <img src={collapseIcon} alt='collapse icon' />
                </div>
            </div>
            {showChecklist && ( // Conditionally render the checklist input based on showChecklist state
                <div className={styles.checklistInput}>
                    {taskChecklist.map((task, index) => (
                        <div key={index} className={styles.taskItem}>
                            <input
                                type="checkbox"
                                checked={task.isChecked}
                                onChange={() => handleChecklistToggle(index)}
                                className={styles.checkBox}
                            />
                            <span>{task.text}</span>
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.cardBtn}>
                <div className={styles.dueDate}>{dueDate}</div>
                <div className={styles.modesBtn}>
                    {cardStatus === 'todo' && (
                        <>
                            <button onClick={() => handleStatusChange('backlog')}>BACKLOG</button>
                            <button onClick={() => handleStatusChange('progress')}>PROGRESS</button>
                            <button onClick={() => handleStatusChange('done')}>DONE</button>
                        </>
                    )}
                    {cardStatus === 'backlog' && (
                        <>
                            <button onClick={() => handleStatusChange('todo')}>TODO</button>
                            <button onClick={() => handleStatusChange('progress')}>PROGRESS</button>
                            <button onClick={() => handleStatusChange('done')}>DONE</button>
                        </>
                    )}
                    {cardStatus === 'progress' && (
                        <>
                            <button onClick={() => handleStatusChange('todo')}>TODO</button>
                            <button onClick={() => handleStatusChange('backlog')}>BACKLOG</button>
                            <button onClick={() => handleStatusChange('done')}>DONE</button>
                        </>
                    )}
                    {cardStatus === 'done' && (
                        <>
                            <button onClick={() => handleStatusChange('todo')}>TODO</button>
                            <button onClick={() => handleStatusChange('backlog')}>BACKLOG</button>
                            <button onClick={() => handleStatusChange('progress')}>PROGRESS</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
