//offline data 
db.enablePersistence()
.catch(err => {
    if(err.code == 'failed-precondition'){
    console.log('persistence failed');

}
else if(err.code=='unimplemented'){
    console.log('persistence not available');   
}

});

//realtime database
db.collection('Recipes').onSnapshot((snapshot)=>
{
// console.log(snapshot.docChanges());
snapshot.docChanges().forEach(change => {
    //console.log(change,change.doc.data(),change.doc.id);
    if(change.type==='added')
    {
renderRecipe(change.doc.data(),change.doc.id);
    }

    if(change.type==='removed')
    {

    }
    
});

});


//add new recipe
const form = document.querySelector('form');
form.addEventListener('submit',evt =>
{
    //gets doc to be saved in db
    const recipe = {
title: form.title.value,
ingredients: form.ingredients.value
    };

    //insert data
    db.collection('Recipes').add(recipe)
    .catch(err => console.log(err));
    form.title.value='';
    form.ingredients.value='';
});

//delete recipe
// const recipeContainer = document.querySelector('.recipes');
// recipeContainer.addEventListener('click', evt =>
// {
    
//     console.log(evt);
  
//     if(evt.target.tagName==='I')
//     {
//         const id = evt.target.getAttribute('data-id');
//         console.log(id);
//      //  db.collection('Recipes').doc(id).delete().then( function() {removeRecipe(id)});
//                 db.collection('Recipes').doc(id).delete();

//     }
// });
// remove a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
    console.log(evt);
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    
    console.log(id);
    db.collection('recipes').doc(id).delete();
  }
})