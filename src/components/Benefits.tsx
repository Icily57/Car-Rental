import React from "react";
import { useNavigate } from "react-router-dom";
import Container from '../components/Container';

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleExploreClick = () => {
    navigate('/explore'); // Navigate to the explore page
  };

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap bg-blue-200 text-black">
      <div className={`flex items-center justify-center w-full lg:w-1/2 ${data.imgPos === "right" ? "lg:order-1" : ""}`}>
        <div>
          <img src={data.image} width={521} height={521} alt="Benefits" />
        </div>
      </div>
      <div className={`flex flex-wrap items-center w-full lg:w-1/2 ${data.imgPos === "right" ? "lg:justify-end" : ""}`}>
        <div className="flex flex-col w-full mt-4">
          <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-black lg:leading-tight lg:text-4xl">
            {data.title}
          </h3>
          <p className="max-w-2xl py-4 text-lg leading-normal text-black lg:text-xl xl:text-xl">
            {data.desc}
          </p>
          <div className="w-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon} classname="text-black">
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button
              className="btn btn-primary"
              onClick={handleExploreClick} // Add onClick handler for navigation
            >
              Explore Our Cars
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

interface BenefitProp {
  icon: any;
  title: string;
  children: string;
  classname?: string;
}

const Benefit: React.FC<BenefitProp> = ({ icon, title, children, classname }) => {
  return (
    <div className={`flex items-start mt-8 space-x-3 ${classname}`}>
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
        {React.cloneElement(icon, { className: "w-7 h-7 text-indigo-50" })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-black">
          {title}
        </h4>
        <p className="mt-1 text-black">
          {children}
        </p>
      </div>
    </div>
  );
}

export default Benefits;
