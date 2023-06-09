import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./NavLogo.module.css";

import { gsap } from "gsap";

const NavLogo: React.FunctionComponent = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState<any>(router.pathname);

  const animationRef = useRef<any>();
  const navLogoSvgRef = useRef<any>();
  animationRef.current = gsap.timeline({ defaults: { opacity: 0 } });

  useEffect(() => {
    animationRef.current.from(navLogoSvgRef.current, {
      autoAlpha: 0,
      duration: 3,
      ease: "none",
      scale: 1.1,
      transformOrigin: "center",
    });
  });
  return (
    <svg
      className={classes.content}
      fill=" #74dacc"
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.32 512.32"
      xmlSpace="preserve"
      ref={navLogoSvgRef}
    >
      <g transform="translate(8 2)">
        <g>
          <path
            d="M375.48,269.827c-0.853-3.413-4.267-5.973-7.68-5.973c-48.747,0-85.261,65.089-104.887,133.871
          c2.226-38,7.47-65.283,11.874-87.791c2.749-14.845,5.141-27.741,5.984-40.173c92.177-23.191,108.34-104.357,107.51-115.987
          c0-2.56-0.853-4.267-2.56-5.973c-1.707-0.853-3.413-1.707-5.973-1.707c-44.463,3.269-90.427,23.574-108.335,68.975
          c-3.81-8.927-8.923-18.514-15.641-29.135C275.442,64.685,182.439,5.234,163.853-0.68c-3.413-0.853-6.827,0-9.387,2.56
          c-7.68,8.533-17.92,49.493-6.827,92.16c8.378,32.676,31.568,76.866,92.983,100.267c15.67,24.201,21.939,41.367,23.112,58.829
          c-0.141,3.476-0.159,7.046-0.042,10.717c0,0.41,0.042,0.82,0.105,1.227c-0.604,12.155-3.072,25.207-6.078,41.44
          c-4.222,22.051-9.476,48.748-12.074,85.19c-20.007-66.513-55.802-127.857-103.126-127.857c-3.413,0-6.827,2.56-7.68,5.973
          c-24.747,71.68-20.48,139.947,12.8,186.88c24.747,34.987,64,54.613,107.52,54.613s82.773-19.627,107.52-54.613
          C395.96,410.627,400.227,342.36,375.48,269.827z M165.56,95.747c-9.387-32.427-5.12-63.147-0.853-75.947
          c20.171,11.296,80.762,53.879,76.486,140.716L215.053,109.4c-1.707-4.267-6.827-5.973-11.093-3.413
          c-4.267,1.707-5.973,6.827-3.413,11.093l27.193,53.177C196.177,153.674,175.444,128.44,165.56,95.747z M370.36,164.867
          c-4.497,17.989-19.534,58.361-67.656,80.061l28.402-28.861c3.413-3.413,3.413-8.533,0-11.947s-8.533-3.413-11.947,0
          l-37.336,37.938C290.399,184.339,342.164,168.895,370.36,164.867z M161.293,446.467c-29.013-40.107-33.28-100.693-12.8-164.693
          c49.511,7.736,87.098,114.359,96.233,189.53c0.291,7.09,0.681,14.437,1.177,22.052
          C211.23,491.449,181.632,474.432,161.293,446.467z M349.027,447.32c-20.435,28.097-50.215,44.299-85.101,46.913
          c-0.044-0.647-0.087-1.29-0.13-1.934c4.006-75.351,43.886-202.066,98.031-210.526C382.307,345.773,378.04,406.36,349.027,447.32z"
          />
        </g>
      </g>
    </svg>
  );
};
export default NavLogo;
