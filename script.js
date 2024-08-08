const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const fontPicker = document.getElementById('fontPicker');
const btnSave = document.getElementById('btnSave');
const btnClear = document.getElementById('btnClear');
const btnRetrive = document.getElementById('btnRetrive');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//*******************Picker Logic ***********************/
colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvasColor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,400)
})

fontPicker.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value; 
})

//*********************Canvas Logic*********************//
canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
})

canvas.addEventListener('mouseup',(e)=>{
    isDrawing = false;
})

//****************** Buttos Logic *****************//
btnClear.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

btnSave.addEventListener('click',()=>{
    localStorage.setItem('canvasContent',canvas.toDataURL());
    let link = document.createElement('a');
    link.download = "my canvas.png";
    link.href = canvas.toDataURL();
    link.click();
})

btnRetrive.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContent');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})