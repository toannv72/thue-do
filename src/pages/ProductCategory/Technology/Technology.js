import FeaturedTitle from '~/pages/Product/FeaturedTitle/FeaturedTitle';

import Category from '../Category/Category';
import Quote from '~/layouts/Footer/Footer';

export default function Technology() {
   return (
       <div>
           <FeaturedTitle titles="Công Nghệ" children={<Category url="categories/getOne/3" />} />
           <Quote />
       </div>
   );
}
