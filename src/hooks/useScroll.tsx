import { useEffect, useRef } from "react";

const useScroll = (headerRef: React.RefObject<HTMLDivElement>, styles: any) => {
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 40) {
        isHidden.current = false;
      } else if (currentScrollY > lastScrollY.current) {
        isHidden.current = true;
      } else {
        isHidden.current = false;
      }

      lastScrollY.current = currentScrollY;

      if (headerRef.current) {
        if (isHidden.current) {
          headerRef.current.classList.add(styles["header--hidden"]);
        } else {
          headerRef.current.classList.remove(styles["header--hidden"]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef, styles]);
};

export default useScroll;
