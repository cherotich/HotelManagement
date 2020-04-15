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


})

