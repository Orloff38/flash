const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const editBox = document.getElementsByClassName("edit-box")[0];
const edit_question = document.getElementById("edit_question");
const edit_answer = document.getElementById("edit_answer");
const edit_a_rem = document.getElementsByClassName("edit_a_rem")[0];
const edit_q_rem = document.getElementsByClassName("edit_q_rem")[0];
const a_rem = document.getElementsByClassName("a_rem")[0];
const q_rem = document.getElementsByClassName("q_rem")[0];
let edit_id = 0;
let max_symb = 80;

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
contentArray.forEach(divMaker)

function shuffle(){
    let currentIndex = contentArray.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [contentArray[currentIndex], contentArray[randomIndex]] = [
        contentArray[randomIndex], contentArray[currentIndex]];
  }

  

  localStorage.setItem('items', JSON.stringify(contentArray));
  flashcards.innerHTML = '';

  contentArray.forEach(divMaker);

}




function divMaker(text){
    var div = document.createElement("div");
    var front = document.createElement("div");
    var back = document.createElement("div");
    var closerbutton = document.createElement("div");
    var editbutton = document.createElement("div");
    div.className = 'flashcard';
   
    

    if (text.rotation == true){
        div.classList.add('rotation');
    }
    
    div.id = text.id;

    front.className = 'front';
    back.className = 'back';
    closerbutton.className = 'close';
    editbutton.className = 'editbutton';

front.innerText = text.my_question;
back.innerText = text.my_answer;
div.appendChild(front);
div.appendChild(back);



front.appendChild(closerbutton);
front.appendChild(editbutton);
flashcards.appendChild(div)
}


function addFlashcard(){
    var flashcard_info = {
        'id': Date.now(),
        'my_question' : question.value,
        'my_answer' : answer.value,
        'rotation': false,
    }
    
contentArray.push(flashcard_info);
localStorage.setItem('items', JSON.stringify(contentArray));
divMaker(contentArray[contentArray.length - 1]);
question.value = '';
answer.value = '';
question.focus();
}



function delFlashcards(){
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

function showCreateCardBox(){
    createBox.style.display = "block";

}
function hideCreateBox(){
    question.value = '';
answer.value = '';
    createBox.style.display = "none";
}

document.addEventListener('click', delone)
function delone(e){
    if (e.target.className == 'close'){
        const parentNode = e.target.closest('.flashcard');

       const id = parentNode.id;
       const index = contentArray.findIndex(function(card){
        if(card.id == id){
            return true
        }
       })
       contentArray.splice(index, 1);
       parentNode.remove();
       localStorage.setItem('items', JSON.stringify(contentArray));      
    }
}


document.addEventListener('click', edition)
function edition(e){
   
    if (e.target.className == 'editbutton'){
        max_symb = 80;
        editBox.style.display = "block";
        edit_question.focus();

        const parentNode = e.target.closest('.flashcard');
       const id = parentNode.id;
       const item = contentArray.find(function(card){
        if(card.id == id){
            return true
        }
       })
       edit_question.value = item.my_question;
       edit_answer.value = item.my_answer; 
       edit_id = id;
       edit_q_rem.innerText = `(remain: ${max_symb-edit_question.value.length} symbols)`;
       edit_a_rem.innerText = `(remain: ${max_symb-edit_answer.value.length} symbols)`;

    }


            
       }

function saveedit(){


    const item = contentArray.find(function(card){
        if(card.id == edit_id){
            return true
        }
       })
       

    item.my_question = edit_question.value;
    item.my_answer = edit_answer.value;
  
    localStorage.setItem('items', JSON.stringify(contentArray));  
    let str_id = String(edit_id);
    let edit_card = document.getElementById(str_id);
    let edit_card_q = edit_card.querySelector('.front');
    let edit_card_a = edit_card.querySelector('.back');
    edit_card_q.innerText = item.my_question;
    edit_card_a.innerText = item.my_answer;
    var closerbutton = document.createElement("span");
    var editbutton = document.createElement("span");
    closerbutton.className = 'close';
    editbutton.className = 'editbutton';
    edit_card_q.appendChild(closerbutton);
    edit_card_q.appendChild(editbutton);
    edit_question.value = '';
    edit_answer.value = '';
    editBox.style.display = "none";

}

function closeedit(){
    edit_question.value = '';
    edit_answer.value = '';
    editBox.style.display = "none";
    const item = contentArray.find(function(card){
        if(card.id == edit_id){
            return true
        }
       })
       item.rotation = false;
}
     

flashcards.addEventListener('click', rotation)
function rotation(e){
    const parentNode = e.target.closest('.flashcard');

    if (e.target.className == 'front' || e.target.className == 'back'){        
        parentNode.classList.toggle('rotation');  
        const id = parentNode.id;
    
        const item = contentArray.find(function(card){
            if(card.id == id){
                return true
            }
           })
           item.rotation = !item.rotation;
           localStorage.setItem('items', JSON.stringify(contentArray));      
    }

    
}

//function turn(){
    
//contentArray.forEach(rotateCard)
//function rotateCard(item){
    
   // console.log(item.rotation);
   // if (item.rotation == true){ 

     //                const id = String(item.id);
        //            const rotation_card = document.getElementById(id);
        //             rotation_card.classList.remove('rotation');   
        //             item.rotation = false ;
                
       //            }
       //            localStorage.setItem('items', JSON.stringify(contentArray));  
               
      //                         }
                 
//}
function turn(){
    
 
for (let l=0; l<contentArray.length; l++){

    if (contentArray[l].rotation == true){ 
        const id = String(contentArray[l].id);
        const rotation_card = document.getElementById(id);
        rotation_card.classList.remove('rotation');   
        contentArray[l].rotation = false ;
    }
    localStorage.setItem('items', JSON.stringify(contentArray));                                                    
}                     
}


function def_count(e){
    max_symb = 80;
    if(e.target.className == 'btn') {
        edit_a_rem.innerText = `(remain: ${max_symb} symbols)`;
        edit_q_rem.innerText = `(remain: ${max_symb} symbols)`;
        a_rem.innerText = `(remain: ${max_symb} symbols)`;
        q_rem.innerText = `(remain: ${max_symb} symbols)`;
    }
}
    function counter(e){
        max_symb = 80;
    if((e.target.className == 'field') && (e.target.value!='')){
           
                let span_count = e.target.previousElementSibling;
                span_count.innerText = `(remain: ${max_symb-e.target.value.length} symbols)`;
            }
            if((e.target.className == 'field') && (e.target.value=='')){
           
                let span_count = e.target.previousElementSibling;
                span_count.innerText = `(remain: ${max_symb} symbols)`;
            }
    }
    

    

document.addEventListener('keyup', counter);
document.addEventListener('keydown', function(e){
    if(e.repeat) counter();
});

document.addEventListener('click', def_count);   
        
  
