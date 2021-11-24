import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="header">
            <div className="title-and-mascot">
                <img className="logo" alt="logo" src="/paintio.png" />
                <ul>
                <Link to="/">
                    <li>
                        <div>
                            <h1 className="header-main-text">Paint-IO</h1>
                            <p className="header-tagline">Create with friends!</p>
                        </div>
                    </li>
                </Link>
                <Link to="/gallery">
                    <li className="header-main-text">Gallery</li>
                </Link>
                </ul>
            </div>
        </div>
    );
}
