import logo from "../assets/logo.jpg"


function Staffdash(){
    return(
        <>

        <div className="container">
                <div className='navbar'>
                <img src={logo} alt='logo'></img>
                    <div className='list'>
                        <ul>
                            <li><a href="">Anna</a></li>
                            <li><a href="">345678</a></li>
                            <li><a href="">Female </a></li>
                            <li><a href="">librarian</a></li>                           
                        </ul>
                    </div>
                    <div className='set'>
                        <a href="" >Settings</a>
                    </div>
                </div>
            

                <div className='dashboard'>
                    <h1 className="head1">staff dashboard</h1>
                    <p style={{fontSize:'20px', color:'black', textAlign:'justify', paddingLeft:'30px'}}>
                        <b>Welcome</b><i> Anna</i></p>
                    <div className="cards">
                        <a href='https://library-dashboard-zeta.vercel.app/bookdash'>books</a>
                        <a href='https://library-dashboard-zeta.vercel.app/addcategory'>categories</a>
                        <a href='https://library-dashboard-zeta.vercel.app/borrowbook'>borrow</a>
                        <a href='https://library-dashboard-zeta.vercel.app/addshelf'>shelving</a>
                        <a href='https://library-dashboard-zeta.vercel.app/studentdash'>students</a>
                    </div>
                </div>
            
         </div>

        </>
    )
}
export default Staffdash