import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className="flex justify-center mt-16">
      <Link to={"https://github.com/hiag0liveira"} target="_blank">
        <p>Developed Virtual Cell Phone by &copy; Hiago Mendes 2024</p>
      </Link>
    </footer>
  );
};

export default FooterPage;
