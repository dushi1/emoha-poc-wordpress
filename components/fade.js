import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const Fade = () => {
  const [view, setView] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (!view && inView) {
      setView(true);
    }
  }, [inView]);
  return (
    <div className="grid-prac" ref={ref}>
      <div>
        <p1>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p1>
      </div>
      <div style={{ position: "relative" }}>
        <img src="https://cdn.pixabay.com/photo/2014/11/13/06/10/boy-529065_960_720.jpg" />
        <img
          class={`photo1 ${view ? "photo1animate" : ""}`}
          style={{ position: "absolute", top: 0, left: 0 }}
          src="https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964_960_720.jpg"
        />
        <img
          class={`photo2 ${view ? "photo2animate" : ""}`}
          style={{ position: "absolute", top: 0, left: 0 }}
          src="https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_960_720.jpg"
        />
      </div>
    </div>
  );
};

export default Fade;
