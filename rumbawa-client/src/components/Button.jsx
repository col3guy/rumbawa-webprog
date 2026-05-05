import { Link } from "react-router-dom";

const variantClasses = {
    primary: "bg-[#6F4518] text-white hover:bg-[#5a3913]", 
    secondary: "bg-transparent text-white border-white hover:bg-white hover:text-[#6F4518]",
};

const Button = ({
    children,
    to,
    type = "button",
    variant = "secondary",
    className = "",
}) => {
    const classes = [
        "inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
        variantClasses[variant] ?? variantClasses.secondary,
        className,
    ]
        .join(" ")
        .trim();

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes}>
            {children}
        </button>
    );
};

export default Button;