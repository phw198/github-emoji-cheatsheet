document.addEventListener('DOMContentLoaded', function() {
    const listItems = document.querySelectorAll('ul li.toc1');
    const emojiImages = document.querySelectorAll('img.emoji-img');
    const emojiMarkdowns = document.querySelectorAll('code.emoji-markdown');
    const emojiUnicodes = document.querySelectorAll('code.emoji-unicode');
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
            pulseEmoji(this, ":"+ this.alt + ":");
        }, false);
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            pulseEmoji(this, ":"+ this.alt + ":");
        }, false);
    });

    emojiMarkdowns.forEach(code => {
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
            pulseEmoji(document.getElementById(this.innerText.replace(/^:|:$/g,'')), this.innerText);
        }, false);

        code.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            pulseEmoji(document.getElementById(this.innerText.replace(/^:|:$/g,'')), this.innerText);
        }, false);
    });

    emojiUnicodes.forEach(unicode => {
        unicode.addEventListener('dblclick', function(e) {
            e.preventDefault();
            let unicodeInt = parseInt("0x" + this.innerText, 16);
            unicodeEmoji = String.fromCodePoint(unicodeInt);
            console.log(this.title);
            pulseEmoji(document.getElementById(this.title), unicodeEmoji);
        }, false);
        unicode.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            let unicodeInt = parseInt("0x" + this.innerText, 16);
            unicodeEmoji = String.fromCodePoint(unicodeInt);
            pulseEmoji(this, unicodeEmoji);
        }, false);
    });
});


function pulseEmoji(self, clipboard) {
    // Pulse animation
    self.classList.add('pulse-animation');
    self.addEventListener('animationend', () => {
        self.classList.remove('pulse-animation');
    }, { once: true });

    copyToClipboard(clipboard);
    
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

function filterEmojiTable(searchTerm) {
    console.log("Filtering emoji table with search term: ", searchTerm);

    const mainCats = document.querySelectorAll(".maincategory");
    console.log("Main categories found: ", mainCats.length);
    for (let mainCat = 0; mainCat < mainCats.length; mainCat++) {
        console.log("Filtering main category: ", mainCats[mainCat].id);

        const subCats = mainCats[mainCat].querySelectorAll(".subcategory");
        console.log("Subcategories found: ", subCats.length);
        let subCatMatches = false;
        for (let subCat = 0; subCat < subCats.length; subCat++) {
            if (filterSubcategory(subCats[subCat], searchTerm)) {
                subCatMatches = true;
            }
        }
        if (!subCatMatches) {
            mainCats[mainCat].style.display = "none";
        } else {
            mainCats[mainCat].style.display = "";
        }
    }
}

function filterSubcategory(subcategory, searchTerm) {
    console.log("Filtering subcategory: ", subcategory.id);
    const rows = subcategory.querySelectorAll("table tbody tr");
    const term = searchTerm.toLowerCase();

    // Iterate through rows (starting from index 1 to skip the header)
    let rowMatches = false;
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        // Get the text from the whole row
        const rowText = row.textContent.toLowerCase();

        // Toggle visibility based on the match
        if (rowText.includes(term)) {
            // Show
            rowMatches = true;
            row.style.display = ""; 
            console.log("Found match in row: ", rowText);
        } else {
            // Hide
            row.style.display = "none"; 
        }
    }
    if (!rowMatches) {
        console.log("No matches found in subcategory: ", subcategory.id);
        subcategory.style.display = "none";
    } else {
        subcategory.style.display = "";
    }
    return rowMatches;
}
