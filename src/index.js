import * as httpUtil from './httpUtil';

const baseUrl="https://todo-simple-api.herokuapp.com";
const todoUrl=`${baseUrl}/todos`;

function createList(){

	let container=document.createElement('div');
	container.style.width=500;
	container.innerHTML='TO-DO List<hr>';
	container.id="container";
	
	let title=document.createElement('input');
	title.type='text';
	title.placeholder='title';
	
	let description=document.createElement('input');
	description.type='text';
	description.placeholder='description';
	
	let add=document.createElement('input');
	add.type='submit';
	add.value='Add to List';
	
	document.getElementsByTagName('body')[0].appendChild(container);	
	container.appendChild(title);
	container.appendChild(description);
	container.appendChild(add);
	
	add.addEventListener("click",(e) =>{
		
		e.preventDefault();
		let data={
		  "title":title.value,
		  "description":description.value,
		  "isComplete":false
		}	
		addList(todoUrl,data);
	});
}

function addList(todoUrl,data){

  httpUtil.post(todoUrl,data).then(response=>{
  	todoList(response.data.data.title,response.data.data.description,response.data.data.id);
  });

}

function todoList(title,description,id){
 let div= document.createElement('div');
  	
  let titleNew=document.createElement('label');
  titleNew.innerHTML=title+'       ';
  	
  let descriptionNew=document.createElement('label');  
  descriptionNew.innerHTML=description+'       ';
  	
  let delButtonNew=document.createElement('input');
  delButtonNew.type='submit';  	
  delButtonNew.value='delete';  	

  let upButtonNew=document.createElement('input');
  upButtonNew.type='submit';  	
  upButtonNew.value='update';  	
  	
  let container=document.getElementById('container');
  container.appendChild(div);  	
  div.appendChild(titleNew);
  div.appendChild(descriptionNew);
  div.appendChild(delButtonNew);  
  div.appendChild(upButtonNew);  

  delButtonNew.addEventListener('click',(e)=>{
    let delId=id;
    let delUrl=`${todoUrl}/${delId}`;
    deleteList(delUrl);
    container.removeChild(div);
  });

  upButtonNew.addEventListener('click',(e)=>{
  	let upId=id;
  	let upUrl=`${todoUrl}/${upId}`;
  	
  	div.removeChild(titleNew);
  	div.removeChild(descriptionNew);
  	div.removeChild(delButtonNew);
  	div.removeChild(upButtonNew);
  	updateForm(upUrl,div,title,description);
  });
}

function updateForm(upUrl,div,title,description){
  let upForm=document.createElement('form');
  
  let titleUp=document.createElement('input');
  titleUp.type='text';
  titleUp.value=title;
  	
  let descriptionUp=document.createElement('input');
  descriptionUp.type='text';
  descriptionUp.value=description;
  
  let ButtonUp=document.createElement('input');
  ButtonUp.type='submit';  	
  ButtonUp.value='Save';  	  

  upForm.appendChild(titleUp);
  upForm.appendChild(descriptionUp);
  upForm.appendChild(ButtonUp);
  div.appendChild(upForm);  

  ButtonUp.addEventListener('click',(e)=>{
  	e.preventDefault();
  	let data={
  		"title":titleUp.value,
  		"description":descriptionUp.value,
  		"isComplete":false
  	};
  	div.removeChild(upForm);
  	console.log(data,upUrl);
  	updateList(upUrl,data);
  });
}

httpUtil.get(todoUrl).then(response => {
  response.data.data.forEach((todo) => {
  	todoList(todo.title,todo.description,todo.id);
})
})


function deleteList(delUrl){

  httpUtil.remove(delUrl).then(response => {  
    alert('deleted');    
  })

}

function updateList(upUrl,data){
  
  httpUtil.put(upUrl,data).then(response=>{
  	todoList(response.data.data.title,response.data.data.description,response.data.data.id);
  })

}

createList();