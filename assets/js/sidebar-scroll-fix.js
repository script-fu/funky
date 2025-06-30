// Fix for sidebar navigation glitch - prevent instant scrolling
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function() {
    const sidebarScrollbar = document.querySelector("aside.sidebar-container > .hextra-scrollbar");
    
    if (sidebarScrollbar) {
      // Store the original scrollTo method
      const originalScrollTo = sidebarScrollbar.scrollTo;
      
      // Override scrollTo to prevent instant scrolling that causes glitches
      sidebarScrollbar.scrollTo = function(options) {
        if (options && options.behavior === "instant") {
          // Block instant scrolling completely
          return;
        }
        // Allow all other scroll behaviors
        return originalScrollTo.call(this, options);
      };
    }
  }, 50);
});
