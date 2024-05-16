// console.log("ok");
const buttonsStatus =document.querySelectorAll("[button-status]");

// console.log(buttonsStatus);
if(buttonsStatus.length >0){
    let url=new URL(window.location.href);
    // console.log(url);

    buttonsStatus.forEach(button =>{
       button.addEventListener("click",()=>{
        const status=button.getAttribute("button-status");
        // console.log(status);
        if(status){
            url.searchParams.set ("status",status);
        }
        else{
            url.searchParams.delete("status");
        }
        // console.log(url.href);
        // chuyen huong.
        window.location.href=url.href;
       });

    });
}
// end button status

// Form Search
const formSearch=document.querySelector("#form-search");
if(formSearch){
    let url=new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value;
        // console.log(e.target.elements.keyword.value);
        if( keyword){
            url.searchParams.set("keyword",keyword);
        }else{
            url.searchParams.delete("keyword");
        }
        window.location.href=url.href;
    })
}

//end form search

//pagination
const buttonsPagination= document.querySelectorAll("[button-pagination]");
// console.log(buttonsPagination);
if(buttonsPagination){
    let url=new URL(window.location.href);
    buttonsPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page=button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href=url.href;
        });
        

    });
}
//end pagtination

//checkbox multi
const checkboxMulti=document.querySelector("[checkbock-multi]");
if(checkboxMulti){
    // console.log(checkboxMulti);
    const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']");
    // console.log(inputCheckAll);
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']");
    // console.log(inputsId);
    inputCheckAll.addEventListener("click",()=>{
        // console.log(inputCheckAll.checked);
        if(inputCheckAll.checked){
            inputsId.forEach(input=>{
                input.checked=true;
            });
        }else{
            inputsId.forEach(input=>{
                input.checked=false;
            });
        }

    });
    inputsId.forEach(input =>{
        input.addEventListener("click",()=>{
            const coutChecked=checkboxMulti.querySelectorAll(
                "input[name='id']:checked"
            ).length;
            if(coutChecked == inputsId.length){
                inputCheckAll.checked=true;
            }else{
                inputCheckAll.checked=false;
            }

        });
    })
}

//end checkbox multi

// Form Change Multi
const formChangeMulti=document.querySelector("[form-change-multi]");
if(formChangeMulti){
    // console.log(formChangeMulti);
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        // console.log(e);

        const checkboxMulti=document.querySelector("[checkbock-multi]");
                                                        
        const inputsChecked=checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );
        const typeChange=e.target.elements.type.value;
        // console.log(typeChange);
        if(typeChange=="delete-all"){
            const isConfirm=confirm("bạn có chắc muốn xóa những sản phẩm này không?");
            if(!isConfirm){
                return;
            }

        }
        if(inputsChecked.length>0){
            let ids=[];
            const inputIds= formChangeMulti.querySelector(
                "input[name='ids']"
            );
            
            inputsChecked.forEach(input=>{
                const id=input.value;
                if(typeChange=="change-position"){
                    const position=input
                        .closest("tr")
                        .querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id);
                }

                
            });
            // console.log(ids.join(", "));
            inputIds.value=ids.join(", ");
            formChangeMulti.submit();
            
        }else{
            alert("Vui long chon it nhat 1 ban ghi!");
        }
    });
}
// End change multi

// Show Alert
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("[close-alert]");
    
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time);
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
   
}
//End Show Alert

//Upload Image
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        console.log(e);
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    });
}
//end upload Image

//Sort
const sort=document.querySelector("[sort]");
// console.log(sort);
if(sort){
    let url=new URL(window.location.href);
    const sortSelect=sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");


    sortSelect.addEventListener("change",(e)=>{
        // console.log(e);
        const value= e.target.value;
        const [sortKey , sortValue]=value.split("-");

        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href=url.href;
    });
    // Xoa sap xep
    
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href=url.href;
    });
    // them mac dinh selected cho option
    const sortKey= url.searchParams.get("sortKey");
    const sortValue=url.searchParams.get("sortValue");
    if( sortKey && sortValue){
        const stringSort=`${sortKey}-${sortValue}`;
        console.log(stringSort);
        const optionSelect=sortSelect.querySelector(`option[value='${stringSort}']`);
        optionSelect.selected = true;
    };
}
//end Sort



