function init(){
    document.getElementById('addForm').addEventListener("submit", function(){ closePopup('add', 'submit')});
    document.getElementById('updateForm').addEventListener("submit", function(){ closePopup('update', 'submit')});
    dragElement(document.getElementById('apHandle'));
    dragElement(document.getElementById('upHandle'));
}

function openPopup(form, obj){
    const a = document.getElementById('actualBody');
    if (form == 'add'){
      const b = document.getElementById('addContainer');
      const c = document.getElementById('addPopup');
      a.addEventListener('animationend', removeAnim);
      b.addEventListener('animationend', removeAnim);
      c.addEventListener('animationend', removeAnim);
      b.style.visibility="visible";
      a.style.animation = 'bFadeOut .5s linear .5s 1 normal forwards';
      b.style.animation = 'cFadeIn .5s linear .5s 1 normal forwards';
      c.style.animation = 'pOpen .5s linear .5s 1 normal forwards';
    }
    
    else if (form == 'update'){
      const b = document.getElementById('updateContainer');
      const c = document.getElementById('updatePopup');
      const d = document.getElementById('updateName');
      const e = document.getElementById('updateComment');
      const f = document.getElementById('updateID');
      var id = obj.parentElement.children[0].value;
      var name = obj.parentElement.parentElement.parentElement.children[0].innerText;
      var comment = obj.parentElement.parentElement.parentElement.children[1].innerText;
      d.value = name;
      e.value = comment;
      f.value = id;
      a.addEventListener('animationend', removeAnim);
      b.addEventListener('animationend', removeAnim);
      c.addEventListener('animationend', removeAnim);
      b.style.visibility="visible";
      a.style.animation = 'bFadeOut .5s linear .5s 1 normal forwards';
      b.style.animation = 'cFadeIn .5s linear .5s 1 normal forwards';
      c.style.animation = 'pOpen .5s linear .5s 1 normal forwards';
    }

}

function closePopup(form, cause){
  const a = document.getElementById('actualBody');
    if (form == 'add'){
        const b = document.getElementById('addContainer');
        const c = document.getElementById('addPopup');

        if (cause == 'submit'){
          event.preventDefault();
          const d = document.getElementById('addForm');
          d.submit();
        }

        a.addEventListener('animationend', removeAnim);
        b.addEventListener('animationend', removeAnim);
        c.addEventListener('animationend', removeAnim);
        a.style.animation = 'bFadeIn .5s linear .5s 1 normal forwards';
        b.style.animation = 'cFadeOut .5s linear .5s 1 normal forwards';
        c.style.animation = 'pClose .5s linear .5s 1 normal forwards';
    }

    else if (form == 'update'){
      const b = document.getElementById('updateContainer');
        const c = document.getElementById('updatePopup');

        if (cause == 'submit'){
          event.preventDefault();
          const d = document.getElementById('updateForm');
          d.submit();
        }

        a.addEventListener('animationend', removeAnim);
        b.addEventListener('animationend', removeAnim);
        c.addEventListener('animationend', removeAnim);
        a.style.animation = 'bFadeIn .5s linear .5s 1 normal forwards';
        b.style.animation = 'cFadeOut .5s linear .5s 1 normal forwards';
        c.style.animation = 'pClose .5s linear .5s 1 normal forwards';
  }
  
}

function removeAnim(event) {
	var el = event.currentTarget;
	el.removeEventListener('animationend', removeAnim);
	if (el.style.animation.match(/FadeIn.*/)) {
		if (el == document.body && getComputedStyle(el).backgroundColor != rgb(0,0,0,1)) {
			el.style.backgroundColor = rgb(0, 0, 0, 1);
		}
			el.style.backgroundColor = getComputedStyle(el).backgroundColor;
		}

		if (el.style.animation.match(/FadeOut.*/)){
			if (el.id == 'addContainer' || el.id == 'updateContainer') {
				el.style.backgroundColor = getComputedStyle(el).backgroundColor;
				el.style.visibility = 'hidden';
			}
			else {
				el.style.backgroundColor = getComputedStyle(el).backgroundColor;
			}
		}

		else if(el.style.animation.match(/p.*/)){
			el.style.opacity = getComputedStyle(el).opacity;
		}

		el.style.animation = '';
	}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
      elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}