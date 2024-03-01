import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./CardPublish.module.css";

function CardPublish() {
    const [sharedTask, setSharedTask] = useState(null);

    useEffect(() => {
        const task = localStorage.getItem('sharedTask');
        if (task) {
            setSharedTask(JSON.parse(task));
            localStorage.removeItem('sharedTask');
        }
    }, []);

    return (
        <div className={styles.CardPublish}>
            {/* {sharedTask && <Card task={sharedTask} />} */}
        </div>
    );
}

export default CardPublish;
