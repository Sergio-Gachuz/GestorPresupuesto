var sidebar = document.querySelector('.sidebar')
sidebar.addEventListener("mouseover", ()=>{
    document.querySelector('.grid').style.gridTemplateColumns = "auto 84.6%";
});

sidebar.addEventListener("mouseout", ()=>{
    document.querySelector('.grid').style.gridTemplateColumns = "auto 94.2%";
});