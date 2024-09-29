import CategoryItem from "./CategoryItem";
import { Row } from "antd";
import RandomMealBlock from "./RandomMealBlock";

export default function CategoryList(props) {
    const { catalog } = props;

    return (
        <div className="category-list">
            <Row gutter={[8, 8]}>
                <RandomMealBlock />
                {catalog.map((el) => (
                    <CategoryItem key={el.idCategory} {...el} />
                ))}
            </Row>
        </div>
    );
}
