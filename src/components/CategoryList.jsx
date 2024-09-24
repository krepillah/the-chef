import CategoryItem from "./CategoryItem";
import { Row } from "antd";

export default function CategoryList({ catalog = [] }) {
    return (
        <div className="category-list">
            <span className="welcome-text-block">
                <h1 className="welcome-text">Welcome to <i className="accent-color w-600">THE CHEF!</i></h1>
                <h3 className="welcome-subtext">Here you will find many recipes to suit your taste.</h3>
            </span>    
            <Row gutter={[8, 8]}>            
                {catalog.map((el) => (
                    <CategoryItem key={el.idCategory} {...el} />
                ))}
            </Row>
        </div>
    );
}
