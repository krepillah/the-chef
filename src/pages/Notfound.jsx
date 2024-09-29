import Title from "../components/Title";

export default function Notfound() {
    return (
        <div className="notfound-page-block">
            <Title
                highlighted="404"
                description="The page got lost between the spice jars..."
            />
        </div>
    );
}
