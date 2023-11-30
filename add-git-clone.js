// ==UserScript==
// @name            add `git clone` prefix
// @description     a simple script to `add git clone` prefix when copying ssh repo link
// @update          2023/11/30 09:50:00
// @namespace       add-git-clone
// @match           *://*/*
// @grant           none
// @version         1.1
// @author          Viki <hi@viki.moe>
// @feedback-url    https://github.com/vikiboss/add-git-clone/issues
// @github          https://github.com/vikiboss/add-git-clone
// @license         MIT
// ==/UserScript==


(function() {
    'use strict';
  
    function shouldPrefix(text) {
        return text.startsWith('git@');
    }

    const originalWriteText = navigator.clipboard.writeText;
    navigator.clipboard.writeText = function(data) {
        if (shouldPrefix(data)) {
            data = 'git clone ' + data;
        }
        return originalWriteText.call(navigator.clipboard, data);
    };

    document.addEventListener('copy', function(e) {
        let selection = window.getSelection().toString();
        if (shouldPrefix(selection)) {
            e.clipboardData.setData('text/plain', 'git clone ' + selection);
            e.preventDefault();
        }
    });
})();
