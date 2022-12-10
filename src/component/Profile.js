import React, { useEffect, useState } from 'react'
import './Profile.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { sendEmailVerification, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '../context/UserAuthContext'
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,

} from "firebase/storage";
import DeleteIcon from '@mui/icons-material/Delete';
import { storage, db } from '../firebase.config';
const Profile = () => {
    const { verifyemail } = useAuth()
    const auth = getAuth()
    const [userids, setuserid] = useState("")
    const [Userprofile, setUserprofile] = useState()
    const [show, setshow] = useState(false)
    const { profileInformation } = useAuth()
    const [image, setimage] = useState("")
    const [profile, setprofile] = useState({
        aboutme: "",
        name: "",
        age: "",
        location: "",
        facebook: "",
        twitter: "",
        lnstagram: "",
        linkedIn: "",
        youTube: "",
        imageurl: "",
        uid: ""
    })
    const [verify, setverify] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid + "first")
                const check = user.emailVerified
                setverify(check)
                setuserid(user.uid)
                getData()

            } else {
            }
        });
        console.log(auth?.currentUser?.emailVerified + "is email is verify")
    }, [verifyemail, auth?.currentUser?.emailVerified])
    const getData = async () => {
        const q = query(collection(db, "profile"), where("uid", "==", auth?.currentUser?.uid));
        console.log({ userids } + "ingetdata")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserprofile(doc.data())
        });
    }
    console.log(auth?.currentUser?.emailVerified)
    const emailVerify = async () => {
        try {
            await sendEmailVerification(auth.currentUser)
            auth.languageCode = 'it';
            alert("email send ")

        } catch (error) {
            alert(`${error}`)
        }
    }
    const handler = (e) => {
        const { name, value } = e.target;
        setprofile(pre => {
            return {
                ...pre,
                ["uid"]: auth.currentUser?.uid,
                [name]: value
            }
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await profileInformation(profile)
            alert("Profile Update Successfully")
            setprofile({
                aboutme: "",
                name: "",
                age: "",
                location: "",
                facebook: "",
                twitter: "",
                lnstagram: "",
                linkedIn: "",
                youTube: "",
                uid: ""
            });
            setshow(false)
        } catch (error) {
            alert("someError")
            console.log(error)
        }
    }
    const updateProfileuser = () => {

    }


    const clear = () => {
        setprofile({
            aboutme: "",
            name: "",
            age: "",
            location: "",
            facebook: "",
            twitter: "",
            lnstagram: "",
            linkedIn: "",
            youTube: ""
        })
        setshow(false)
    }
    const uploudImage = (e) => {
        const imageref = e.target.files[0];
        const storgeref = ref(storage, `images/${Date.now()}-${imageref.name}`);
        const uploadimage = uploadBytesResumable(storgeref, imageref);
        uploadimage.on(
            "state_changed",
            (onSnapshot) => {
                const progress =
                    (onSnapshot.bytesTransferred / onSnapshot.totalBytes) * 100;
                console.log(progress)

            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadimage.snapshot.ref).then((downloadURL) => {
                    setimage(downloadURL)
                    setprofile(pre => {
                        return {
                            ...pre,
                            imageurl: downloadURL
                        }
                    })
                });
            }
        );
    };

    const removeimage = () => {
        console.log(profile.imageurl)
        const deleteRef = ref(storage, image);
        deleteObject(deleteRef)
            .then(() => {
                alert("deleted")
                setimage("")
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className='container'>
            <div className='innerbox'>
                <form onSubmit={submitHandler}
                    style={{
                        display: `${!show ? "none" : "block"}`
                    }}

                >
                    <div className='innerBoxEdit'>
                        <div className='heading'>
                            <h2 className='h2' style={{ fontSize: "50px" }}>Update Your Profile!</h2>
                        </div>
                        <div className='innerCintainer'>
                            <div className='box1'>
                                <div className='imageconatiner'>
                                    {!image ? (<label className='imagebox'>
                                        <div className='icons'>
                                            <input
                                                type="file"
                                                name="imageurl"
                                                style={{ visibility: "hidden" }}
                                                accept="image/*"
                                                onChange={uploudImage}
                                            ></input>
                                            <CloudUploadIcon className='size' fontSize="large">
                                            </CloudUploadIcon>
                                        </div>
                                    </label >) : (
                                        <div className='imagebox'>
                                            <img
                                                src={image}
                                                alt="uploaded image"
                                                className="imagebox"
                                            />
                                            <button className='deleteButton' type='reset' onClick={removeimage}>
                                                <DeleteIcon></DeleteIcon>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='box1 '>
                                <div className='  innerBox1 '>
                                    <div>
                                        <h6 className='h6' >About me:-</h6>
                                        <textarea onChange={handler} className="textarea" value={profile.aboutme} name="aboutme" rows="4" cols="50" maxLength="200" placeholder='Tell Us About YourSelf '></textarea>
                                    </div>
                                    <div className='   extraCss'>
                                        <div className='icon ' style={{
                                            display: "flex", alignItems: "center"
                                        }}>
                                            <FacebookIcon></FacebookIcon>
                                            <input className='inputdata' value={profile.facebook} name="facebook" onChange={handler} type="text" placeholder='enter your facebook Username'></input>
                                        </div>
                                        <div className='icon' style={{
                                            display: "flex", alignItems: "center"
                                        }}>
                                            <TwitterIcon></TwitterIcon>
                                            <input type="text" value={profile.twitter} name="twitter" className='inputdata' onChange={handler} placeholder='enter your Twitter Handler'></input>
                                        </div>
                                        <div style={{
                                            display: "flex", alignItems: "center"
                                        }} className='icon'>
                                            <InstagramIcon></InstagramIcon>
                                            <input type="text" className='inputdata' value={profile.lnstagram} name="lnstagram" onChange={handler} placeholder='enter your Instagram Username'></input>
                                        </div>
                                        <div style={{
                                            display: "flex", alignItems: "center"
                                        }} className='icon' target="blank">
                                            <LinkedInIcon></LinkedInIcon>
                                            <input type="text" className='inputdata' value={profile.linkedIn} name="linkedIn" onChange={handler} placeholder='enter your LinkedIn Username'></input>
                                        </div>
                                        <div style={{
                                            display: "flex", alignItems: "center"
                                        }} className='icon'>
                                            <YouTubeIcon></YouTubeIcon>
                                            <input type="text" className='inputdata' value={profile.youTube} name="youTube" onChange={handler} placeholder='enter your YouTube Username'></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='box1'>
                                <h6 className='h6'>Details</h6>
                                <div className='littleBox'>
                                    <h3 className='h3'>Name</h3>
                                    <input type="text" className='inputdata' placeholder='enter your Name' value={profile.name} name="name" onChange={handler}></input>
                                </div>
                                <div className='littleBox'>
                                    <h3 className='h3'>Age </h3>
                                    <input type="text" className='inputdata' placeholder='enter your Age' value={profile.age} name="age" onChange={handler}></input>
                                </div>
                                <div className='littleBox'>
                                    <h3 className='h3'>Location</h3>
                                    <input type="text" className='inputdata' placeholder='enter your Location' value={profile.location} name="location" onChange={handler}></input>
                                </div>
                                <div className='littleBox'>
                                    <div className='verifiable'>
                                        <h3 className='h3'>Email</h3>

                                    </div>
                                    <p className='text'>ma4433700@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='buttonsimple'>save</button>
                        <button type='reset' onClick={clear} className='buttonsimple'>cancal</button>
                    </div>
                </form>
                <div className='heading'>
                    <h2 className='h2'>Hello!</h2>
                    <h6 className='h6'>i'm creative React Developer</h6>
                </div>
                <div className='innerCintainer'>
                    <div className='box1'>
                        <img className='img' src={Userprofile?.imageurl || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} />
                    </div>
                    <div className='box1 '>
                        <div className='innerBox'>
                            <div>
                                <h6 className='h6' >About me:-</h6>
                                <p>{Userprofile?.aboutme || "This is demo about us. u can change by clicking on Update Profile Button. explain About YourSelf Berifly."} </p>
                            </div>
                            <div className='sociallink'>
                                <div className='icon'>
                                    <a href={Userprofile?.facebook} target="blank" >
                                        <FacebookIcon></FacebookIcon>
                                    </a>
                                </div>
                                <div className='icon'>
                                    <a href={Userprofile?.twitter} target="blank">
                                        <TwitterIcon></TwitterIcon>
                                    </a>
                                </div>
                                <div className='icon'>
                                    <a href={Userprofile?.lnstagram} target="blank">
                                        <InstagramIcon></InstagramIcon>
                                    </a>
                                </div>
                                <div className='icon' >
                                    <a href={Userprofile?.linkedIn} target="blank">
                                        <LinkedInIcon></LinkedInIcon>
                                    </a>
                                </div>
                                <div className='icon'>
                                    <a href={Userprofile?.youTube} target="blank">
                                        <YouTubeIcon></YouTubeIcon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='box1'>
                        <h6 className='h6'>Details</h6>
                        <div className='littleBox'>
                            <h3 className='h3'>Name</h3>
                            <p className='text'>{Userprofile?.name}</p>
                        </div>
                        <div className='littleBox'>
                            <h3 className='h3'>Age </h3>
                            <p className='text'>{Userprofile?.age}</p>
                        </div>
                        <div className='littleBox'>
                            <h3 className='h3'>Location</h3>
                            <p className='text'>{Userprofile?.location}</p>
                        </div>
                        <div className='littleBox'>
                            <div className='verifiable'>
                                <h3 className='h3'>Email</h3>

                                {
                                    verifyemail && verifyemail ?
                                        (
                                            <VerifiedUserIcon style={{ fontSize: 12, color: "green", marginBottom: "10px" }} fontSize={"small"}></VerifiedUserIcon>
                                        ) :
                                        (<p className='verify'>
                                            <button className='buttonverify' onClick={emailVerify}> Verify</button>
                                        </p>)
                                }
                            </div>
                            <p className='text'>{auth.currentUser?.email}</p>

                        </div>
                    </div>

                </div>
                <button className='profileButton' onClick={() => { setshow(pre => !pre) }}>Update Profile</button>
            </div>
        </div>
    )
}

export default Profile