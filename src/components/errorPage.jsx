import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return(
        <>
            <div>Error page</div>
            <i>{error.statusText || error.message}</i>
        </>
    );
}

export default ErrorPage;