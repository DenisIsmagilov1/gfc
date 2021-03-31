const animations = {
  opacityAnimation: {
    opacity: [0, 1],
    duration: 1000,
    autoplay: false,
    easing: 'easeInOutQuad'
  },
  scaleAnimation: {
    scale: [0, 1],
    duration: 1000,
    autoplay: false,
    easing: 'easeInOutQuad'
  },
  counterAnimation: {
    innerHTML: [0, 10000],
    easing: 'easeOutSine',
    round: 1,
    duration: 2000
  }
}

for (let animationClass in animations) {
  const blocks = $(`.${animationClass}`);

  blocks.each(function(i, item) {
    const newClass = `${animationClass}-${i}`;
    const newClassSelector = `.${newClass}`;
    
    item.classList.remove(animationClass)
    item.classList.add(newClass)

    const animationOptions = animations[animationClass];
    if (animationClass === 'counterAnimation') {
      animationOptions.innerHTML = [0, item.innerHTML]
    }

    const animation =  anime({
      targets: newClassSelector,
      ...animationOptions
    });
    
    $(newClassSelector).one('inview', function(event, isInView) {
      if (isInView) {
        animation.play()
      }
    });
  })  
}
