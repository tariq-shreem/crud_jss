var courseNameInput = document.getElementById('courseName');
var courseCategoryInput = document.getElementById('courseCategory');
var coursePriceInput = document.getElementById('coursePrice');
var courseDescriptionInput = document.getElementById('courseDescription');
var addBtn = document.getElementById('click');
var inputs = document.getElementsByClassName('inputs');
var deleteBtn = document.getElementById('deleteBtn');
var data = document.getElementById('data');
var nameAlert=document.getElementById('nameAlert');
var currentIndex=0;
if(localStorage.getItem("coursesList")==null){
    var courses = [];
}else {
 var courses = JSON.parse(localStorage.getItem("coursesList"));
 displayData();
}
addBtn.onclick = function(){
    if(addBtn.innerHTML=="Add Cource"){
    addCourse();
    }
    else{
        updateCourse();
    }
    displayData();
    clearForm();
}
function addCourse(){
    var course = {
        name:courseNameInput.value,
        category:courseCategoryInput.value,
        price:coursePriceInput.value,
        desc:courseDescriptionInput.value
    }
    courses.push(course);
    localStorage.setItem("coursesList",JSON.stringify(courses));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}
function displayData(){
    var result = "";
    for(var i=0;i<courses.length;i++){
        result+=`
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td><button class="btn btn-outline-info" onclick=getCourseData(${i})> update </button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})"> delete </button></td>
        </tr>
        `;
    }
    data.innerHTML = result;
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
    addBtn.innerHTML="Add Cource";
}
function deleteCourse(index){

     
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        courses.splice(index,1);
        localStorage.setItem("coursesList",JSON.stringify(courses));
        displayData();
      Swal.fire(
        'Deleted!',
        'course has been deleted.',
        'success'
      )
    }
  })

 
}
 deleteBtn.onclick=function(){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("coursesList");
            courses=[];
            data.innerHTML = "";
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
 
}
function search(searchText){

    var result = "";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(searchText.toLowerCase())){
        result+=`
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td><button class="update"> update </button></td>
            <td><button class="delete" onclick="deleteCourse(${i})"> delete </button></td>
        </tr>
        `;
    }
    }
    data.innerHTML = result;
}
function getCourseData(index){
   
    var course = courses[index];
   
    courseNameInput.value=course.name;
    courseCategoryInput.value=course.category;
    coursePriceInput.value=course.price;
    courseDescriptionInput.value=course.desc;
    addBtn.innerHTML="update course";
    currentIndex=index;

}                               
function updateCourse(){
    var course = {
        name:courseNameInput.value,
        category:courseCategoryInput.value,
        price:coursePriceInput.value,
        desc:courseDescriptionInput.value
    };
    courses[currentIndex].name=course.name;
    courses[currentIndex].category=course.category;
    courses[currentIndex].price=course.price;
    courses[currentIndex].desc=course.desc;
    localStorage.setItem("coursesList",JSON.stringify(courses));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

}
courseName.onkeyup=function(){
    var namePattern =/^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(courseName.value)){
        addBtn.removeAttribute("disabled");
        courseName.classList.add('is-valid');
        courseName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }else {
        addBtn.setAttribute("disabled","true");
        courseName.classList.add('is-invalid');
        courseName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }
}