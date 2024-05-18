const dashboarRoutes=require("./dashboard.route");

const productRoutes=require("./product.routes");

const systemConfig= require("../../config/system");
const productCategoryRoutes= require("./product-category.route");

module.exports= (app) =>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboarRoutes);
    app.use(PATH_ADMIN+"/products",productRoutes);
    app.use(PATH_ADMIN+"/products-category",productCategoryRoutes);
}
