import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ScrollToTopOnMount() {
  const history = useHistory();
  useEffect(() => {
    if (history.action === "POP") {
      return;
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
