const Footer = () => {
  return (
    <footer className="fixed bottom-2 sm:bottom-8 left-0 right-0 flex items-center justify-center">
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
          className="dark:text-blue-500 text-gray-500 hover:underline"
        >
          Aryakumar Jha
        </a>
      </span>
    </footer>
  );
};

export default Footer;
