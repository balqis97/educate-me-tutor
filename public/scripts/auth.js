
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGWqdA7qfKOnOBEuo_08nG7YUZM54znTI",
  authDomain: "e-ducate-me.firebaseapp.com",
  databaseURL: "https://e-ducate-me-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-ducate-me",
  storageBucket: "e-ducate-me.appspot.com",
  messagingSenderId: "354977666843",
  appId: "1:354977666843:web:c799cf49ed43c013be25be",
  measurementId: "G-7EXJMT3JM0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// const storage =  firebase.storage();
const user = firebase.auth().currentUser;


//update firestore settings
db.settings({ timestampsInSnapshots: true });

//listen for auth status change
auth.onAuthStateChanged((user) => {
    if (user){
      setupUI(user);
      console.log('user logged in: ', user);
    }
    else {
      setupUI();
        console.log('user logged out');
    }
    
});


// tutor register using set cred

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const t_email = registerForm['t_email'].value;
    const t_password = registerForm['t_password'].value;
    // const file = registerForm['file'].value;
    auth.createUserWithEmailAndPassword(t_email, t_password).then(cred => {
      return db.collection('TutorRegistration').doc(cred.user.uid).set({
          tutorEmail: t_email,
          tutorName: registerForm['f_name'].value,
          tutorContactNo: registerForm['phone_no'].value,
          teachingSubj: registerForm['subj'].value,
          eduBackground: registerForm['edu'].value,
         
          
      });

    }) 
    let storageRef = firebase.storage();

    let file = document.getElementById('file').files[0]
    console.log(file)

    let thisRef = storageRef.child(file.name)

    thisRef.put(file).then(res=>{
      console.log('upload Success')
      alert('Upload Succes')
    }).catch(e=>{
      console.log('Error'+ e)
    })
    
    
//  const storageRef = firebase.storage().ref();
    // const file = document.querySelector('#fileButton').files[0];
    // const final = storage.child(`resume/${file}`);
    // const task = final.put(file);

    // task.on('state_changed',
    //   function progress(progress){
    //     console.log(progress.bytesTransferred / progress.totalBytes * 100)
    //   },
    //   function error(err){
    //     console.log('There was An Err' + err)
    //   }
    // )
    
    // const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child('Tutor/' + 'Resume/'+ user.uid);
    // const task = fileRef.put(file);
    // task.on('state_changed', 
    // function progress(snapshot) {
    //   var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   uploader.value = percentage;
    //   })
      
  //   .then(()=> {
  //   registerForm.reset();
  //   alert("Your account has been created! Go to Sign-In page")
  // });
})

function uploadImage(){
  const ref = firebase.storage().ref('Tutor/');
  const file = document.querySelector('#filePhoto').files[0];
  const name = +new Date() +"_" + file.name;
  constmetadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file,metadata);
  task
    .then(url => {
      console.log(url);
      document.querySelector("#image").src = url;
    })
    .catch(console.error);
}

//add data for tutor class 
const addclassForm = document.querySelector('#addclass-Form');

addclassForm.addEventListener('submit',(e) =>{
  e.preventDefault();
  var uid = firebase.auth().currentUser.uid;

 db.collection('TutorRegistration').doc(uid).collection('ClassRegistration').add({
      ClassFrom: addclassForm['f_time'].value,
      ClassTo: addclassForm['t_time'].value,
      DayClass: addclassForm['day'].value,
      SubjClass: addclassForm['t_subj'].value,
      TeachForm: addclassForm['tech_form'].value,
      SectClass: addclassForm['sect'].value
      
    })
      .then(()=> {
      addclassForm.reset();
      console.log('Class succesfully add!');
    }).catch(err => {
      console.log('Error removing document', err);
   });
})



//add teching materials data
const techMaterials = document.querySelector('#techMaterials');
techMaterials.addEventListener('submit',(e) =>{
  e.preventDefault();
  var uid = firebase.auth().currentUser.uid;

  db.collection('TutorRegistration').doc(uid).collection('ClassRegistration').doc(uid).collection('TeachingMaterials').add({
    DateClass: techMaterials['ClassDate'].value,
    TopicClass: techMaterials['ClassTopic'].value
    
  }).then(()=> {
    techMaterials.reset();
    console.log('Teaching materials succesfully added!');
  }).catch(err => {
    console.log('Error removing document', err);
  });
})



//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector('#signin-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['signin-email'].value;
    const password = loginForm['signin-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //reset the form
        alert("Welcome Back to Educate.me")
        //loginForm.reset();
        
    })
})












