import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bankService, changeCustomerPassword, depositeAmount, findAllCustomer, findCustomer, transferAmount, viewDeposit, viewTransfer, viewWithdrawn, withDrawAmount } from "../slice/customerSlice";

import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';

function CustomerPage() {
let [customer,setCustomer]=useState({client:{id:0,name:"",password:"",emailid:"",address:""},
bank:{id:0,branch:{name:"",address:"",branch_code:0}},account_type:"",balance:0,id:0});

let [account,setAccount]=useState({"account":0,"amount":0});
let [acc,setAcc]=useState({"account":0,"amount":0});
let [customerTransaction,setCustomerTransaction]=useState([{}]);
let dispatch = useDispatch();
let [contactForm,setContactForm]=useState({});
let [service,serviceSet]=useState({"typeofservice":"","typeofsubservice":"","description":"","account_id":""});
let [withdrawnHistory,setWithdrawnHistory]=useState([{}])
let [depositHistory,setDepositHistory]=useState([{}])
let [transferHistory,setTransferHistory]=useState([{}])
let [cardOption,setCardOption]=useState(false);
let [loanOption,setLoanOption]=useState(false);
let [checkbookOption,setCheckbookOption]=useState(false);

let [userPasswordReset,setUserPasswordReset]=useState({"oldPassword":"","newPassword":"","repeatNewPassword":""});
let navigate = useNavigate();

useEffect(()=> {
    AOS.init();
    AOS.refresh();
let obj = JSON.parse(localStorage.getItem("user"));
console.log(obj);
if(obj!=null){
        const initializationDetails = async ()=> {
            let customerInfo  = await dispatch(findCustomer(obj.id)); 
            await setCustomer(customerInfo.payload)
            console.log(customerInfo.payload.id)
            let withdrawanDbInfo = await dispatch(viewWithdrawn());
            let depositDbInfo = await dispatch(viewDeposit());
            let transferDbInfo = await dispatch(viewTransfer());
            console.log(withdrawanDbInfo.payload);
            console.log(depositDbInfo.payload);
            console.log(transferDbInfo.payload);
            console.log(customerInfo.payload.id)
            let filterwithdrawnData = withdrawanDbInfo.payload.filter(e=>e.account==customerInfo.payload.id);
            let filterdepositData = depositDbInfo.payload.filter(e=>e.account==customerInfo.payload.id);
            let filtertransferData = transferDbInfo.payload.filter(e=>e.fromaccno==customerInfo.payload.id);
            console.log(filterwithdrawnData)
            console.log(filterdepositData)
            console.log(filtertransferData)
            setWithdrawnHistory(filterwithdrawnData);
            setDepositHistory(filterdepositData)
            setTransferHistory(filtertransferData);

        }
        initializationDetails();
    }

    const loadAllTransaction= async()=> {
        
    }
    loadAllTransaction();
 
},[account]);


const logout = (event)=> {
    navigate("/");
}

const contactUs= (event)=> {
    event.preventDefault();

}

const serviceProcess= async (event)=> {
  event.preventDefault();
    serviceSet((ser)=>{return {...ser,"account_id":customer.id}});
    let serviceResult = await dispatch(bankService(service));
    console.log(serviceResult.payload)
    alert("Your request send successfully it will update status of service as soon as possible")
    setCardOption(false);
    setLoanOption(false);
    setCardOption(false);
    
}

const transfer = async (event)=> {
    event.preventDefault();
    console.log(account);
       let transferCutomerResult = await dispatch(transferAmount(account));
      console.log(transferCutomerResult.payload);
      alert(transferCutomerResult.payload)
      setAccount(account=> {
        return {...account,"amount":0,"toaccno":0}
      })

}

const withdraw= async (event)=> {
    event.preventDefault();
    console.log(account)
    let withdranResult = await dispatch(withDrawAmount(account));
    console.log(withdranResult);
    if(withdranResult.meta.requestStatus=="fulfilled"){
      alert(withdranResult.payload.msg) 
    }

   setAccount(account=> {
    return {...account,"amount":0}
  })

}

const deposite = async (event)=> {
    event.preventDefault();
    event.preventDefault();
    console.log(account)
    let depositResult = await dispatch(depositeAmount(account));
    console.log(depositResult);
    if(depositResult.meta.requestStatus=="fulfilled"){
      alert(depositResult.payload.msg) 
    }
    setAccount(account=> {
      return {...account,"amount":0}
    })



}

let displayService = (event)=> {
  setCardOption(false);
  setLoanOption(false);
  setCheckbookOption(false);
 // alert("event generated")
 let option = event.target.value
 if(option=="card"){
  setCardOption(true);
 }else if(option=="loan"){
  setLoanOption(true)
 }else {
  setCheckbookOption(true);
 }
 serviceSet(ser=> {return {...ser,"typeofservice":event.target.value}})

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


</div>



<header className="site-navbar js-sticky-header site-navbar-target" role="banner">
      {/* <h1 align="center">Welcome user <span className="text-primary" id="user">{customer.cname}</span> to Home Page</h1> */}
    <div className="container">
      <div className="row align-items-center">
          
        <div className="col-12 col-md-10 d-none d-xl-block">
          <nav className="site-navigation position-relative text-right" role="navigation">

            <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
              <li><a href="#view-account-details" className="nav-link">View Account</a></li>
              <li><a href="#transfer-amount" className="nav-link">Transfer Amount</a></li>
              <li><a href="#withdraw-amount" className="nav-link">Withdraw</a></li>
              <li><a href="#deposit-amount" className="nav-link">Deposit</a></li>
              <li><a href="#view-transaction" className="nav-link">View Transaction</a></li>
              <li><a href="#servicerequest" className="nav-link">Bank Service</a></li>
              <li><a href="#contact-section" className="nav-link">Request</a></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </nav>
        </div>


        <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{"position": "relative", "top": "3px"}}><a href="#" className="site-menu-toggle js-menu-toggle float-right"><span className="icon-menu h3"></span></a></div>

      </div>
    </div>
    
  </header>


  <div className="site-blocks-cover overlay" style={{"backgroundImage": "url(./images/hero_2.jpg)"}} data-aos="fade" id="home-section">
  
  </div>



  <section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="view-account-details">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">View Account Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/accountdetails.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
        <h3 className="text-black mb-4">Customer Information </h3>
        <h5 className="text-black mb-6">Customer Details</h5>
          <p>Customer Id is    <b>{customer.client.id},&nbsp;</b> 
          Name is    : <b>{customer.client.name} ,&nbsp;</b>
          Password is    :<b> {customer.client.password},&nbsp;</b> 
          EmailId is    : <b>{customer.client.emailid}, &nbsp;</b>
          Address is    : <b>{customer.client.address},&nbsp;</b> </p>
          <h5 className="text-black mb-6">Account details</h5>
          <p>Account Number is    : <b>{customer.id},&nbsp;</b> 
          Account Type is    : <b>{customer.account_type},&nbsp;</b> 
          Account Balance is    : <b>{customer.amount}, </b></p>
          <h5 className="text-black mb-6">Bank Details</h5>
          <p>Bank Id <b>{customer.bank.id},&nbsp;</b>
          Branch Name <b>{customer.bank.branch.name},&nbsp;</b>
          Branch Address <b>{customer.bank.branch.address},&nbsp;</b></p>
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="transfer-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Trasfer amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/transferamount.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"margin-top": "0px"}} onSubmit={transfer}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" 
              placeholder="From account number" readonly value={customer.id}
              name="fromaccno"
              />
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="toaccount" placeholder="To account number" 
              name="toaccno" value={account.toaccno}
              onChange={(event)=> {
                setAccount(account=> {
                    return {...account,"toaccno":event.target.value}
                })
              }}
              />
              <label for="floatingPassword">To Account Number</label>
            </div>


            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Send amount" 
              name="amount" value={account.amount}
              onChange={(event)=> {
                setAccount(acc=> {
                    return {...acc,"amount":eval(event.target.value),"fromaccno":customer.id}
                })
              }}
               />
              <label for="floatingPassword">Amount</label>
            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Transfer</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="withdraw-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Withdraw Amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/withdraw.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"margin-top": "0px"}}  onSubmit={withdraw}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" placeholder="From account number" 
              readonly value={customer.id} name="account"
              />
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Amount to withdraw" name="amount"
              value={account.amount}
              onChange={(event)=> {
                setAccount(acc=> {
                    return {...acc,"amount":eval(event.target.value),"account":customer.id}
                })
              }}
              />
              <label for="floatingInput">Amount</label>
            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Withdraw</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>




<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="deposit-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Deposit Amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/deposit.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"marginTop": "0px"}} onSubmit={deposite}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" 
              placeholder="From account number" readonly value={customer.id}
              name="accno"/>
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Amount to Deposit" name="amount"
              value={account.amount}
              onChange={(event)=> {
                setAccount(acc=> {
                  return {...acc,"amount":eval(event.target.value),"account":customer.id}
              })
              }}
              />
              <label for="floatingInput">Amount</label>

            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Deposit Amount</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>


<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="view-transaction">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">View Transaction Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/transactiondetails.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-8 ml-auto" data-aos="fade-up" data-aos-delay="100">
          <h5>View Withdraw History</h5>
          <ol>
          {withdrawnHistory.length>0? 
          
          withdrawnHistory.map((e,i)=><li key={i}>Account Number <b>{e.account}</b> Amount <b>{e.amount}</b></li>):
          
          <div><h6>As of now there is not withdraw histroy available</h6></div>}
          </ol>
          
          <h5>View Deposite History</h5>
          <ol>
          {depositHistory.length>0?
          
          depositHistory.map((e,i)=><li key={i}>Account Number <b>{e.account}</b> Amount <b>{e.amount}</b></li>):
          <div><h6>As of now there is not deposit histroy available</h6></div>
          }
          </ol>

          <h5>View Transfer History</h5>
          <ol>
          {transferHistory.length>0? 
          
          transferHistory.map((e,i)=><li key={i}>From Account Number <b>{e.fromaccno}</b> To Account Number <b>{e.toaccno}</b>Amount <b>{e.amount}</b></li>)
            :
            <div><h6>As of now there is not Transer histroy available</h6></div>
        }
          </ol>

          {/* <table className="table table-striped">
            <tr>
              <th>SrNo</th>
              <th>From Account</th>
              <th>TypeOfTransaction</th>
              <th>Amount</th>
              <th>Date Of Transaction</th>
              <th>To Account</th>
            </tr>
            {customerTransaction.map((ct,i)=>
                <tr>
                    <td>{i+1}</td>
                    <td>{ct.accno}</td>
                    <td>{ct.typeoftransaction}</td>
                    <td>{ct.amount}</td>
                    <td>{ct.dot}</td>
                    <td>{ct.transferTo==0?<span>No Transfer</span>:<span>{ct.transferTo}</span>}</td>
                </tr>
            )
        }
        </table>    */}
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section bg-light" id="servicerequest" data-aos="fade">
  <div className="container">
    <div className="row mb-5">
      <div className="col-12 text-center">
        <h2 className="section-title mb-3">Type Of Service</h2>
      </div>
    </div>  
    <div className="row">
      <div className="col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="">
        <figure className="circle-bg">
          <img src={require('../images/login.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
        </figure>
    </div>

      <div className="col-lg-8 mb-5">

      {/* [service,serviceSet]=useState({"typeofservice":"","typeofsubservice":"","description":""});     */}

        <div className="col-lg-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          <form style={{"marginTop": "0px"}} onSubmit={serviceProcess}>

          <div className="form-floating mb-3">
              <input type="number" className="form-control" id="account_id" placeholder="Account Number" 
              readonly value={customer.id} name="account_id"
              
              />
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="radio" name="typeofservice" value="card" onClick={displayService}/> Card Service
              <input type="radio" name="typeofservice" value="loan" onClick={displayService}/> Loan Service
              <input type="radio" name="typeofservice" value="chequebook" onClick={displayService}/> cheque book        
            </div>


            <div className="form-floating mb-3">
              {cardOption && 
                  <div>
                    <h5>What type of card service do you want?</h5>
                    <div>
                      <input type="radio" name="typeofsubservice" value="creditcard"
                      
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      
                      />New Credit Card
                      <input type="radio" name="typeofsubservice" value="debitcard"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />New Debit Card
                      <input type="radio" name="typeofsubservice" value="blockcard"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />Block Card
                    </div>
                    <div>
                      <textarea name="description" cols={50} rows={5} 
                      onChange={(event)=>serviceSet(ser=> {return {...ser,"description":event.target.value,"account_id":customer.id}})}>


                      </textarea>
                    </div>
              </div>}

              {loanOption && 
                  <div className="form-floating mb-3">
                    <h5>What type of loan service do you want?</h5>
                    <div>
                      <input type="radio" name="typeofsubservice" value="homeloan" 
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />Home Loan
                      <input type="radio" name="subtypeofservice" value="carloan"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />Car Loan
                      <input type="radio" name="subtypeofservice" value="personalloan"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />Personal Loan
                    </div>
                    <textarea name="description" cols={50} rows={5} 
                      onChange={(event)=>serviceSet(ser=> {return {...ser,"description":event.target.value}})}>


                      </textarea>
              </div>}

              {checkbookOption && 
                  <div className="form-floating mb-3">
                    <h5>What type of check book service do you want?</h5>
                    <div>
                      <input type="radio" name="typeofsubservice" value="newcheckboook"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}

                      />New Checkbook
                      <input type="radio" name="subtypeofservice" value="blockcheck"
                      onClick={(event)=>serviceSet(ser=> {return {...ser,"typeofsubservice":event.target.value}})}
                      />Block check
                    </div>
                    <textarea name="description" cols={50} rows={5} 
                      onChange={(event)=>serviceSet(ser=> {return {...ser,"description":event.target.value}})}>


                      </textarea>
              </div>}
            </div>

              <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Request Service</button>
              </div>
          </form>
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
  <ToastContainer />

        </div>
    )
}

export default CustomerPage;