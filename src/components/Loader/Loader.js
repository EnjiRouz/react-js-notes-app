import React from "react";
import classes from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={classes.Centered}>
            <div className={classes.Loader}>
                <div/><div/><div/><div/>
            </div>
        </div>
    );
};