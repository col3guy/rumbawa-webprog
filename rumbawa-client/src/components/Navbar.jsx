import { NavLink, useNavigate } from 'react-router-dom';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
        isActive
            ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
            : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
    ].join(' ');

const NavBar = () => {
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate('/');

        setTimeout(() => {
            const section = document.getElementById('contact');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 200);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
            <div className="relative mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">
                <NavLink to="/" className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-11 w-auto"
                    />
                </NavLink>

                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/'}
                            className={navLinkClassName}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto">
                    <button
                        type="button"
                        onClick={handleContactClick}
                        className="rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;