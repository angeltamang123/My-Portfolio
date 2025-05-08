import React from "react";
import GridMotion from "./supportingComponents/gridMotion";
import Aurora from "./supportingComponents/aurora";

const Background = () => {
  const items = [
    // Images of Libraries and Frameworks I am familiar with
    // The GridMotion component checks beginning of string (https or assets) so
    // The images saved in the server must be inside public/assets
    "Placebo",
    "assets/react.svg",
    "assets/mongodb.svg",
    "assets/express.svg",
    "Full-Stack Developer",
    "placebo",
    "placebo",
    "placebo",
    "assets/pytorch.svg",
    "assets/matplotlib.svg",
    "assets/numpy.svg",
    "assets/pandas.svg",
    "assets/scikit-learn.svg",
    "assets/gensim.svg",
    "assets/ray.png",
    "assets/nextjs.svg",
    "assets/flask.svg",
    "assets/mongoose.svg",
    "assets/seaborn.svg",
    "assets/huggingface.svg",
    "Machine Learning",
    "Linux",
    "Deep Learning",
    "python",
    "assets/linux.svg",
    "assets/javascript.svg",
    "assets/python.svg",
  ];
  return (
    <div className="absolute bg-[#151616] inset-0 z-0">
      {/* <GridMotion items={items} /> */}
      <Aurora
        colorStops={["#9BFD8B", "#45AA96", "#05CEA8"]}
        blend={0.5}
        amplitude={0.8}
        speed={0.2}
      />
    </div>
  );
};

export default Background;
