// ==UserScript==
// @name            add `git clone` prefix
// @description     a simple script to `add git clone` prefix when copying ssh repo link
// @update          2024/02/06 10:30:00
// @namespace       add-git-clone
// @match           *://*/*
// @grant           none
// @version         1.3
// @author          Viki <hi@viki.moe>
// @feedback-url    https://github.com/vikiboss/add-git-clone/issues
// @github          https://github.com/vikiboss/add-git-clone
// @license         MIT
// ==/UserScript==

;(function () {
  'use strict'

  function shouldPrefix(text) {
    return text.startsWith('git@')
  }

  window.addEventListener('load', function () {
    document.addEventListener('copy', function (e) {
      let selection = window.getSelection().toString()

      if (shouldPrefix(selection)) {
        e.clipboardData.setData('text/plain', 'git clone ' + selection)
        e.preventDefault()
      }
    })

    if (navigator.clipboard) {
      const originalWriteText = navigator.clipboard.writeText

      navigator.clipboard.writeText = function (data) {
        if (shouldPrefix(data)) {
          data = 'git clone ' + data
        }
        return originalWriteText.call(navigator.clipboard, data)
      }
    }
  })
})()
