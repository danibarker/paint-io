import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="header">
            <div className="title-and-mascot">
                <img className="logo" alt="logo" src="/paintio.png" />
                <ul>
                <Link to="/">

                    <li>Paint.io</li>
                    </Link>
                

                    <Link to="/gallery">
                        <li>Gallery</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
