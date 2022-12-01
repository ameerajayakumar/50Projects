const nameF = document.getElementById('name');
const email = document.getElementById('email');
const genderM = document.getElementById('male');
const genderF = document.getElementById('female');
const genderN = document.getElementById('none');
const course = document.getElementById('course');
const submitButtom = document.getElementById('submit');

submitButtom.addEventListener('click', validateForm);

function validateForm() {
  let flag = false;
  for (let i = 0; i < course.length; i++) {
    if (course[i].selected) flag = true;
  }
  if (nameF.value == null || nameF.value == '') {
    console.log(nameF);
    alert('Please enter your name.');
    return false;
  } else if (email.value == null || email.value == '') {
    alert('Please enter an email.');
    return false;
  } else if (genderN.checked == false && genderM.checked == false && genderF.checked == false) {
    alert('Please enter a gender.');
    return false;
  } else if (flag == false) {
    alert('Please select the courses!');
    return false;
  } else {
    alert('Form Successfully Submitted!!');
    formClear();
    return true;
  }
}

function formClear() {
  const formID = document.getElementById('formID');
  formID.reset();
}
