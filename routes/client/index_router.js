const productRoutes =require("./product_route");
const homeRoutes= require("./home_router");

module.exports = (app) =>{
    app.use("/",homeRoutes);
    app.use("/products", productRoutes);
   
}

