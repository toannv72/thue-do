import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '~/layouts/Footer/Footer';
import FeaturedTitle from '../Product/FeaturedTitle/FeaturedTitle';

import SanPham3 from './SanPham3';
import TextRun from '../TextRun/TextRun';
import Home from './Home';
import Home2 from './Home2';
// import Home3 from './Home3';
function ControlledCarousel() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

    return (
        <div>
            <TextRun />
            <Home />
            <Home2 />
            {/* <Home3 /> */}
            <FeaturedTitle
                titles="Gợi ý sản phẩm"
                children={<SanPham3 url="" y="790"/>}
            />
            <Footer />
        </div>
    );
}
export default ControlledCarousel;
