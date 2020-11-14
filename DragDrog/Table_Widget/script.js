let player = document.getElementById("player-list");
new Sortable(player,{
  handle:'.handle',
  animation:150
});


let layer = document.getElementById("OrderField");
new Sortable(layer,{
  handle: '.row-field',
  animation: 150,
  easing: "cubic-bezier( 0.895, 0.03, 0.685, 0.22)",
  /*ghostClass: "ramos",*/
  chosenClass: "ramos"
});