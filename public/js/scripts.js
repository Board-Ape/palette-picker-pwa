const randomColorGeneration = () => {
  return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
};

$(".random-palette-button").click(() => {
  $(".one").css("background-color", randomColorGeneration());
  $(".two").css("background-color", randomColorGeneration());
  $(".three").css("background-color", randomColorGeneration());
  $(".four").css("background-color", randomColorGeneration());
  $(".five").css("background-color", randomColorGeneration());
});
