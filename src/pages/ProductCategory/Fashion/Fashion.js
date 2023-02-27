import Quote from '~/layouts/Footer/Footer';
import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';
import SanPham3 from '~/pages/Product/SanPham3';

function Fashion() {
    return (
        <div>
            <FeaturedTitle titles="Thời trang" children={<SanPham3 url="categories/getOne/1" />} />
            <Quote />
        </div>
    );
}

export default Fashion;
