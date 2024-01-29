import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className="custom-loader">
      <ScaleLoader
        color="#bd00ff"
        height={55}
        margin={6}
        radius={5}
        speedMultiplier={1}
        width={15}
      />
    </div>
  );
};

export default Loader;
