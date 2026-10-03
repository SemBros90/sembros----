export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} SemBros. All rights reserved.</p>
        <a className="admin-link" href="#/admin">
          Admin Portal → /admin
        </a>
      </div>
    </footer>
  );
}