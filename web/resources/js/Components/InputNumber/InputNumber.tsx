import React from "react";
import styles from "./InputNumber.module.scss";

interface InputNumberProps {
    value: number;
    maxValue?: number;
    minValue?: number;
    onChange: (value: number) => void;
}

const InputNumber = ({
    value,
    maxValue = Infinity,
    minValue = 0,
    onChange,
}: InputNumberProps) => {
    const handleIncrement = () => {
        const nextValue = value + 1;
        if (nextValue <= maxValue) {
            onChange(nextValue);
        }
    };

    const handleDecrement = () => {
        const nextValue = value - 1;
        if (nextValue >= minValue) {
            onChange(nextValue);
        }
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numeric = parseInt(e.target.value, 10);
        if (!Boolean(value)) { onChange(0) }
        if (!isNaN(numeric) && numeric >= minValue && numeric <= maxValue) {
            onChange(numeric);
        } else {
            onChange(0)
        }
    };

    return (
        <div className={styles.input_number}>
            <button onClick={handleDecrement}>-</button>
            <input
                type="number"
                value={value}
                onChange={handleValueChange}
                max={maxValue}
                min={minValue}
            />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default InputNumber;
