document.addEventListener('DOMContentLoaded', function() {
  const emojiImages = document.querySelectorAll('img.emoji-img');
  const listItems = document.querySelectorAll('ul li.toc1');
  let clickTimeout = null;
  
  const handleListItemClick = function(e) {
    const self = this;
    
    if (e.detail === 1) {
      // Single click - set timeout to toggle, allowing time for double-click detection
      e.preventDefault();
      
      if (clickTimeout) clearTimeout(clickTimeout);
      
      clickTimeout = setTimeout(() => {
        const currentRotation = self.style.getPropertyValue('--rotation') || '0deg';
        let newRotation = '0deg';
        
        if (currentRotation === '0deg') {
            newRotation = '90deg';
        } else if (currentRotation === '90deg') {
            newRotation = '0deg';
        }
        
        self.style.setProperty('--rotation', newRotation);
        const nestedList = document.getElementById(self.innerText);
        if (nestedList) {
          nestedList.classList.toggle('hidden');
        }
      }, 400);

    } else if (e.detail === 2) {
      // Double-click - clear timeout and allow default navigation
      e.preventDefault();
      if (clickTimeout) clearTimeout(clickTimeout);
      window.location.href = e.target.href;
    }
  };
  
  emojiImages.forEach(img => {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Cycle through rotation states: 0 -> 90 -> 180 -> 0
      if (this.classList.contains('rotate-90')) {
        this.classList.remove('rotate-90');
        this.classList.add('rotate-180');
      } else if (this.classList.contains('rotate-180')) {
        this.classList.remove('rotate-180');
      } else {
        this.classList.add('rotate-90');
      }
    });
  });
  
  listItems.forEach(li => {
    li.addEventListener('click', handleListItemClick);
  });
});
