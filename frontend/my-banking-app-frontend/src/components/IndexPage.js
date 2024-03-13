import AOS from 'aos';
import '../App.css';
import '../style.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customerSignUp,findAllCustomer, findBankDetails} from '../slice/customerSlice';
import {loginSignIn} from '../slice/userSlice';
//import { useForm } from "react-hook-form";
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
function IndexPage() {
let loginState = useSelector(state=>state.userKey);
const [error, setError] = useState();
let [contactForm,setContactForm]=useState({});
let initialCustomerNumber = 112233;  
let initialAccountNumber = 10010;
let initialAmount = 1000;
let navigate = useNavigate();

let [searchOpenAIContents,setSearchOpenAIContents]=useState("");
let [openAiContents,setOpenAiContents]=useState("");
let [user,setUser]=useState({"full_name":"","emailid":"","password":"","address":"",
"password":"","account_type":"","bank":""});
let [banks,setBanks]=useState([]);

const searchOpenAIInformation = async(event)=> {
    //alert("event generated")
    event.preventDefault();
    // alert(searchOpenAIContents);
  let airesult = await axios.get("http://localhost:5000/api/openai/info/"+searchOpenAIContents);
  console.log(airesult.data);
  setSearchOpenAIContents("");
  setOpenAiContents(airesult.data);
} 
let [login,setLogin]=useState({"emailid":"","password":"","typeofuser":""});
let [storeData,setStoreData]=useState(false);
let dispatch = useDispatch();
let {userList,customerList,loading} = useState(state=>state);


useEffect(()=>{
  console.log("In My First Page")
  console.log(loginState)
  AOS.init();
  AOS.refresh();

  let loadBankInfo = async()=> { 
  let bankData = await dispatch(findBankDetails())
  console.log(bankData.payload);
  setBanks(bankData.payload);
  }
  loadBankInfo();

    if(storeData){
      
      let storeCustomerInfo = async()=> {
        let storeResult =await dispatch(customerSignUp(user));
        alert('Account created')
        console.log(storeResult);
        console.log(loading)
        setUser({"cname":"","emailid":"","gender":"","phonenumber":"","address":"",
        "password":"",accno:0,amount:0.0,typeofuser:"customer","cid":0});
        setStoreData(false);
        alert("Customer Account Created successfully")
        toast.success("Customer account created successfully");
      }
      storeCustomerInfo(); 
    }

},[storeData,loading]);

let contactUs = (event)=> {
  event.preventDefault();
}
const errorHandler = () => {
  setError(null);
}
const signIn = async (event)=> {
  event.preventDefault();
  console.log(login);
  if(login.emailid.length==0){
    setError({
      title: 'An error occurred!',
      message: 'EmailId is required'
    })
    return 
  }else if(login.password.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Password is required'
    })
    return
  }
  try{
  let customerLoginResult = await dispatch(loginSignIn(login));
 console.log(customerLoginResult.payload.msg)
 console.log(customerLoginResult.payload.account);
 //alert(customerLoginResult.payload.msg=="Successfully login!")
  if(customerLoginResult.payload.msg=="Successfully login!"){
      alert("successfully login by Customer")
      localStorage.setItem("user",JSON.stringify(customerLoginResult.payload.account));
      navigate("customerHome");
  }  else {
      alert("failure try once again");
  }
}catch(exp){
  alert("Invalid emailid or password")
}

  setLogin({"emailid":"","password":""});
}

const signUp= async (event)=> {
  event.preventDefault();
  console.log(user);

 
  if(user.full_name.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Name required'
    })
    return 
  }else if(user.emailid.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Emailid required'
    })
    return

 
  } else if(user.address.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Address required'
    })
    return

  }else if(user.password.length==0){
    setError({
      title: 'An error occurred!',
      message: 'Customer Password required'
    })
    return
  }
  setStoreData(true);  
}
    return(
        <div>
            <div id="overlayer"></div>
            <div className="loader">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> 


            <div className="site-wrap">

            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
                </div>
                <div className="site-mobile-menu-body"></div>
                </div>
     

        <header className="site-navbar js-sticky-header site-navbar-target" role="banner">

<div className="container">
  <div className="row align-items-center">
    
    <div className="col-6 col-xl-4">
      <h1 className="mb-0 site-logo">
        <a routerLink="index" className="h2 mb-0" style={{"textDecoration": "none"}}>
            Banker Online App<span className="text-primary"></span> </a></h1>
    </div>

    <div className="col-12 col-md-10 d-none d-xl-block">
      <nav className="site-navigation position-relative text-right" role="navigation">

        <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
          <li><a href="#login-section" className="nav-link">Login</a></li>
          <li className="has-children">
            <a href="#about-section" className="nav-link">About Us</a>
            <ul className="dropdown">
              <li><a href="#team-section" className="nav-link">Team</a></li>
              <li><a href="#loan-section" className="nav-link">Loan Section</a></li>
              <li><a href="#faq-section" className="nav-link">FAQ</a></li>
              <li><a href="#gallery-section" className="nav-link">Gallery</a></li>
              <li><a href="#services-section" className="nav-link">Services</a></li>
              <li><a href="#testimonials-section" className="nav-link">Testimonials</a></li>
             
            </ul>
          </li>
          <li><a href="#blog-section" className="nav-link">Blog</a></li>
          <li><a href="#contact-section" className="nav-link">Contact</a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-facebook"></span></a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-twitter"></span></a></li>
          <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-linkedin"></span></a></li>
        </ul>
      </nav>
    </div>


    <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" 
    style={{"position": "relative", "top": "3px"}}>
        <a href="#" className="site-menu-toggle js-menu-toggle float-right">
            <span className="icon-menu h3"></span></a></div>

  </div>
</div>

</header>



<div className="site-blocks-cover overlay" style={{"backgroundImage": "url(../images/hero_2.jpg)"}} 
data-aos="fade" id="home-section">

<div className="container">
  <div className="row align-items-center justify-content-center">

    
    <div className="col-md-10 mt-lg-5 text-center">
      <div className="single-text owl-carousel">
        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Banking Solutions</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
          <div data-aos="fade-up" data-aos-delay="100">
          </div>
        </div>

        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Financing Solutions</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
        </div>

        <div className="slide">
          <h1 className="text-uppercase" data-aos="fade-up">Savings Accounts</h1>
          <p className="mb-5 desc"  data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit, magnam libero velit esse sapiente officia inventore!</p>
        </div>

      </div>
    </div>
      
  </div>
</div>

<a href="#next" className="mouse smoothscroll">
  <span className="mouse-icon">
    <span className="mouse-wheel"></span>
  </span>
</a>
</div>  

<div className="site-section" id="next">

<div className="container">
  <div className="row mb-5">
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="">
      <img src={require('../images/flaticon-svg/svg/001-wallet.svg')} alt="Free Website Template by Free-Template.co" 
      className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Money Savings</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
      <img src={require('../images/flaticon-svg/svg/004-cart.svg')} 
      alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Online Shoppings</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>
    <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
      <img src={require('../images/flaticon-svg/svg/006-credit-card.svg')} 
      alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
      <h3 className="card-title">Credit / Debit Cards</h3>
      <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    </div>

  </div>

  <div className="row">
    <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
      <figure className="circle-bg">
      <img src={require('../images/about_2.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
      </figure>
    </div>
    <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
      <div className="mb-4">
        <h3 className="h3 mb-4 text-black">Amortization Computation</h3>
        <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        
      </div>
        
      <div className="mb-4">
        <ul className="list-unstyled ul-check success">
          <li>Officia quaerat eaque neque</li>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetur adipisicing elit</li>
        </ul>
        
      </div>

      <div className="mb-4">
        <form action="#">
          <div className="form-group d-flex align-items-center">
            <input type="text" className="form-control mr-2" placeholder="Enter your email"/>
            <input type="submit" className="btn btn-primary" value="Submit Email"/>
          </div>
        </form>
      </div>

      
      
    </div>
  </div>
</div>
</div>


<div className="site-section cta-big-image" id="about-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">About Us</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/hero_1.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <h3 className="text-black mb-4">We Solve Your Financial Problem</h3>

          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>

          <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
          
        </div>
      </div>    
      
    </div>  
  </div>



  <div className="site-section cta-big-image" id="login-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="2">Login Page</h2>
          </div>
      </div>

      <div className="row" >
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
            <figure className="circle-bg">
              <img src={require('../images/login.jpg')} alt="login page image" className="img-fluid"/>
            </figure>
        </div>

        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">            
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form style={{"marginTop": "0px"}} onSubmit={signIn}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="emailid1" placeholder="name@example.com" 
                  name="emailid"
                  value={login.emailid}
                  onChange={(event)=> {
                    setLogin(login=> {
                          return {...login,"emailid":event.target.value};
                      }
                    )
                  }
                  }


                  />
                  
                  <label for="emailid">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="password" 
                  value={login.password}
                  placeholder="Password" name="password"
                                    onChange={(event)=> {
                                      setLogin(login=> {
                                            return {...login,"password":event.target.value};
                                        }
                                      )
                                    }
                                    }
                  />
                  <label for="password">Password</label>


                </div>
                
                {/* <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" name="typeofuser" value="admin" 
                  id="admin" formControlName="typeofuser"
                  
                  onChange={(event)=> {
                    setLogin(login=> {
                        if(event.target.checked){
                          return {...login,"typeofuser":event.target.value};
                        }
                      }
                    )
                  }
                  }
                  />  
                  <label className="form-check-label" for="typeofuser">
                    Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <input className="form-check-input" type="radio" name="typeofuser" value="customer" id="customer" formControlName="typeofuser"
                  onChange={(event)=> {
                    setLogin(login=> {
                        if(event.target.checked){
                          return {...login,"typeofuser":event.target.value};
                        }
                      }
                    )
                  }
                  }    
                  />
                  <label className="form-check-label" for="typeofuser ">
                    Customer
                  </label>
                </div>
                */}
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" 
                //   [disabled]="loginRef.invalid"
                  >Signin</button>
                </div>
                <hr className="my-4"/>
                <div className="d-grid mb-2">
                  <a href="#register-section" className="card-title text-center mb-5 fw-light fs-5">SignUp</a>
                </div>
              </form>
            </div>
      </div>
    </div>
       
  </div>


  <section className="site-section" id="openai-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center" data-aos="fade">
            <h2 className="section-title mb-3">Search Any Banking information from OpenAI</h2>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-2 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div className="h-entry">
              <a href="single.html">
                <img src='https://lh3.googleusercontent.com/LRF7J93t2g2NoQg5pKJjasFf6u_9lvm3sXY9hWI1yaIdGyU331bxJUEnLE6S0EPZmJaFdf0hT1DkJWKvScojFYI9Odfs7a8QumwtgQ=h200-rw' style={{"borderRadius":"5px"}} alt="Image" className="img-fluid"
                width="400px"
                />
              </a>
            </div> 
          </div>
          <div className="col-md-3 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
            <form style={{"marginTop": "0px"}} onSubmit={searchOpenAIInformation}>
              <div className="form-floating mb-3">

              <textarea type="search" className="form-control" id="customerid" placeholder="Search by Customer Id" 
              name="searchOpenAIContents" onChange={(event)=>setSearchOpenAIContents(event.target.value)}
              value={searchOpenAIContents}>
              </textarea>
                <label for="floatingInput">Search Contents From OpenAI</label>
              </div>
              <input type="submit" className="btn btn-primary" value="Search Info"/>
            </form>
          </div>
          <div className="col-md-7 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100" style={{"border":"1px orange solid","borderRadius":"5px"}}>
             <p>{openAiContents}</p>
          </div>
        </div>
      </div>
    </section>




  <div className="site-section cta-big-image" id="register-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="10">Registration Page</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-5 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
            <img src={require('../images/register.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-3 mb-5" data-aos="fade-up" data-aos-delay="100">
          <form style={{"marginTop": "0px"}} onSubmit={signUp}>
            
            <div className="form-floating mb-1">
                  
              <input type="text" className="form-control" id="name" placeholder="name@example.com"
              value={user.full_name} 
              name="full_name" onChange={(event)=> {
                setUser(user=> {return {...user,"full_name":event.target.value}})
              }}/>

              <label for="name">Your Full Name</label>


            </div>
            <div className="form-floating mb-1">
              <input type="email" className="form-control" id="emailid" placeholder="name" 
              name="emailid"
              value={user.emailid}
              onChange={(event)=> {
                setUser(user=> {return {...user,"emailid":event.target.value}})
              }}
              />
              <label for="emailid">Your EmailId</label>
            </div>
             
            <div className="form-check mb-3">
              TypeOfAccount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="form-check-input" type="radio" name="account_type" value="saving" id="account_type"
              onChange={(event)=> {
                setUser(user=> {
                    if(event.target.checked){
                      return {...user,"account_type":event.target.value};
                    }
                  }
                )
              }
              }
              /> 
              <label className="form-check-label" for="male">
                Saving &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input className="form-check-input" type="radio" name="account_type" value="current" id="account_type" 
              
              onChange={(event)=> {
                setUser(user=> {
                    if(event.target.checked){
                      return {...user,"account_type":event.target.value};
                    }
                  }
                )
              }
              }
              />
              <label className="form-check-label" for="female">
                Current
              </label>
            </div>

       
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="address" placeholder="address" 
              name="address"
              value={user.address}
              onChange={(event)=> {
                setUser(user=> {return {...user,"address":event.target.value}})
              }}
              />
              <label for="address">Your Address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Password" 
              name="password"
              value={user.password}
              onChange={(event)=> {
                setUser(user=> {return {...user,"password":event.target.value}})
              }}
              />
              <label for="password">Your Password</label>
            </div>

          

            <div className="form-floating mb-5">
              <select name='bank'  onChange={(event)=> {
                setUser(user=> {return {...user,"bank":event.target.value}})
              }} className="form-control">

              {banks.map(e=><option value={e.id}>{e.name}</option>)}
          
              </select>
              <label for="bank">Bank Name</label>
            </div> 

            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">SignUp</button>
            </div>
            <hr className="my-4"/>
            <div className="d-grid mb-2">
              <a href="#login-section" className="card-title text-center mb-5 fw-light fs-5">SignIn</a>
            </div>

          </form>
        </div>

        </div>
        
      </div>    
      </div>



<section className="site-section border-bottom" id="team-section">

    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Meet Team</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        </div>
      </div>
      <div className="row">
        

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_5.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kaiara Spencer</h3>
              <span className="position">Finance Manager</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_6.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Dave Simpson</h3>
              <span className="position">Marketing Manager</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_7.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Ben Thompson</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_8.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kyla Stewart</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_1.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Kaiara Spencer</h3>
              <span className="position">Accountant</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_2.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Dave Simpson</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_3.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Ben Thompson</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div className="team-member">
            <figure>
              <ul className="social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-instagram"></span></a></li>
              </ul>
              <img src={require('../images/person_4.jpg')} alt="Image" className="img-fluid"/>
            </figure>
            <div className="p-3">
              <h3>Chris Stewart</h3>
              <span className="position">Bank Teller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  



  <section className="site-section" id="gallery-section" data-aos="fade">
    

    <div className="container">

      <div className="row mb-3">
        <div className="col-12 text-center">
          <h2 className="section-title mb-3">Gallery</h2>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div id="filters" className="filters text-center button-group col-md-7">
          <button className="btn btn-primary active" data-filter="*">All</button>
          <button className="btn btn-primary" data-filter=".web">Events</button>
          <button className="btn btn-primary" data-filter=".design">Party</button>
          <button className="btn btn-primary" data-filter=".brand">Holidays</button>
        </div>
      </div>  
      
      <div id="posts" className="row no-gutter">
        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>
        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_3.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_3.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">

          <a href={require('../images/img_4.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_4.jpg')}/>
          </a>

        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_5.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_5.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_3.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_3.jpg')}/>
          </a>
        </div>

        <div className="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_4.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_4.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_5.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_5.jpg')}/>
          </a>
        </div>

        <div className="item brand col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_1.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_1.jpg')}/>
          </a>
        </div>

        <div className="item design col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
          <a href={require('../images/img_2.jpg')} className="item-wrap fancybox" data-fancybox="gallery2">
            <span className="icon-search2"></span>
            <img className="img-fluid" src={require('../images/img_2.jpg')}/>
          </a>
        </div>

        
      </div>
    </div>

  </section>




  <section className="site-section">

    <div className="container">

      <div className="row mb-5 justify-content-center">
        <div className="col-md-7 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">How It Works</h2>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
        </div>
      </div>
      
      <div className="row align-items-lg-center" >
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">

          <div className="owl-carousel slide-one-item-alt">
            <img src={require('../images/slide_1.jpg')} alt="Image" className="img-fluid"/>
            <img src={require('../images/slide_2.jpg')} alt="Image" className="img-fluid"/>
            <img src={require('../images/slide_3.jpg')} alt="Image" className="img-fluid"/>
          </div>
          <div className="custom-direction">
            <a href="#" className="custom-prev"><span><span className="icon-keyboard_backspace"></span></span></a><a href="#" className="custom-next"><span><span className="icon-keyboard_backspace"></span></span></a>
          </div>

        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <div className="owl-carousel slide-one-item-alt-text">
            <div>
              <h2 className="section-title mb-3">01. Online Applications</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>

              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            <div>
              <h2 className="section-title mb-3">02. Get an approval</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            <div>
              <h2 className="section-title mb-3">03. Card delivery</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>

              <p><a href="#" className="btn btn-primary mr-2 mb-2">Learn More</a></p>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  </section>





  <section className="site-section border-bottom bg-light" id="services-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title mb-3">Our Services</h2>
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/001-wallet.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Business Consulting</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/006-credit-card.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Credit Card</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/002-rich.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Income Monitoring</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/003-notes.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Insurance Consulting</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/004-cart.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Financial Investment</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="unit-4">
            <div className="unit-4-icon">
              <img src={require('../images/flaticon-svg/svg/005-megaphone.svg')} alt="Free Website Template by Free-Template.co" className="img-fluid w-25 mb-4"/>
            </div>
            <div>
              <h3>Financial Management</h3>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#">Learn More</a></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>


  <section className="site-section testimonial-wrap" id="testimonials-section" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="section-title mb-3">Happy Customers</h2>
        </div>
      </div>
    </div>
    <div className="slide-one-item home-slider owl-carousel">
        <div>
          <div className="testimonial">
            
            <blockquote className="mb-5">
              <p>&ldquo;I am really impressed by the Staff’s cordial attitude & behaviour with customers. &rdquo; </p>
            </blockquote>

            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_3.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>John Smith</p>
            </figure>
          </div>
        </div>
        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;I would like to appreciate the entire team for the kind of services provided to me. &rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_2.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Christine Aguilar</p>
            </figure>
            
          </div>
        </div>

        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;We would really appreciate that your services are very good and your staff are really cooperative while dealing with the customers. &rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_4.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Robert Spears</p>
            </figure>

            
          </div>
        </div>

        <div>
          <div className="testimonial">

            <blockquote className="mb-5">
              <p>&ldquo;The Branch Staff are taking special care of each customer especially senior citizens and women.&rdquo;</p>
            </blockquote>
            <figure className="mb-4 d-flex align-items-center justify-content-center">
              <div><img src={require('../images/person_4.jpg')} alt="Image" className="w-50 img-fluid mb-3"/></div>
              <p>Bruce Rogers</p>
            </figure>

          </div>
        </div>

      </div>
  </section>



  <section className="site-section bg-light" id="loan-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade-up">
          <h2 className="section-title mb-3">Pricing</h2>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="pricing">
            <h3 className="text-center text-black">Education Loan</h3>

            <ul className="list-unstyled ul-check success mb-5">
              
              <li>Student loans are meant to pay for tuition, 
              fees and living expenses at accredited schools.</li>
              <li>This means that you generally can’t use student
              loans to pay for specific types of education,
              such as coding bootcamps or informal classNamees.</li>
              <li>
                There are two types of student loans: federal and private. 
                You get federal student loans by filling out the Free Application for Federal Student Aid (FAFSA) and 
                working with your school’s financial aid department.
                Private student loans come with much fewer protections and benefits, 
                but if your credit is good, you could qualify for better rates.
              </li>
            </ul>
            <p className="text-center">
              <a href="#" className="btn btn-secondary">Apply Now</a>
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4 pricing-popular" data-aos="fade-up" data-aos-delay="100">
          <div className="pricing">
            <h3 className="text-center text-black">Personal Loans</h3>
            <ul className="list-unstyled ul-check success mb-5">

              <li>Personal loans are the broadest type of loan category and typically have 
                repayment terms between 24 and 84 months. They can be used for just about 
                anything except for a college education or illegal activities. 
                People commonly use personal loans for things like:</li>              
               
                <li>
                    Vacations
                  Weddings
                  Emergencies
                  Medical treatment
                  Home renovations 
               </li>
               <li>
                Personal loans generally come in two forms: secured and unsecured. 
                Secured loans are backed by collateral—such as a savings account or a 
                vehicle—that a lender can take back if you don’t repay your full loan amount.
                </li>
                
              </ul>
            <p className="text-center">
              <a href="#" className="btn btn-primary">Apply Now</a>
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4 mb-lg-0 col-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="pricing">
            <h3 className="text-center text-black">Car Loan</h3>

            <ul className="list-unstyled ul-check success mb-5">
              
        <li>
          Car loans are a type of secured loan that you can use to buy a 
          vehicle with repayment terms between three to seven years. In this case, the collateral for the loan is the vehicle itself. If you don’t pay, the lender will repossess the car.
        </li>
        <li>
          You can typically get car loans from credit unions, banks, online lenders and even car dealerships. Some car dealerships have a financing 
          department where they help you find the best loan from partner lenders. 
        </li>     
        <li>
          Others operate as “buy-here-pay-here” lenders, where the dealership itself gives you the loan. These tend to be much more expensive, though.
        </li>        
       </ul>
            <p className="text-center">
              <a href="#" className="btn btn-secondary">Apply Now</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="row site-section" id="faq-section">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title">Frequently Ask Questions</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">When do I have access to use Online Banking?</h3>
          <p> : With Online Banking, you have access to your account information 24 hours a day, 7 days a week! 
            However, we may occasionally perform maintenance which may cause the Online Banking to be 
            temporarily unavailable.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">Are there any requirements to keep my Online Banking account?</h3>
            <p>The system requires that you use your Online Banking at least once every six months, or access will be 
              canceled for your protection. Additionally, we reserve the right to cancel your online banking account 
              access if we suspect your account has been compromised or misused</p>
          </div>

          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">Can I accept both Paypal and Stripe?</h3>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">What happens if I forget or lose my password?</h3>
            <p>When logging in click the box “forgot password.” The system will ask you to choose a pre-arranged 
              method of delivery to you of a temporary secure access code. This code will allow you entry to the system 
              and you will be prompted to create a new password</p>
          </div>
        </div>
        <div className="col-lg-6"> 
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4"> Are there any requirements to keep my Online Banking account?</h3>
            <p>The system requires that you use your Online Banking at least once every six months, or access will be 
              canceled for your protection. Additionally, we reserve the right to cancel your online banking account 
              access if we suspect your account has been compromised or misused.</p>
          </div>

          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-black h4 mb-4">: Is there a limit on the number of bills I can pay with Online Bill Pay?</h3>
          <p>No. There is no limit to the number of bills that can be paid with Bill Pay.</p>
          </div>
          
          <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-black h4 mb-4">What if I have a question about a Bill Payment?</h3>
            <p>: If you have a question about a payment you made or believe an error has occurred, please 
              contact us at 513-734-4445</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <section className="site-section" id="about-section">
    <div className="container">

      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/hero_1.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          

          <div className="row">

            
            
            <div className="col-12 mb-4" data-aos="fade-up" data-aos-delay="">
              <div className="unit-4 d-flex">
                <div className="unit-4-icon mr-4 mb-3"><span className="text-primary flaticon-head"></span></div>
                <div>
                  <h3>Bank Loan</h3>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                  <p className="mb-0"><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
            <div className="col-12 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="unit-4 d-flex">
                <div className="unit-4-icon mr-4 mb-3"><span className="text-primary flaticon-smartphone"></span></div>
                <div>
                  <h3>Banking Consulation </h3>
                  <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                  <p className="mb-0"><a href="#">Learn More</a></p>
                </div>
              </div>
            </div>
          </div>


          
        </div>
      </div>

      
    </div>
  </section>



  <section className="site-section" id="blog-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center" data-aos="fade">
          <h2 className="section-title mb-3">Our Blog</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_1.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">Super Apps: A New Chapter in the World of Digital Banking</a></h2>
            <div className="meta mb-4">Ham Brook <span className="mx-2">&bullet;</span> March 17, 2022<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>What are super apps? Super apps, as the name suggests, are super in nature. What makes them different and ‘super’</p>
            <p><a href="#">Continue Reading...</a></p>
          </div> 
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_4.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">The Changing Face of Corporate Payments</a></h2>
            <div className="meta mb-4">James Phelps <span className="mx-2">&bullet;</span> October 14, 2021<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>Mobile banking channels have witnessed an unprecedented usage surge in the recent times that has led digital leaders to explore innovative ways to improve and increase the quality of customer engagement.</p>
            <p><a href="#">Continue Reading...</a></p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
          <div className="h-entry">
            <a href="single.html">
              <img src={require('../images/img_3.jpg')} alt="Image" className="img-fluid"/>
            </a>
            <h2 className="font-size-regular"><a href="#">The ABCDE for Successful Agile Implementations – Powering Smart Banks</a></h2>
            <div className="meta mb-4">James Phelps <span className="mx-2">&bullet;</span>March 30, 2021<span className="mx-2">&bullet;</span> <a href="#">News</a></div>
            <p>The term “agility” has been a buzzword in the software industry for some time now and over the years, I’ve had the opportunity to read a lot of interesting insights shared by several thought leaders on the topic.</p>
            <p><a href="#">Continue Reading...</a></p>
          </div> 
        </div>
        
      </div>
    </div>
  </section>



  <section className="site-section bg-light" id="contact-section" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-room d-block h2 text-primary"></span>
            <span>Address: NALANDA 53/1 C, Manoj Arcade, 24th Main Rd, Sector 2, HSR Layout, Bengaluru - 560102, Karnataka, India</span>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-phone d-block h2 text-primary"></span>
            <a href="#">+1 232 3235 324</a>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-0">
            <span className="icon-mail_outline d-block h2 text-primary"></span>
            <a href="#">youremail@domain.com</a>
          </p>
        </div>
      
      <div className="row">
        <div className="col-md-12 mb-5">
          <form action="#" className="p-5 bg-white" onSubmit={contactUs}>              
            <p className="h6 text-black mb-1">Contact Form</p> 
            <div className="row form-group">
              <div className="col-md-3">
                <label className="text-black" for="fname">First Name</label>
                <input type="text" id="fname" className="form-control" name="fname" 
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"fname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="lname">Last Name</label>
                <input type="text" id="lname" className="form-control" name="lname"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"lname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="email">Email</label> 
                <input type="email" id="email" className="form-control"
                name="email"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"email":event.target.value}
                    })
                }}
                />
              </div>
              
              <div className="col-md-3">
                <label className="text-black" for="subject">Subject</label> 
                <input type="subject" id="subject" className="form-control"
                name="subject"

                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"subject":event.target.value}
                    })
                }}

                />
              </div>     
            </div>

            <div className="row form-group">
              <div className="col-md-8 offset-2">
                <label className="text-black" for="message">Message</label> 
                <textarea name="message" id="message" cols="20" rows="5" className="form-control" 
                placeholder="Write your notes or questions here..."
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"message":event.target.value}
                    })
                }}
                ></textarea>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" value="Send Message" className="btn btn-primary btn-md text-white"/>
              </div>
            </div>


          </form>
        </div>
      </div>  
      </div>
    </div>
  </section>


  <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-5">
              <h2 className="footer-heading mb-4">About Us...</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
            </div>
            <div className="col-md-3 ml-auto">
              <h2 className="footer-heading mb-4">Quick Links</h2>
              <ul className="list-unstyled">
                <li><a href="#about-section" className="smoothscroll">Terms</a></li>
                <li><a href="#about-section" className="smoothscroll">Policy</a></li>
                <li><a href="#about-section" className="smoothscroll">About Us</a></li>
                <li><a href="#services-section" className="smoothscroll">Services</a></li>
                <li><a href="#testimonials-section" className="smoothscroll">Testimonials</a></li>
                <li><a href="#contact-section" className="smoothscroll">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3 footer-social">
              <h2 className="footer-heading mb-4">Follow Us</h2>
              <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
          <form action="#" method="post" className="footer-subscribe">
            <div className="input-group mb-3">
              <input type="text" className="form-control border-secondary text-white bg-transparent" 
              placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary text-black" type="button" id="button-addon2">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row pt-5 mt-5 text-center">
        <div className="col-md-12">
          <div className="border-top pt-5">
            <p className="copyright"><small>
          Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
            </small>    
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </footer>

        </div>
        <ToastContainer />
  </div>
    )
}

export default IndexPage;