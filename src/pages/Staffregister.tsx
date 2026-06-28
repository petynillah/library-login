function Staffregister(){
    return(
        <div className="portal-container">
            <h1 className="register-title">Staff registration portal</h1>
            <div className="register-box">
                <form>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select name="gender" className="form-input">

                            <option value="" selected className="hidden-placeholder"></option>

                            <option value={'Male'} >Male</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Other'}>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input type="number" name="age" inputMode="numeric" pattern="[0-9]" className="form-input"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">ID number</label>
                        <input type="number" inputMode="numeric" pattern="[0-9]" className="form-input"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Occupation</label>
                        <input type="text" className="form-input"/>
                    </div>
                    <div className="button-container" >
                            <a href="" className="login-btn">Register</a>
                    </div>
                </form>
            </div>

            <span className="register-links">
                Already have an account?<a href="/stafflogin"className="link-blue" target="_blank">Login</a>
            </span>

            <footer className="portal-footer">
                mombasa county library &copy;2026
            </footer>
        </div>
       
    )
}
export default Staffregister