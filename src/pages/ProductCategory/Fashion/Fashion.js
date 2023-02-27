import Quote from '~/layouts/Footer/Footer';
import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';

import Category from '../Category/Category';

function Fashion() {
    return (
        <div>
            <FeaturedTitle titles="Thời Trang" children={<Category url="categories/getOne/1" />} />
            <Quote />
        </div>
    );
}

export default Fashion;
