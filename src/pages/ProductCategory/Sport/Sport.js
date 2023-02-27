import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';
import SanPham3 from '~/pages/Product/SanPham3';

export default function Sport() {
    <FeaturedTitle titles="Thể Thao" children={<SanPham3 url="categories/getOne/1" />} />;
}
