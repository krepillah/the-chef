import { Row } from "antd";
import Meal from "./Meal";

export default function MealsList(props) {
    const { meals, handleMealRemoval = Function.prototype } = props;

    return (
        <div className="meals-list">
            <Row gutter={[8, 8]}>
                {meals.map((el) => (
                    <Meal
                        key={el.idMeal}
                        {...el}
                        handleMealRemoval={handleMealRemoval}
                    />
                ))}
            </Row>
        </div>
    );
}
