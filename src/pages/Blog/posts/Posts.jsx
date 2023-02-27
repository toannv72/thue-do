import { useEffect, useState } from "react";
import ErrorToast from "~/pages/Product/ErrorToast";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
      const [error, setError] = useState(null);
      const [isLoaded, setIsLoaded] = useState(false);
      const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URLS}blog/getAllBlog?page=0&size=200&sort=id%2Cdesc`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, []);

    if (error) {
        return <ErrorToast message={error.message} />;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="posts" style={{ flexWraprap: 'wrap', justifyContent: 'center' }}>
                {items.map((item, index) => (
                    <Post
                        key={index}
                        title={item.title}
                        img={item.imageTitle}
                        writing={item.description}
                       
                        id={item.id}
                    />
                ))}

            </div>
        );
    }
}
