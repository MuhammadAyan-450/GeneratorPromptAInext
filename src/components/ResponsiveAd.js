"use client";

import { useEffect, useState } from "react";

export default function ResponsiveAd() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const container = document.getElementById("adsterra-responsive");

    if (container && container.innerHTML === "") {
      let key = "";
      let width = 0;
      let height = 0;

      if (mobile) {
        // Mobile 300x250
        key = "1fd84494f6306d166ee2ed02770a161d";
        width = 300;
        height = 250;
      } else {
        // Desktop 728x90
        key = "32fd718be96280b780793b836891d421";
        width = 728;
        height = 90;
      }

      const config = document.createElement("script");
      config.type = "text/javascript";
      config.innerHTML = `
        atOptions = {
          'key': '${key}',
          'format': 'iframe',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
      `;

      const invoke = document.createElement("script");
      invoke.type = "text/javascript";
      invoke.src = `https://www.highperformanceformat.com/${key}/invoke.js`;

      container.appendChild(config);
      container.appendChild(invoke);
    }
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div
        id="adsterra-responsive"
        style={{
          minHeight: isMobile ? "250px" : "90px",
          minWidth: isMobile ? "300px" : "728px",
        }}
      />
    </div>
  );
}