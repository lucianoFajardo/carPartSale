import Header_view from "../components/header";
import Forms_view_body from "./form_body/forms_view_body";

export default function Body_page() {
    return <>
        <Header_view />
        <div className="">
            <Forms_view_body />
        </div>
    </>
}