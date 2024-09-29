import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FloatButton } from "antd";
import Preloader from "../components/Preloader";
import CategoryList from "../components/CategoryList";
import Search from "../components/Search";
import Title from "../components/Title";

export default function Home(props) {
    const { catalog } = props;
    const { BackTop } = FloatButton;
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const location = useLocation();

    const [filtered, setFiltered] = useState([]);

    const handleSearch = (str) => {
        if (str === "") {
            setFiltered(catalog);
            navigate(`${pathname}`);
        } else {
            setFiltered(
                catalog.filter((item) =>
                    item.strCategory.toLowerCase().includes(str.toLowerCase())
                )
            );
            navigate(`${pathname}?search_category=${str}`);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        setFiltered(
            search
                ? catalog.filter((item) =>
                      item.strCategory
                          .toLowerCase()
                          .includes(search.split("=")[1].toLowerCase())
                  )
                : catalog
        );
    }, [catalog, search]);

    return (
        <>
            {!catalog.length ? (
                <Preloader />
            ) : (
                <div className="home-page-block">
                    <Title
                        title="Welcome to"
                        highlighted="THE CHEF!"
                        description="Here you will find many recipes to suit your taste."
                    />
                    <Search cb={handleSearch} name="search category..." />
                    <CategoryList catalog={filtered} />
                    <BackTop className="backtop" />
                </div>
            )}
        </>
    );
}
