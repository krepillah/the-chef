import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="black">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    <img
                        src="/icons/fortnite-shop-logo.png"
                        alt="fortnite shop logo"
                    />
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="/about" className="white-text">
                            О проекте
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacts" className="white-text">
                            Контакты
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://themealdb.com/api.php"
                            className="white-text"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            API
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
