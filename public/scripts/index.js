// sign-up and sign-in page
const container = document.getElementById('container');
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');

setTimeout(() => {
  container.classList.add('sign-in');
},200);

const toggle = () => {
  container.classList.toggle('sign-in');
  container.classList.toggle('sign-up');
 
};

signIn.addEventListener("click",toggle);
signUp.addEventListener("click",toggle);

  $('#auth-tutor').on('click', function() {
    $('#login-tutor-section').show();
    $('#student-list-section').hide();
    $('#tutor-profile-section').hide();
    $('#apply-tutor-section').hide();
    $('#class-tutor-section').hide();
  });

  $('#home-nav').on('click', function() {
    $('#login-tutor-section').show();
    $('#student-list-section').hide();
    $('#tutor-profile-section').hide();
    $('#apply-tutor-section').hide();
    $('#class-tutor-section').hide();
  });

  $('#tutor-profile-nav').on('click', function() {
    $('#login-tutor-section').hide();
    $('#student-list-section').hide();
    $('#tutor-profile-section').show();
    $('#apply-tutor-section').hide();
    $('#class-tutor-section').hide();
  });

  $('#tutor-signin').on('click', function() {
    $('#login-tutor-section').hide();
    $('#student-list-section').hide();
    $('#tutor-profile-section').show();
    $('#apply-tutor-section').hide();
    $('#class-tutor-section').hide();
  });

  $('#studlist-nav').on('click', function() {
    $('#login-tutor-section').hide();
    $('#student-list-section').show();
    $('#tutor-profile-section').hide();
    $('#apply-tutor-section').hide();
    $('#class-tutor-section').hide();
  });

  $('#apply-tutor-nav').on('click', function() {
    $('#login-tutor-section').hide();
    $('#student-list-section').hide();
    $('#tutor-profile-section').hide();
    $('#apply-tutor-section').show();
    $('#class-tutor-section').hide();
  });


//navbar when logged in and logged out
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const tutorName = document.querySelector('.tutorName');
const tutorEmail = document.querySelector('.tutorEmail');
const tutorContactNo = document.querySelector('.tutorContactNo');
const teachingSubj = document.querySelector('.teachingSubj');
const eduBackground = document.querySelector('.eduBackground');
const ClassFrom = document.querySelector('.ClassFrom');
const DayClass = document.querySelector('.DayClass');
const paymentFee = document.querySelector('.paymentFee');
const SubjClass = document.querySelector('.SubjClass');
const SectClass = document.querySelector('.SectClass');
const DateClass = document.querySelector('.DateClass');
const TopicClass = document.querySelector('TopicClass');

const setupUI = (user) => {
  if (user) {

    db.collection('TutorRegistration').doc(user.uid).get().then(doc =>{
      //account info
      const f_name = `<p>${doc.data().tutorName}</p>`;
      const t_email = `<p>${doc.data().tutorEmail}</p>`;
      const phone_no = `<p>${doc.data().tutorContactNo}</p>`;
      const subj = `<p>${doc.data().teachingSubj}</p>`;
      const edu = `<p>${doc.data().eduBackground}</p>`;
      const fee = `<p>${doc.data().paymentFee}</p>`;

      tutorEmail.innerHTML = t_email;
      tutorName.innerHTML = f_name;
      tutorContactNo.innerHTML = phone_no;
      teachingSubj.innerHTML = subj;
      eduBackground.innerHTML = edu;
      paymentFee.innerHTML = fee;
   
      })

      //get class registration tutor
      const listClass = document.querySelector("#listClass");
      db.collection('TutorRegistration').doc(user.uid).get().then(snapshot => {
            db.collection("TutorRegistration").doc(user.uid).collection('ClassRegistration').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                  listClass.innerHTML +=  `
                    <tr data-id='${doc.id}'>
                    <td> ${doc.data().DayClass} </br> ${doc.data().ClassFrom} - ${doc.data().ClassTo}</td>
                    <td>${doc.data().SubjClass}</td>
                    <td>${doc.data().TeachForm}</td>
                    <td>${doc.data().SectClass}</td>
                    <td> <a href="#class-tutor-section"> <button id="Classview" class="onView" >View</button></a> </td>
                    <td> <button id="Classdelete" onclick"deleteClass()" class="onDelete" >Delete</button> </td> </tr>`;
                    console.log(doc.data());

                    //view teaching materials page
                    const btnView = document.querySelector(`[data-id='${doc.id}'] .onView`)
                    btnView.addEventListener('click',(e) =>{
                      e.preventDefault();
                      const classMat = document.querySelector("#classMat");
                      db.collection('TutorRegistration').doc(user.uid).collection('ClassRegistration').doc(`${doc.id}`).get().then(() =>{
                        classMat.innerHTML +=`
                        <h3> ${doc.data().SubjClass}</h3>
                        <p> Section ${doc.data().SectClass}</p>`
                        
                        // const id  = `${doc.id}`
                        // const t_subj = `<h3> ${doc.data().SubjClass}</h3>`;
                        // const sect = `<p> Section ${doc.data().SectClass}</p>`;
                        
                        // id.innerHTML = id;
                        // SubjClass.innerHTML = t_subj;
                        // SectClass.innerHTML = sect;
   
                      })
                    })
                   
                    //delete data from tutor class
                    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .onDelete`);
                    btnDelete.addEventListener('click',(e) =>{
                    e.preventDefault();
                    if (confirm("Are you sure want to delete this class?")== true){
                      db.collection('TutorRegistration').doc(user.uid).collection('ClassRegistration').doc(`${doc.id}`).delete().then(() => {
                        console.log('Class succesfully deleted!');
                      }).catch(err => {
                        console.log('Error removing document', err);
                      });
                    }else {
                        console.log('Class not deleted!');
                    }
                  
                    });
                });
          });
      });

      //get teching materials buat macam table punya function tapi version lain
     const listMaterials = document.querySelector("#listMaterials");
      db.collection('TutorRegistration').doc(user.uid).get().then(snapshot => {
        db.collection("TutorRegistration").doc(user.uid).collection('ClassRegistration').get().then(snapshot => {
          db.collection('TutorRegistration').doc(user.uid).collection('ClassRegistration').doc(user.id).collection('TeachingMaterials').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              console.log(doc.data());
             listMaterials.innerHTML +=`
             <h3>${doc.data().DateClass} </h3>
             <h3>${doc.data().TopicClass} </h3>`


              // TopicClass.innerHTML = ClassTopic;
              // const ClassDate = `<h3> ${doc.data().DateClass}</h3>`;
              // const ClassTopic = `<h3> ${doc.data().TopicClass}</h3>`;
              // DateClass.innerHTML = ClassDate;
              // TopicClass.innerHTML = ClassTopic; 

            console.log(doc.data());
          });
        });  
      });
  });
 
  //get class registration tutor
  const listStudents = document.querySelector("#listStudents");
  db.collection('TutorRegistration').doc(user.uid).get().then(snapshot => {
        db.collection("TutorRegistration").doc(user.uid).collection('StudentRequest').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              listStudents.innerHTML +=  `
               <tr data-id='${doc.id}'>
                <td>${doc.data().studName}</td>
                <td>${doc.data().day} <br> ${doc.data().time}</td>
                <td>${doc.data().subject}</td>
                <td> <button id="AcceptStud" class="onAccept" >Accept</button></a> </td>
                <td> <button id="RejectStud"  class="onReject" >Reject</button> </td> </tr>`
               
                const acceptbtn = document.querySelector(`[data-id='${doc.id}'] .onAccept`);
                acceptbtn.addEventListener('click',() =>{
                  document.getElementById("listStudents").deleteRow(1);
                })
              
                 
                
                //delete students from list tutor class
                 const btnDelete = document.querySelector(`[data-id='${doc.id}'] .onReject`);
                 btnDelete.addEventListener('click',(e) =>{
                 e.preventDefault();
                 db.collection('TutorRegistration').doc(user.uid).collection('StudentRequest').doc(`${doc.id}`).delete().then(() => {
                   console.log('Student succesfully rejected!');
                   }).catch(err => {
                     console.log('Error removing document', err);
                   });
                 });
            });

      });
  });

    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }
  else {
    tutorEmail.innerHTML = '';
    tutorName.innerHTML = '';
    tutorContactNo.innerHTML = '';
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//calendar function section in tutor-dashboard
let calendar = document.querySelector('.calendar')
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}



