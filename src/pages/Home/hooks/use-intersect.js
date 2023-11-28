import { useRef, useEffect, useCallback } from "react";

const initialOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [0.05, 0.3, 0.6, 0.95],
};

const useIntersect = (onIntersect, optionsData = {}, onlyOnce = false) => {
  const intersected = useRef(false);
  const targetRef = useRef(null);
  const observer = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const isIntersecting = entries?.[0]?.isIntersecting || false;

      if (isIntersecting) {
        onIntersect();

        if (!intersected.current && observer.current && onlyOnce) {
          observer.current.disconnect();
          observer.current = null;
          intersected.current = true;
        }
      }
    },
    [onIntersect, observer, intersected, onlyOnce]
  );

  useEffect(() => {
    const options =
      typeof optionsData === "object"
        ? { ...initialOptions, ...optionsData }
        : initialOptions;
    // Check browser support for `IntersectionObserver`
    const isSupportedIO = "IntersectionObserver" in window;
    if (!isSupportedIO) {
      return;
    }

    if (!intersected.current && !observer.current && targetRef.current) {
      observer.current = new IntersectionObserver(handleIntersect, options);
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [handleIntersect, optionsData]);

  return targetRef;
};

export default useIntersect;
