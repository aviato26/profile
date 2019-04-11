
let articles = {
  nodes: [...document.querySelectorAll('article')],
  clientY: 0,
  rotate: 0,
  switchCard(int){
    if(this.clientY < -30){
      this.nodes.filter((c, i) => {
        if(int === i){
          c.className = 'card'

          // setting y position to 0 or else position remains the same
          c.style.transform = 'translateY(0px)'

        } else {
          c.className = 'card currentCard';
        }
      })
    }
  },
  flipCard(){
    /*
      mobile touchmove events seem to have a lag
      so i increased the rotate velocity to 50 instead of 3
    */
    return (this.clientY < 10) ? this.rotate+=50 : this.rotate = 0
  }
}

articles.nodes.map((c, i) => {
  c.addEventListener('touchstart', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400
  })

  c.addEventListener('touchmove', (e) => {
    articles.clientY = e.changedTouches[0].clientY - e.changedTouches[0].screenY - 400

    /*
      as the client moves up the y axis we will update the activated article node
      with the events current position
    */
    }
    articles.nodes[i].style.transform = `translateY(${articles.clientY}px) rotateX(${articles.rotate}deg)`
    articles.flipCard()
  })

  c.addEventListener('touchend', (e) => {
    // as the event ends we will switch the z-index of the current and next article nodes 
    articles.switchCard(i)
  })
})
