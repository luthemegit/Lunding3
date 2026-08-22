import portfolioBg from "/assets/img/portfolio-bg2.png";

const PortfolioBg = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <img
        src={portfolioBg}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          select-none
        "
      />
    </div>
  );
};

export default PortfolioBg;