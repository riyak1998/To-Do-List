$(document).ready(function(){
  var todolist=[];
  var res=$('#res');
  var inp=$('#inp');

  function sendPost(){
    var task={};
    task.value=inp.val();
    task.done=false;
    todolist.push(task);
    $.post({
      'url':'/add',
      'data':{'data':task},
      success:function(ress){
          display();
      }
    });
    inp.val("");
  }
  display();
  function display(){
    $.get({
      'url':'/display',
      success:function(data){
        if(data){
          res.empty();
          var ress=JSON.parse(data);
          res.append(`<div class="list"><table>`);
          for(var k=0;k<ress.length;k++){
            res.append(`<tr id="${k}"><td><button class="done" title="Mark as done" onclick="update('${k}')"> <i class="fa fa-check fa-lg"> </i> </button> <td><button class="rem" title="Remove" onclick="dell('${k}')" ><i class="fa fa-trash fa-lg"></i></button></td></td><td>&nbsp;${k+1}. &nbsp; ${ress[k].value}  </td></tr>`);
            if(ress[k].done==true){
              $(`#${k}`).css({'text-decoration':'line-through'});
            }
          }
          res.append(`</table></div>`);
        }
      }
    });
  }
  function dell(id){
    console.log(id);
    $.post({
      'url':'/delete',
      'data':{'data':id},
      success:function(data){
          display();
      }
    });
  }
 function update(id){
   console.log(id);
   $.post({
     'url':'/update',
     'data':{'data':id},
     success:function(data){
         display();
         console.log("update");
     }
   });
 }

  $('#btn').click(function(){
    sendPost();
    console.log('btn');
  });
  window.sendPost=sendPost;
  window.display=display;
  window.dell=dell;
  window.update=update;
});
