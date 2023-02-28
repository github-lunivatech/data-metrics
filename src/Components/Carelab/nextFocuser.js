const { useRef } = require("react");

function useFocusNext() {
    const controls = useRef([]);
  
    const handler = (event) => {
      if (event.keyCode === 13) {
  
        const index = controls.current.indexOf(event.target);
        const next = controls.current[index + 1];
        next && next.focus();
      }
    };
  
    return useCallback((element) => {
      if (element && !controls.current.includes(element)) {
        controls.current.push(element);
        element.addEventListener('keydown', handler);
      }
    }, []);
  }