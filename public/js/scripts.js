const randomColorGeneration = () => {
  return "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
};

const randomizeColors = () => {
  $(".color1").css("background-color", randomColorGeneration());
  $(".color2").css("background-color", randomColorGeneration());
  $(".color3").css("background-color", randomColorGeneration());
  $(".color4").css("background-color", randomColorGeneration());
  $(".color5").css("background-color", randomColorGeneration());
};

const toggleLock = event => {
  const { id } = event.target;
  console.log(id.substr(id.length - 1));

  if (id.includes('color')) {
    console.log('lock');
    $(`#${id}`).attr('id', `lock${id.substr(id.length - 1)}`);
  } else {
    console.log('unlock');
    $(`#${id}`).attr('id', `color${id.substr(id.length - 1)}`);
  }
};

$(window).load(() => randomizeColors());
$(".random-palette-button").click(randomizeColors);
$(".color").click(event => toggleLock(event));
