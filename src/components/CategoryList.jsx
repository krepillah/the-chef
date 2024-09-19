import CategoryItem from "./CategoryItem";
import { Row } from "antd";

export default function CategoryList({ catalog = [] }) {
    return (
        <div className="category-list">
            <Row gutter={[8, 8]}>            
                {catalog.map((el) => (
                    <CategoryItem key={el.idCategory} {...el} />
                ))}
            </Row>
        </div>
    );
}
