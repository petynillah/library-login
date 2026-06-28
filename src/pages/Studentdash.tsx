import logo from '../assets/logo.jpg'

function Studentdash(){
    return(
        <>
        <div className="container">
                <div className='navbar'>
                    <img src={logo} alt='logo'></img>
                        <div className='list'>
                            <ul>
                                <li><a href="">Anna</a></li>
                                <li><a href="">345567</a></li>
                                <li><a href="">Female </a></li>
                                <li><a href="">Senior</a></li>                                
                            </ul>
                        </div>
                        <div className='set'>
                            <a href="" >Settings</a>
                        </div>
                </div>
            


                <div className='dashboard'>
                    <h1 className="head1">student dashboard</h1>
                    <p style={{fontSize:'20px', color:'black', textAlign:'justify', paddingLeft:'30px'}}>
                        <b>Welcome</b><i> Anna</i></p>
                    <div className="cards">
                        <a href='http://localhost:5176/allbooks'>books</a>
                        <a href='http://localhost:5176/availablebk'>Check if a book exists</a>
                        <a href='http://localhost:5176/borrowedbk'>borrowed books</a>
                        <a href='http://localhost:5176/allbooks'>read books</a>
                        <a href=''>payment status</a>
                    </div>
                </div>
         </div>
        </>
    )
}
export default Studentdash