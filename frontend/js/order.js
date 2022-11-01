// 菜單區 點餐按鈕
// *********************** misho:1
const allBtns = document.querySelectorAll(".order-btn"); // 選取所有點餐鈕
allBtns.forEach((btn) => {     // 在每一個點餐鈕中加入eventListener
    btn.addEventListener("click",(e)=>{
        let dish_number = btn.getAttribute("number");  // 餐點號碼
        console.log(`dish number: ${dish_number}`);  
        formSubmit(dish_number);  // 呼叫下方function, 送出
    });
}
)
// ########################

// 頁面下方點餐表單
function formSubmit(dish_number){
        const forms = document.querySelector("#order_index"); // 選取表單
        document.querySelector("#input-value_1").value = dish_number; // 選取接收到的餐點編號
        forms.submit(); // 傳資料到 route --> "/order"
    };

