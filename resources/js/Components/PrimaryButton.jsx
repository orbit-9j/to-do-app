export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                ` items-center px-3 py-2 bg-gray-800 dark:bg-indigo-500 border border-transparent rounded-md text-base text-white dark:text-gray-100 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-indigo-300 focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-bold sm:text-base ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
