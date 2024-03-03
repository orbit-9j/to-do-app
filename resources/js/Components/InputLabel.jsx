export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-lg sm:text-base ` + className}
        >
            {value ? value : children}
        </label>
    );
}
