//selecting all required elements
const dropArea = document.querySelector('.drag-area'),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file;

button.onclick = () => {
  input.click();//if the user clicks on the button then the input is also clicked
}

input.addEventListener("change", function() {
  //getting user selected files. If user selects more than one, we'll only get the first one [0]
  file = this.files[0] 
  showFile() //calling function
  dropArea.classList.add('active')
});


//if user drags file over DropArea
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropArea.classList.add('active')
  dragText.textContent = "Release to upload file";
})
//if user leaves dragged file in DropArea
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active')
  dragText.textContent = "Drag And Drop to Upload File";
})
//if user drops file on DropArea
dropArea.addEventListener('drop', (event) => {
  event.preventDefault()  
  //getting user selected files. If user selects more than one, we'll only get the first one [0]
  file = event.dataTransfer.files[0] 
  showFile()//calling showFile function
});

function showFile() {
  let fileType = file.type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;//passing user file source in fileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`//creating an img tag and placing user selected file source inside src.
      dropArea.innerHTML = imgTag;//adding imgTag inside dropArea
    } 
    fileReader.readAsDataURL(file)
  } else {
    alert('This is not an image file!')
    dropArea.classList.remove("active")
  }
}

