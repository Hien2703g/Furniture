//[get] admin/products
const Product=require("../../models/product_model");
const filterStatusHelper=require("../../helpers/fiterStatus");
const SearchHelper=require("../../helpers/search");
const PaginationHelper=require("../../helpers/pagination");

const systemConfig=require("../../config/system");
const { query } = require("express");
const system = require("../../config/system");

// [Get] /admin/products
module.exports.index = async (req,res)=>{
    // console.log(req.query.status);
    //bo loc
    const filterStatus=filterStatusHelper(req.query);
    // console.log(filterStatus);

    // console.log(filterStatus);
    let find={
        deleted:false
        
    };
    if(req.query.status){
        find.status=req.query.status;
    }
    
   // Tim kiem
    const objectSearch=SearchHelper(req.query);

    if(objectSearch.regex){
        find.title=objectSearch.regex;
    }
        

    //phan trang
    const countProducts = await Product
    // .sort({position:"desc"})
    .countDocuments(find);

    let objectPagination=PaginationHelper({
        currentPage:1,
        limitItems:4
        },
        req.query,
        countProducts
    );
    // if( req.query.page){
    //     objectPagination.currentPage=parseInt(req.query.page);
    // }


    // objectPagination.skip=(objectPagination.currentPage-1)* objectPagination.limitItems;

    // const countProducts = await Product.countDocuments(find);
    // const totalPage=Math.ceil(countProducts/objectPagination.limitItems);
    // // console.log(totalPage);
    // objectPagination.totalPage=totalPage;
    //end phan trang


    const products= await Product.find(find)
    .sort({position:"asc"})
   
    // console.log(products);
    .limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.render("admin/pages/products/index",{
        pageTitle:" danh sach san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination

    });
}

//[PATCH]  /admin/products/change-status/:status/:id

module.exports.changeStatus= async(req,res)=>{
    // console.log(req.params);
    const status=req.params.status;
    const id=req.params.id;
    await Product.updateOne({_id: id},{status: status});

    req.flash("success","cập nhật thành công!");
    // res.send(`${status}-${id}`);
    res.redirect("back");
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti= async(req,res) => {
    const type=req.body.type;
    const ids=req.body.ids.split(", ");
    // console.log(req.body);
    //update
    switch(type){
        case "active":
            await Product.updateMany({_id:{$in: ids}},{status: "active"});
            req.flash("success",`cập nhật thành công! ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({_id:{$in: ids}},{status: "inactive"});
            req.flash("success",`cập nhật thành công! ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({_id:{$in:ids}},{
                deleted:true,
                deleteAt: new Date()
            });
            req.flash("success",`xóa thành công! ${ids.length} sản phẩm`);
            break; 
        case "change-position":
            // console.log(ids);
            for(const item of ids){
                let [id,position]=item.split("-");
                // console.log(item.split("-"));
                position=parseInt(position);
                // console.log(id);
                // console.log(position);
                await Product.updateOne({_id:id},{
                    position:position
                });
            }
            req.flash("success",`cập nhật thành công! ${ids.length} sản phẩm`);
            break;
        default:
            break;

    }
    
    res.redirect("back");
}

//[DELETE] /admin/product/delete/:id
module.exports.deleteItem=async(req,res)=>{
    const id=req.params.id;
    await Product.updateOne({_id:id},{
        deleted:true,
        deleteAt: new Date()
    });
    req.flash("success","Đã xóa thành công");
    res.redirect("back");
};



// [Get] /admin/products/create
module.exports.create = async (req,res)=>{
    
    res.render("admin/pages/products/create",{
        pageTitle:" Them mới sản phẩm",

    });
}
//[POST] /admin/products/create
module.exports.createPost =async(req,res)=>{
    // console.log(req.file);
    
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.rating=parseFloat(req.body.rating);
    // req.body.position=parseInt(req.body.position);

    if(req.body.position== "" ){
        const countProducts = await Product.countDocuments();
        req.body.position=countProducts+1;
        // console.log(countProducts);
    }
    else{
        req.body.position=parseInt(req.body.position);
    }
    // if(req.file){
    //     req.body.thumbnail=`/uploads/${req.file.filename}`;
    // }
    const product=new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [Get] /admin/products/edit
module.exports.edit= async (req,res)=>{
    // console.log(req.params.id);
    try{
        const find={
            deleted: false,
            _id: req.params.id
        };
        const product=await Product.findOne(find);
        // console.log(product);
        res.render("admin/pages/products/edit",{ 
            pageTitle:"Chỉnh sửa sản sản phẩm",
            product:product
        });
    } catch(error){
        // req.flash("error","Không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }

    
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res)=>{
    // console.log(req.body);
    const id=req.params.id;
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    req.body.rating=parseFloat(req.body.rating);
    req.body.position=parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`;
    }
    
    try{
        await Product.updateOne({_id: id},req.body);
        req.flash("success","cập nhật thành công!");
    } catch (error){
        
        req.flash("error","cập nhật không thành công!");

    }
    res.redirect("back");

}

// [Get] /admin/products/detail/:id
module.exports.detail= async (req,res)=>{
    // console.log(req.params.id);
    try{
        const find={
            deleted: false,
            _id: req.params.id
        };
        const product=await Product.findOne(find);
        // console.log(product);
        res.render("admin/pages/products/detail",{ 
            pageTitle:product.title,
            product:product
        });
    } catch(error){
        // req.flash("error","Không tồn tại sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }

    
}