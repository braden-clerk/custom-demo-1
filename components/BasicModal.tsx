import styles from "../styles/BasicModal.module.css";
import * as React from 'react';

export interface BasicModalProps {

}

const BasicModal = (props: React.PropsWithChildren<BasicModalProps>) => (
    <div className={styles.modal}>
        {props.children}
    </div>
);

export default BasicModal;
