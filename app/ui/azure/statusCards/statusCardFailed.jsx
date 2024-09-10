import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './statusCard.module.css';

const StatusCardFailed = ({ count }) => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>    
            <div className={styles.texts}>
                <span className={styles.title}>Failed</span>
                <span className={styles.number}>{count}</span> {/* Use count prop */}    
            </div>
        </div>
    );
}

export default StatusCardFailed;


