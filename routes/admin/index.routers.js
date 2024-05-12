const dashboarRoutes=require("./dashboard.route");

const producRoutes=require("./product.routes");

const systemConfig= require("../../config/system");

module.exports= (app) =>{
    const PATH_ADMIN=systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboarRoutes);
    app.use(PATH_ADMIN+"/products",producRoutes);
}
