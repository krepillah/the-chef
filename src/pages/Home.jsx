import Preloader from "../components/Preloader";
import CategoryList from "../components/CategoryList";

export default function Home(props) {
    const {catalog} = props;

    return (
        <>
        {!catalog.length ? <Preloader/>:<CategoryList catalog={catalog}/>}
        </>
    )
}
