module.exports=(query)=>{
    // định nghĩa một mảng các nút bấm
    let filterStatus=[
        {
            name: "Tất cả",
            status: "",
            class:""
        },
        {
            name: "hoạt động",
            status: "active",
            class:""
        },{
            name: "đừng hoạt động",
            status: "inactive",
            class:""
        }
    ];
    if(query.status){
        //tim vi tri 1 banr ghi thoa man 1 dk naof do
        const index = filterStatus.findIndex(item => item.status == query.status);
        // console.log(index);
        filterStatus[index].class="active";
    }else{
        const index = filterStatus.findIndex(item => item.status == "");
        // console.log(index);
        filterStatus[index].class="active";
    };
    return filterStatus;

}