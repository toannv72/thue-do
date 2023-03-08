import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Logout from '~/pages/Logout';
import Product from '~/pages/Product';
import Profile from '~/pages/Profile';
import Products from '~/pages/Product/Products';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Blog from '~/pages/Blog';
import Message from '~/pages/Message';
import ShoppingCart from '~/pages/ShoppingCart';
import Setting from '~/pages/Setting';
import feedback from '~/pages/Feedback';
import Login from '~/pages/Login/Login';
import Register from '~/pages/Register/Register';
import Posts from '~/pages/Blog/singlePost/SinglePost';
import Pay from '~/pages/Pay';
import AdminLayout from '~/layouts/Admin/AdminLayout';

import { ProductAdmin } from '~/admin/Product';
import { NotificationAdmin } from '~/admin/Notification';
import { OrderAdmin } from '~/admin/Order';
import { UserAdmin } from '~/admin/User';
import { HomeAdmin } from '~/admin/Home';
import { CreateProducts } from '~/admin/Product/CreateProducts';
import { ProductManagement } from '~/admin/Product/ProductManagement';
import EditProfile from '~/pages/Profile/EditProfile/EditProfile';
import History from '~/pages/Profile/History/History';
import EditOrders from '~/pages/Profile/EditOrders/EditOrders';
import BlogAdmin from '~/admin/Blog/Blog';
import { CreateBlogs } from '~/admin/Blog/CreateBlogs';
import { BlogsManagement } from '~/admin/Blog/BlogsManagement';
import Technology from '~/pages/ProductCategory/Technology';
import Sport from '~/pages/ProductCategory/Sport';
import MusicalInstruments from '~/pages/ProductCategory/MusicalInstruments';
import Jewelry from '~/pages/ProductCategory/Jewelry';
import About from '~/pages/About';
import DefaultLayout2 from '~/layouts/DefaultLayout2';
// import ProductManagement from '~/layouts/Admin/ProductManagement/ProductManagement';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.logout, component: Logout },
    { path: config.routes.product, component: Product },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search },
    { path: config.routes.message, component: Message, layout: HeaderOnly },
    { path: config.routes.shoppingCart, component: ShoppingCart },
    { path: config.routes.feedback, component: feedback },
    { path: config.routes.logIn, component: Login, layout: HeaderOnly },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.products, component: Products },
    { path: config.routes.post, component: Posts },
    { path: config.routes.pay, component: Pay },
    { path: config.routes.about, component: About },

    { path: config.routes.settings, component: Setting, layout: DefaultLayout2},

    { path: config.routes.technology, component: Technology },
    { path: config.routes.sport, component: Sport },
    { path: config.routes.musicalInstruments, component: MusicalInstruments },
    { path: config.routes.jewelry, component: Jewelry },

    { path: config.routes.EditProfile, component: EditProfile },
    { path: config.routes.History, component: History },
    { path: config.routes.EditOrders, component: EditOrders },

    { path: config.routes.adminHome, component: HomeAdmin, layout: AdminLayout },
    { path: config.routes.adminNotification, component: NotificationAdmin, layout: AdminLayout },
    { path: config.routes.adminOrder, component: OrderAdmin, layout: AdminLayout },
    { path: config.routes.adminProduct, component: ProductAdmin, layout: AdminLayout },
    { path: config.routes.adminUser, component: UserAdmin, layout: AdminLayout },

    { path: config.routes.adminCreateProduct, component: CreateProducts, layout: AdminLayout },
    { path: config.routes.adminProductManagement, component: ProductManagement, layout: AdminLayout },

    { path: config.routes.adminBlog, component: BlogAdmin, layout: AdminLayout },
    { path: config.routes.adminCreateBlog, component: CreateBlogs, layout: AdminLayout },
    { path: config.routes.adminBlogManagement, component: BlogsManagement, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
