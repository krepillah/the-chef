import { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function Search({ cb = Function.prototype, name }) {
    const [value, setValue] = useState("");
    const [clear, setClear] = useState(false);
    const { Search } = Input;

    const handleSubmit = () => {
        cb(value);
    };

    useEffect(() => {
        handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clear]);

    return (
        <Row justify="center">
            <Col xs={24} xl={16} xxl={12} className="search-block">
                <Search
                    className="custom-search"
                    size="large"
                    value={value}
                    placeholder={name}
                    allowClear={<CloseOutlined />}
                    onChange={(e) => setValue(e.target.value)}
                    onClear={() => {
                        setValue("");
                        setClear(!clear);
                    }}
                    onSearch={handleSubmit}
                    enterButton
                />
            </Col>
        </Row>
    );
}
