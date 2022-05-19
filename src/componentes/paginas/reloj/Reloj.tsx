import { useEffect, useRef } from "react";
import "./Reloj.css";

export default function Clock() {
  const handlerSegundos = useRef(null);
  const handlerMinutos = useRef(null);
  const handlerHoras = useRef(null);

  useEffect(() => {
    setInterval(() => {
      let fecha = new Date();
      let sec = fecha.getSeconds();
      let min = fecha.getMinutes();
      let hor = fecha.getHours();
      handlerSegundos.current.style.transform = `rotateZ(${sec * 6}deg)`;
      handlerMinutos.current.style.transform = `rotateZ(${min * 6}deg)`;
      handlerHoras.current.style.transform = `rotateZ(${hor * 30}deg)`;
    }, 1000);
  }, []);

  return (
    <div id="app">
      <div className="clock-container">
        <div className="clock">
          <div ref={handlerHoras} className="hor" id="hor">
            <div className="hr"></div>
          </div>
          <div ref={handlerMinutos} className="min" id="min">
            <div className="mn"></div>
          </div>
          <div ref={handlerSegundos} className="sec" id="sec">
            <div className="sc"></div>
          </div>
        </div>
      </div>
    </div>
  );
}