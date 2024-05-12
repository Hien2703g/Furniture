//[get]/admin/dashboad

module.exports.dasboard= (req,res)=>{
    res.render("admin/pages/dashboard/index",{
        pageTitle: "Trang tong quan"

    });
}