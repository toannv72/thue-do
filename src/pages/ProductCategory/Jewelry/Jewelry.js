import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';
import SanPham3 from '~/pages/Product/SanPham3';
import Category from '../Category/Category';
import Quote from '~/layouts/Footer/Footer';
export default function Jewelry() {
    return (
        <div>
            <FeaturedTitle titles="Trang Sức" children={<Category url="categories/getOne/2" />} />
            <Quote />
        </div>
    );
}
