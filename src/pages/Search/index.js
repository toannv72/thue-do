import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Search() {

        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

    return <h2>Search page</h2>;
}

export default Search;
