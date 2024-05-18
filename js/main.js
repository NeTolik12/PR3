filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";

  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}


function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


var modal = document.getElementById("myModal");


var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




document.addEventListener('DOMContentLoaded', () => { 

  const tabs = () => { 
    const head = document.querySelector('.tabs__head') 
    const body = document.querySelector('.tabs__body') 

    const getActiveTabName = () => { 
      return head.querySelector('.tabs__caption_active').dataset.tab 
    }

    const setActiveContent = () => { 
      if (body.querySelector('.tabs__content_active')) { 
        body.querySelector('.tabs__content_active').classList.remove('tabs__content_active') 
      }
      body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('tabs__content_active') 
    }

    
    if (!head.querySelector('.tabs__caption_active')) {  
      head.querySelector('.tabs__caption').classList.add('tabs__caption_active') 
    }

    setActiveContent(getActiveTabName()) 
    head.addEventListener('click', e => { 
      const caption = e.target.closest('.tabs__caption') 
      if (!caption) return 
      if (caption.classList.contains('tabs__caption_active')) return 

      if (head.querySelector('.tabs__caption_active')) { 
        head.querySelector('.tabs__caption_active').classList.remove('tabs__caption_active') 
      }

      caption.classList.add('tabs__caption_active') 

      setActiveContent(getActiveTabName()) 
    })
  }

  tabs() 

})






class Slider {
  constructor(slider, autoplay = true) {
   
      this.slider = slider;
      
      this.allFrames = slider.querySelectorAll('.carousel-item');
   
      this.frameChain = slider.querySelector('.carousel-slides');
   
      this.nextButton = slider.querySelector('.carousel-next');
   
      this.prevButton = slider.querySelector('.carousel-prev');

      this.index = 0; 
      this.length = this.allFrames.length; 
      this.autoplay = autoplay; 
      this.paused = null; 

      this.init(); 
  }

  init() {
      this.dotButtons = this.dots(); 

      
      this.allFrames.forEach(frame => frame.style.width = 100/this.length + '%');
      
      this.frameChain.style.width = 100 * this.length + '%';

      this.nextButton.addEventListener('click', event => { 
          event.preventDefault();
          this.next();
      });

      this.prevButton.addEventListener('click', event => { 
          event.preventDefault();
          this.prev();
      });

      
      this.dotButtons.forEach(dot => {
          dot.addEventListener('click', event => {
              event.preventDefault();
              const index = this.dotButtons.indexOf(event.target);
              if (index === this.index) return;
              this.goto(index);
          });
      });

      if (this.autoplay) { 
          this.play();
          
          this.slider.addEventListener('mouseenter', () => clearInterval(this.paused));
          
          this.slider.addEventListener('mouseleave', () => this.play());
      }
  }

  
  goto(index) {
    
      if (index > this.length - 1) {
          this.index = 0;
      } else if (index < 0) {
          this.index = this.length - 1;
      } else {
          this.index = index;
      }
     
      this.move();
  }


  next() {
      this.goto(this.index + 1);
  }


  prev() {
      this.goto(this.index - 1);
  }


  move() {
      
      const offset = 100/this.length * this.index;
      this.frameChain.style.transform = `translateX(-${offset}%)`;
      this.dotButtons.forEach(dot => dot.classList.remove('active'));
      this.dotButtons[this.index].classList.add('active');
  }



  dots() {
      const ol = document.createElement('ol');
      ol.classList.add('carousel-indicators');
      const children = [];
      for (let i = 0; i < this.length; i++) {
          let li = document.createElement('li');
          if (i === 0) li.classList.add('active');
          ol.append(li);
          children.push(li);
      }
      this.slider.prepend(ol);
      return children;
  }
}