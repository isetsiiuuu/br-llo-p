const galleri = document.querySelector("#gallery");
const button = document.querySelector(".cameraBtn")
function getImages(){
   const images = JSON.parse(localStorage.getItem("tagnaBilder"));
//    console.log(images);
   for (let i = 0; i < images.length; i++){
       createImages(images[i], i);
   }
};
getImages();
function deleteFunction(index){
const newImages = JSON.parse(localStorage.getItem("tagnaBilder"));
newImages.splice(index, 1);
localStorage.setItem("tagnaBilder", JSON.stringify(newImages));
console.log(index)
}


function createImages(image, index) {
const imgDiv = document.createElement("div") ; 
const removeButton = document.createElement("button");
const imageElem = document.createElement("img");
imageElem.setAttribute("src", image.image)
imgDiv.appendChild(imageElem);
removeButton.innerHTML = "x";
removeButton.setAttribute("class", "removeButton");
imgDiv.setAttribute("class","imgDiv")
removeButton.addEventListener("click", () => {
    imgDiv.removeChild(removeButton,imageElem);
    imgDiv.parentNode.removeChild(imgDiv);
    deleteFunction(index);
})
imgDiv.appendChild(removeButton);
galleri.appendChild(imgDiv);
}

button.addEventListener("click", () =>{
    window.location.replace("../kamera.html");
})