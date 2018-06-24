const scroll = {
  isInScrollView (el, min, max, watchBelow, watchAbove) {
    min = min ? min : 0.5
    max = max ? max : 1.5
    watchBelow = watchBelow ? true : false
    watchAbove = watchAbove ? true : false

    const elementbounding = el.getBoundingClientRect()
    const offsetBottomY = elementbounding.bottom
    const offsetTopY = (elementbounding.top + window.scrollY) - (+window.scrollY)
    const offsetTopYPourcent = offsetTopY / window.innerHeight
    const offsetBottomYPourcent = offsetBottomY / window.innerHeight

    if (watchAbove && offsetTopYPourcent < min) {
      el.classList.remove('isScrolled')
      return false
    } else if (offsetBottomYPourcent > min && offsetBottomYPourcent < max) {
      el.classList.add('isScrolled')
      return true
    } else if (watchBelow && el.classList.contains('isScrolled') && (offsetBottomYPourcent < min || offsetBottomYPourcent > max)) {
      el.classList.remove('isScrolled')
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
