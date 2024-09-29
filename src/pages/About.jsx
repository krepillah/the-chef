import Title from "../components/Title";
import { Row, Col, Typography, Divider } from "antd";

export default function About() {
    const { Paragraph } = Typography;
    return (
        <div className="about-page-block">
            <Title title="About" highlighted="THE CHEF!" />
            <Row justify="center">
                <Col xs={24} md={20} lg={20} xxl={16}>
                    <Paragraph>
                        {" "}
                        The project THE CHEF! - is a web service that allows
                        home cooking enthusiasts to solve the most difficult
                        problem - "what dish to cook today?".
                    </Paragraph>
                    <Paragraph>
                        It categorizes dishes to help you narrow down your
                        options faster. There's a random dish generator on the
                        homepage if you like to experiment, and a detailed
                        recipe with ingredient list and video will help you
                        step-by-step prepare your masterpiece.
                    </Paragraph>
                    <Divider
                        style={{
                            borderColor: "#1677ff",
                            marginTop: "2rem",
                        }}
                    >
                        Technology
                    </Divider>
                    <Paragraph>
                        SPA app is developed as part of the study of
                        “react-router-dom” and its ability to simulate page
                        transitions. The content with dishes and recipes is
                        taken from Themealdb API, which provides a list of
                        various queries without registration. The Ant Design
                        library with all its features was used to style the
                        components. The flag-icons library was used to display
                        flags by country name. Project publishing is implemented via GitHub-pages.
                    </Paragraph>
                </Col>
            </Row>
        </div>
    );
}
