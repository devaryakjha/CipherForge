const Footer = () => {
  return (
    <footer className="fixed bottom-8 left-0 right-0 flex items-center justify-center">
      <span>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://aryak.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Aryakumar Jha
        </a>
      </span>
    </footer>
  );
};

export default Footer;
