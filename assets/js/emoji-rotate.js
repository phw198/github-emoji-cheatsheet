document.addEventListener('DOMContentLoaded', function() {
    const emojiImages = document.querySelectorAll('img.emoji-img');
    const emojiCodes = document.querySelectorAll('code.emoji-code');
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

    listItems.forEach(li => {
        li.addEventListener('click', handleListItemClick);
    });
  

    emojiImages.forEach(img => {
        img.addEventListener('dblclick', function(e) {
            e.preventDefault();
            pulseEmoji(this);
        }, false);
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            pulseEmoji(this);
        }, false);
    });

    emojiCodes.forEach(code => {
        // code.addEventListener('selectstart', function(e) {
        //     e.preventDefault();
        // }, false);
        code.addEventListener('dblclick', function(e) {
            e.preventDefault();
            // if (window.getSelection) {
            //     if (window.getSelection().empty) {  // Chrome
            //         window.getSelection().empty();
            //     } else if (window.getSelection().removeAllRanges) {  // Firefox
            //         window.getSelection().removeAllRanges();
            //     }
            // } else if (document.selection) {  // IE?
            //     document.selection.empty();
            // }
            pulseEmoji(document.getElementById(this.innerText.replace(/^:|:$/g,'')));
        }, false);

        code.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            pulseEmoji(document.getElementById(this.innerText.replace(/^:|:$/g,'')));
        }, false);
    });  
});


function pulseEmoji(self) {
    // Pulse animation
    self.classList.add('pulse-animation');
    self.addEventListener('animationend', () => {
        self.classList.remove('pulse-animation');
    }, { once: true });

    // Copy emoji code to clipboard
    const emojiCode = self.alt;
    copyToClipboard(":" + emojiCode + ":");
    
    // Show copied banner
    const banner = self.parentElement.querySelector('.copy-banner');
    if (banner) {
        // Remove class first in case of rapid clicking to restart animation
        banner.classList.remove('show');
        void banner.offsetWidth; // "Magic" trick to restart CSS animations
        banner.classList.add('show');
        
        // Cleanup after animation finishes
        setTimeout(() => {
            banner.classList.remove('show');
        }, 2500);
    }
}


async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}