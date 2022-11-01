function MyClientModule() {
   //这里有点疑惑  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript 采集自这里，John 1:03:43
    const msgDiv = document.querySelector("div#message-contenier");
    function checkForErrors() {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      console.log("urlParams", params.msg);
      if (params.msg){
        // 这里的一样代码可以让params.msg的信息 替换给 html里面的带id 为content的内容
        msgDiv.querySelector("#content").innerHTML = params.msg;
        // 这里的一行代码是为了让条件达到的时候，css里面的关于msgDiv的样式出现
        msgDiv.style.display = "flex";
    }
  }
    //这个function 是为了check 有没有在之前登陆成功
    async function checkIfloggedIn(){
      const res = await fetch("/getuser");
      const user = await res.json();
      const spanIsAuth = document.querySelector("isAuth");
      if (user.user) {
        spanIsAuth.innerHTML = "In!"
      }else {
        spanIsAuth.innerHTML = "Out!"
      }
      return user.user !== undefined;
     }

       //**************************** */ 
    //This is for submit a form which require to delete DB for cart
    const vip_form = document.querySelector("#fuckyou");
    if (vip_form){
    vip_form.addEventListener("click", ()=>{
      console.log("cart collection's info has been deleted")
      const forms = document.querySelector("#vip-form"); 
      forms.submit();
     });
    }else{

    }
     //###############################  111 Gaoxiang

    //**************************** */ 
    // This is for listening the cart req
    // const cart_form_button = document.querySelector("#motherfucker");
    // if (cart_form_button){
    //   cart_form_button.addEventListener("click", ()=>{
    //   console.log("start find cart collection's")
    //   const forms = document.querySelector("#testfoorcart"); 
    //   forms.submit();
    //  });
    // }else{
    //   console.log("no button")
    // }
     //###############################  111 Gaoxiang

    //  async function render(){
    //   const taskContainer = document.querySelector('#taskContainer');
    //   async function fetchTasks() {
    //   const result = await fetch("/getcart");
    //   console.log(result)
    //   const tasks = await result.json;
    //   console.log(result, tasks);
    //   return tasks;
    //   }
  
    //   async function renderTasks(){
    //   const tasks = await fetchTasks();
    //   for (let task of tasks) {
    //       const taskDiv = document.createElement("div");
    //       taskDiv.innerHTML = `<div class="div_raw"><div>task: ${task.proName} </div> <div>pay: ${task.proPrice}</div></div>`;
    //       taskContainer.appendChild(taskDiv);
    //   }
    //   console.log('sucessful render')
    //   }
    //   renderTasks();
    //   }
    //   render();



    checkForErrors();
    // checkIfloggedIn()
  }
  MyClientModule();
  