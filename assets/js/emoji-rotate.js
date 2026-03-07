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
            if (e.detail === 2) {
                e.preventDefault();
      
                this.classList.add('pulse-animation');
                this.addEventListener('animationend', () => {
                    this.classList.remove('pulse-animation');
                }, { once: true });

                const emojiCode = this.alt;
                copyToClipboard(":" + emojiCode + ":");
            }
        });
    });
  
    listItems.forEach(li => {
        li.addEventListener('click', handleListItemClick);
    });
});


async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}