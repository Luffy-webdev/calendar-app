import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import '../styles/landing-page.scss'
import Calendar from './calender';
import ScrollReveal from 'scrollreveal';
import dashboard from '../assets/dashboard.svg';
import Login from './googlelogin';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from './footer';
export default class HomePage extends Calendar {
    
    state = {
        dateContext:moment(),
        today:moment()

    }
    componentDidMount() {
        ScrollReveal().reveal('.timeline-item',{ delay: 800, duration:1000, origin:"bottom", opacity:0.2, reset:true });
        if(Cookies.get('lauth') != undefined) {
            return <Redirect to="/d" />
        }
        
    }
    
    render() {
        console.log(Cookies.get())
        const colors = ["#ffc600", "#63A92C", "#BF30F1", "#A92C42", "#FDC04B", "#2FA5D8", "#D82F43"];
        const week = [];
        for (let i=0;i<7;i++) {
            
            week.push({weekday:this.weekdaysShort[i], color:colors[i]});
        }
        let weekdays = week.map((day) => {
            return (
                <td key={day} className="week-day"><strong>{day.weekday}</strong></td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        let class1 = "day p-2 rounded text-center";
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} id="tddd">
                    <span className={(d === this.state.today.date() && (this.state.dateContext.month() === this.state.today.month()) && (this.state.dateContext.year() === this.state.today.year())) ? "today "+class1:" "+class1}>{d}</span>
                </td>  
                    
                
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100} className="">
                    {d}
                </tr>
            );
        })
        return (
            <React.Fragment>
            <div className="container-fluid shadow-sm">
                <div className="container">
                <nav className="navbar navbar-expand-lg m-0">
                    <h1 className="navbar-brand brand is-fjalla">1999 Sharp</h1>
                    <button class="navbar-toggler d-flex" type="button" data-toggle="collapse" data-target="#landingPageNavbar" aria-controls="landingPageNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon m-1"></span>
                        <span class="navbar-toggler-icon m-1"></span>
                        <span class="navbar-toggler-icon m-1"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="landingPageNavbar">
                        <div className="navbar-nav ml-auto align-items-center">
                        <Link style={{color:"#000"}} className="mr-3 is-nunito" to="/contact">Contact</Link>
                        <Link style={{color:"#000"}} className="mr-3 is-nunito" to="/faq">FAQ</Link>
                        <Link style={{color:"#000"}} className="mr-3 is-nunito" to="/login">sign in</Link>
                        <Link className="sign-up is-nunito" to="/signup"><span className="">sign up for free</span></Link>
                        <Login class="sign-up  ml-2 border-0 m-2"/>
                        </div>
                    </div>
                </nav>
                </div>   
                
            </div>
            <div className="vh-100">
            <motion.div initial={{y:10, opacity:0}} animate={{y:-20, opacity:1}} transition={{duration:0.7}} className="mt-4 text-center is-nunito m-0 row d-flex justify-content-center align-items-center background-white">
                <div className="col-md-12 mt-5">
                <span className=" font-weight-bold landing-page-heading">Your schedule<br/>management tool</span>
                </div>
                <div className="col-md-12">
                <p classname="landing-page-heading2">Keep yourself updated and organised</p>
                </div>    
            </motion.div>
            <div className="container-calendar-wqewe  mt-5">
            <div className="d-flex justify-content-center align-items-center">
                    <i onClick={e => this.prevMonth()} className="fa p-3 fa-2x fa-angle-left"></i>
                    <h4 className="is-poppins mt-4 mb-4">{this.month()}, {this.currentDate()} {moment().format('dddd')}</h4>
                    <i onClick={e => this.nextMonth()} className="fa p-3 fa-2x fa-angle-right"></i>
            </div>
                    
                <motion.table className="table" initial={{y:10, opacity:0}} animate={{y:-20, opacity:1}} transition={{duration:0.7}}>
                    <thead>
                    </thead>
                    <tbody>
                        <tr className="is-poppins week-rows">
                            {weekdays}
                        </tr >
                        {trElems}
                    </tbody>
                </motion.table>
            </div>
            </div>
            
            <div className="row container-row p-4">
                <div className="col is-nunito d-flex flex-column font-weight-bold">
                    <div className="row mb-4"><span className="mb-2 ml-2 mt-3 heading-2">Manage, organise your events<br/>in Dashboard</span><br/></div>
                    <div className="row"><span className="ml-2 mt-3 mr-2">try it <Link to="/signup"><span className="sign-up">sign up for free</span></Link></span></div>
                    
                    
                </div>
                <div className="col">
                    <img src={dashboard} className="img img-fluid" alt=""/>
                </div>
            </div>
            <div className=" container mt-5">
                <div className="row is-nunito d-flex flex-column font-weight-bold">
                    <div className=" mb-4"><span className="mb-2 heading-2">We keep track of your events</span><br/>
                    <span>We'll notify you before deadline, so no need to worry :)</span>
                    </div>            
                </div>
            </div>
            <div className="row m-0 mt-4 p-4">
                <div className="col-md-12  d-flex justify-content-center align-items-center"><span className="sign-up"><Link style={{color:"#fff"}} to="/signup">Get started</Link></span><i class="fa pl-2 fa-arrow-right"></i></div>
            </div>
            <Footer/>
        </React.Fragment> 
        )
    }
}
