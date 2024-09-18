export default function Footer() {
    return (
        <footer className="page-footer black">
            <div className="container">
            <div className="row">
                <div className="col l6 s12">
                <h5 className="white-text">Полезное</h5>
                <p className="grey-text text-lighten-4">Представьте, что здесь классный футер.</p>
                </div>
                <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Ссылки на соцсети</h5>
                <ul>
                    <li><a className="grey-text text-lighten-3" href="#!">Инстаграм</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://github.com/krepillah!">Гитхаб</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Телеграм</a></li>
                </ul>
                </div>
            </div>
            </div>
            <div className="footer-copyright">
            <div className="container">
            © {new Date().getFullYear()} Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">Больше о нас</a>
            </div>
            </div>
        </footer>
    )
}