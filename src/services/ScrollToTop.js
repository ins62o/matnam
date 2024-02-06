import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// TOP 버튼 조절
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
