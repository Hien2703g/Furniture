const Product= require("../../models/product_model");
// [GET] /products
module.exports.index = async (req,res) =>{

    const products =await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position:"desc"})
    ; 

    const newProducts=products.map(item =>{
        item.priceNew = 
        (item.price * (100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    // console.log(newProducts);
    
    res.render("client/pages/products/index",{
        pageTitle: "Danh sach san pham",
        products: newProducts
    });

   
}

//[GET] products/:slug

module.exports.detail= async (req,res)=>{
    try{
        const find={
            deleted: false,
            slug: req.params.slug,
            status:"active"
        };
        const product=await Product.findOne(find);
        // console.log(product);
        res.render("client/pages/products/detail",{ 
            pageTitle: product.title,
            product:product
        });
    } catch(error){
        // req.flash("error","Không tồn tại sản phẩm này");
        res.redirect(`/products`)
    }

}
