const scroll = {
  isInScrollView (min, max, el) {
    min = min ? min : 0.5
    max = max ? max : 1.5
  
    const elementbounding = scrollable.getBoundingClientRect()
    const offsetBottomY = elementbounding.bottom
    const offsetTopY = (elementbounding.top + window.scrollY) - (+window.scrollY)
    const offsetTopYPourcent = offsetTopY / window.innerHeight
    const offsetBottomYPourcent = offsetBottomY / window.innerHeight

    if (offsetBottomYPourcent > 0.5 && offsetBottomYPourcent < 1.5) {
      scrollable.classList.add('isScrolled')
      return true
    } else if (scrollable.classList.contains('isScrolled') && (offsetBottomYPourcent < -1 || offsetBottomYPourcent > 3)) {
      scrollable.classList.remove('isScrolled')
      return false
    }
  }
}

const transformDOM = {
  decomposeText (text) {
    const formerText = text.textContent
    text.innerHTML = formerText.split('').map((text, index) => {
      return `<span class="splited">${text}</span>`
    }).join(' ')
  }
}

const animate = {
  letter (decomposedTextEl, duration, delay, from) {
    decomposedTextEl.forEach((el, index) => {
      
    })
  }
}

export { scroll, transformDOM, animate }