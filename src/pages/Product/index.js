import Quote from '~/layouts/Footer/Footer';
import FeaturedTitle from './FeaturedTitle/FeaturedTitle';

// import MyComponent from './SanPham';
// import SanPham2 from './SanPham2';
import SanPham3 from './SanPham3';

function Following() {
    return (
        <div>
            <FeaturedTitle
                titles="Gợi ý hôm nay"
                children={<SanPham3 url="products/getAllProduct?page=0&size=500&sort=id%2Cdesc" />}
            />
            <FeaturedTitle titles="Sản phẩm hot" children={<SanPham3 url="products/getAllProduct?page=0&size=20" />} />

         
            <Quote />
        </div>
    );
}

export default Following;
