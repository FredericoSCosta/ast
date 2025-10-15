// src/hydration.ts
import { h, hydrate } from "preact";
function hydrateAll(componentTable) {
  let hydratableElements = document.querySelectorAll("[data-hydrate]");
  for (let element of hydratableElements) {
    let { key, props } = JSON.parse(element.getAttribute("data-hydrate"));
    let component = componentTable[key];
    if (component == null) {
      throw new Error(`Unknown component: ${key}. Did you forget to add it to StatefulComponents?`);
    }
    hydrate(h(component, props), element);
    element.removeAttribute("data-hydrate");
  }
}

// src/components/home-nav.tsx
import "preact";
import { useState, useEffect } from "preact/hooks";
import { jsx, jsxs } from "preact/jsx-runtime";
function HomeNav({ items }) {
  let [currentSectionId, setCurrentSectionId] = useState(null);
  useEffect(() => {
    function handleScroll() {
      let sections = document.querySelectorAll("main section");
      let currentSectionId2;
      let lastSection = sections[sections.length - 1];
      if (lastSection != null && window.scrollY + window.innerHeight >= document.body.scrollHeight - 20) {
        currentSectionId2 = lastSection.id;
      } else {
        for (let section of sections) {
          let rect = section.getBoundingClientRect();
          if (rect.top < 120 && rect.bottom > 40) {
            currentSectionId2 = section.id;
            break;
          }
        }
        if (currentSectionId2 == null) {
          currentSectionId2 = sections[0]?.id;
        }
      }
      setCurrentSectionId(currentSectionId2);
    }
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  let markerTop = 0;
  if (currentSectionId != null) {
    let navItem = document.getElementById(`${currentSectionId}-nav-item`);
    markerTop = navItem.offsetTop;
  }
  return /* @__PURE__ */ jsxs("nav", { class: "relative border-l-1 border-gray-300 text-slate-600", children: [
    /* @__PURE__ */ jsx("div", { class: "absolute w-1 h-6.5 transition-all duration-300 bg-gray-600", style: { top: markerTop } }),
    /* @__PURE__ */ jsx("ol", { children: Object.entries(items).map(([id, title]) => /* @__PURE__ */ jsx("li", { id: `${id}-nav-item`, class: id === currentSectionId ? "my-2 pl-8 text-slate-900" : "my-2 pl-8", children: /* @__PURE__ */ jsx("a", { href: `#${id}`, children: title }) })) })
  ] });
}

// assets/scripts.ts
var StatefulComponents = {
  HomeNav
};
hydrateAll(StatefulComponents);
if (false) {
  new EventSource("http://localhost:8000/esbuild").addEventListener("change", () => {
    window.location.reload();
  });
}
