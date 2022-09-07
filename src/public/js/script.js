var sidebar = document.querySelector('.sidebar')
sidebar.addEventListener("mouseover", ()=>{
    document.querySelector('.grid').style.gridTemplateColumns = "auto 80%";
});

sidebar.addEventListener("mouseout", ()=>{
    document.querySelector('.grid').style.gridTemplateColumns = "auto 92.5%";
});