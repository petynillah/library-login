

function Stafflogin() {
  return (
    <div className="portal-container">
      {/* Title */}
      <h1 className="portal-title">Staff Login Portal</h1>

      {/* Main Login Box */}
      <div className="login-box">
        {/* Staff ID Row */}
        <div className="form-group">
          <label className="form-label">staff id</label>
          <input type="text" className="form-input" />
        </div>

        {/* Password Row */}
        <div className="form-group">
          <label className="form-label">password</label>
          <input type="password" className="form-input" />
        </div>

        {/* Login Button */}
        <div className="button-container">
          <a href='http://localhost:5175/staffdash'>
              <button type="submit" className="login-btn">login</button>
          </a>
        </div>
      </div>

      {/* Action Links */}
      <div className="portal-links">
        <a href="#forgot" className="link-blue">forgot password?</a>
        <span className="text-gray">
          first time login? <a href="/staffregister" className="link-blue" target="_blank">register</a>
        </span>
      </div>

      {/* Footer Area */}
      <footer className="portal-footer">
        mombasa county library &copy;2026
      </footer>
    </div>
  );
}

export default Stafflogin