export default function Footer() {
    return (
        <footer className="page-footer">
            <div className="container">
            <div className="row">
                <div className="col l6 s12">
                <h5 className="white-text">Interest</h5>
                <p className="grey-text text-lighten-4">Imagine that there is a cool footer here and you feel incredible pleasure reading it.</p>
                </div>
                <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <ul>
                    <li><a className="grey-text text-lighten-3" href="#!">Instagram</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://github.com/krepillah!">GitHub</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Telegram</a></li>
                </ul>
                </div>
            </div>
            </div>
            <div className="footer-copyright">
            <div className="container">
            © {new Date().getFullYear()} Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">About us</a>
            </div>
            </div>
        </footer>
    )
}