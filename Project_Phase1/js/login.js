//Login verification
let users
let login = document.getElementById('form5')

fetch('users.json').then(response=>response.json())
.then(data=>
    {
        users = data
        login.addEventListener('submit',function(event){
            event.preventDefault()
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            const type = document.getElementById('userType').value

            checkLogin(username,password,users,type)

        })


    })
function checkLogin(username,password,users,type){
    if(username==0||password==0||type=="0"){
        alert("Please fill all details")
    }
    else{
        let user1
        switch(type){
            case "1":user1=users.customers;break
            case "2":user1=users.sellers;break
            case "3":user1=users.admins;break
        }
        const index = user1.findIndex(us=>us.username==username&&us.password==password)
        if(index==-1){
            alert("Invalid Username/Password")
        }
        else{
            window.location.href = "index.html"
        }
    }
}
