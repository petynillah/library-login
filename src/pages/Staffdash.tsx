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
                        <a href='http://localhost:5175/bookdash'>books</a>
                        <a href='http://localhost:5175/addcategory'>categories</a>
                        <a href='http://localhost:5175/borrowbook'>borrow</a>
                        <a href='http://localhost:5175/addshelf'>shelving</a>
                        <a href='http://localhost:5175/studentdash'>students</a>
                    </div>
                </div>
            
         </div>

        </>
    )
}
export default Staffdash