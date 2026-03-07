document.addEventListener('DOMContentLoaded', function() {
  const emojiImages = document.querySelectorAll('img.emoji-img');
//   const listItems = document.querySelectorAll('ul li');
  const listItems = document.querySelectorAll('ul li.toc1');
  
  const handleListItemClick = function(e) {
    e.preventDefault();
    
    const currentRotation = this.style.getPropertyValue('--rotation') || '0deg';
    let newRotation = '0deg';
    let visibility = 'none';
    
    if (currentRotation === '0deg') {
        newRotation = '90deg';
        visibility = 'block';
    } else if (currentRotation === '90deg') {
        newRotation = '0deg';
        visibility = 'none';
    }
    
    this.style.setProperty('--rotation', newRotation);
    document.getElementById(this.innerText).style.display = visibility;
    // window.alert(this.innerText);
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
