import { useEffect, useRef } from "react";

type CustomScrollbarProps = {
  children: React.ReactNode;
};

const CustomScrollbar = ({ children }: CustomScrollbarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container ?? {};

      const thumbHeight =
        ((clientHeight ?? 0) / (scrollHeight ?? 1)) * (clientHeight ?? 0);
      const thumbOffset =
        ((scrollTop ?? 0) / ((scrollHeight ?? 1) - (clientHeight ?? 0))) *
        ((clientHeight ?? 0) - thumbHeight);

      thumb?.style.setProperty("height", `${thumbHeight}px`);
      thumb?.style.setProperty("transform", `translateY(${thumbOffset}px)`);
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-full relative">
      <div
        className="absolute right-2 top-2 bottom-2 w-8 bg-gray-200 dark:bg-gray-800 rounded"
        ref={containerRef}
      >
        <div
          className={`absolute w-full bg-gray-400 dark:bg-gray-700 rounded cursor-pointer transition ${
            thumbRef.current ? "hover:bg-gray-500 dark:hover:bg-gray-600" : ""
          }`}
          ref={thumbRef}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default CustomScrollbar;
