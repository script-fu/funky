// Enhanced sidebar navigation - prevents desktop navigation glitch
document.addEventListener("DOMContentLoaded", function () {
  // Debounce function to prevent rapid-fire events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Enhanced collapsible behavior with glitch prevention
  function enableSmoothCollapsibles() {
    const buttons = document.querySelectorAll(".hextra-sidebar-collapsible-button");
    
    buttons.forEach(function (button) {
      // Prevent multiple rapid clicks
      let isToggling = false;
      
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isToggling) return;
        isToggling = true;
        
        const list = button.parentElement.parentElement;
        if (list) {
          // Smooth toggle with proper transition timing
          requestAnimationFrame(() => {
            list.classList.toggle("open");
            
            // Reset toggle lock after transition completes
            setTimeout(() => {
              isToggling = false;
            }, 250);
          });
        } else {
          isToggling = false;
        }
      });
      
      // Prevent hover state issues on mouse release
      button.addEventListener("mouseup", function (e) {
        // Force a small delay to prevent layout reflow glitches
        setTimeout(() => {
          e.target.blur();
        }, 10);
      });
    });
  }

  // Enhanced scroll-to-active with glitch prevention
  const debouncedScrollToActive = debounce(function() {
    const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
    const activeItems = document.querySelectorAll(".sidebar-active-item");
    const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
      return activeItem.getBoundingClientRect().height > 0;
    });

    if (!visibleActiveItem || !sidebarScrollbar) {
      return;
    }

    const yOffset = visibleActiveItem.clientHeight;
    const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
    
    // Use smooth scrolling to prevent jarring movements
    sidebarScrollbar.scrollTo({
      behavior: "smooth",
      top: Math.max(0, yDistance - yOffset)
    });
  }, 100);

  // Initialize enhanced sidebar
  debouncedScrollToActive();
  enableSmoothCollapsibles();
  
  // Prevent sidebar glitches on window resize
  window.addEventListener("resize", debounce(debouncedScrollToActive, 200));
});
