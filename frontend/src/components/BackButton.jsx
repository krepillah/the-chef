import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function BackButton({ name }) {
    const navigate = useNavigate();
    return (
        <div className="button-block">
            <Button className="back-button" onClick={() => navigate(-1)}>
                {name}
            </Button>
        </div>
    );
}
