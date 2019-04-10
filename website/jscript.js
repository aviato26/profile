
let articles = {
  nodes: [...document.querySelectorAll('article')],
  clientY: 0,
  switchCard(int){
    if(this.clientY < 30){
      this.nodes.filter((c, i) => {
        if(int === i){
          c.className = 'card'
          c.style.transform = 'translateY(0px)'
        } else {
          c.className = 'card currentCard';
        }
      })
    }
  }
}

articles.nodes.map((c, i) => {
  c.addEventListener('touchstart', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400
  })

  c.addEventListener('touchmove', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400
    articles.nodes[i].style.transform = `translateY(${articles.clientY}px)`
  })

  c.addEventListener('touchend', (e) => {
    articles.switchCard(i)
  })
})
