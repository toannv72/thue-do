import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';

import Quote from '~/layouts/Footer/Footer';
import Category from '../Category/Category';

export default function Sport() {
    return (
        <div>
            <FeaturedTitle titles="Thể Thao" children={<Category url="categories/getOne/4" />} />
            <Quote />
        </div>
    );
}
