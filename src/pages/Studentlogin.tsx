function Studentlogin(){
    return(
        
    <div className="portal-container">
      {/* Title */}
      <h1 className="portal-title">Student Login Portal</h1>

      {/* Main Login Box */}
      <div className="login-box">
        {/* Student ID Row */}
        <div className="form-group">
          <label className="form-label">student id</label>
          <input type="text" className="form-input" />
        </div>

        {/* Password Row */}
        <div className="form-group">
          <label className="form-label">password</label>
          <input type="password" className="form-input" />
        </div>

        {/* Login Button */}
        <div className="button-container">
          <button type="submit" className="login-btn">login</button>
        </div>
      </div>

      {/* Action Links */}
      <div className="portal-links">
        <a href="#forgot" className="link-blue">forgot password?</a>
        <span className="text-gray">
          first time login? <a href="/studentregister" className="link-blue" target="_blank">register</a>
        </span>
      </div>

      {/* Footer Area */}
      <footer className="portal-footer">
        mombasa county library &copy;2026
      </footer>
    </div>
    )
}
export default Studentlogin