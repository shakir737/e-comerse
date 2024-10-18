 import { GoogleAuthProvider,FacebookAuthProvider, GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
 import {app}from '../../src/firebase';
 import { FaFacebookSquare, FaGithub } from "react-icons/fa";
 import { FcGoogle } from "react-icons/fc";
 import { useNavigate } from 'react-router-dom';

 export default function OAuth() {

   const navigate = useNavigate();
   const handleGoogleClick = async () => {
     try {
       const provider = new GoogleAuthProvider();
       const auth = getAuth(app);

       const result = await signInWithPopup(auth, provider);
       if(!result.user.email) {
        return alert("This Account Is Not Accessable!");
       }
       const res = await fetch('http://localhost:4000/api/user/register', {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
           firstname: result._tokenResponse.firstName,
           lastname: result._tokenResponse.lastName,
           email: result.user.email,
           password: result.user.displayName.trim()
        }),
      });
       const data = await res.json();
       
       if(data.status === "fail") {
       alert(data?.message);
       }else{
         navigate('/');
       }
     } catch (error) {
       console.log('could not sign in with google', error);
     }
   };
   const handleFBClick = async () => {
     try {
       const provider = new GithubAuthProvider();
    
       const auth = getAuth(app);
    
       const result = await signInWithPopup(auth, provider);
       console.log(result);
        const res = await fetch('http://localhost:4000/api/user/login', {
         method: 'POST',
        headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
      }),
   });
       const data = await res.json();
       console.log(result);
   
       navigate('/');
     } catch (error) {
       console.log('could not sign in with google', error);
     }
   };
   return (
     <div className="text-center space-x-3">
           <button
             onClick={handleGoogleClick}
             className="btn btn-circle hover:bg-green hover:text-white"
           >
           <FcGoogle size={34} />
           </button>
           <button  onClick={handleFBClick} className="btn btn-circle hover:bg-green hover:text-white">
           <FaFacebookSquare size={34}/>
           </button>
           <button  onClick={handleFBClick} className="btn btn-circle hover:bg-green hover:text-white">
           <FaGithub  size={34}/>
           </button>
         </div>
   );
 }
