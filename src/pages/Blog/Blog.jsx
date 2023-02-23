import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '~/layouts/Footer';
import Posts from './posts/Posts';
// import App from './New';

function Blog() {
     const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


    return (
        <div>
            <Posts />

            <Footer />
        </div>
    );
}

export default Blog;
