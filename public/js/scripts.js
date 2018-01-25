const randomColorGeneration = () => {
  let letters = '0123456789ABCDEF';
  let hexColor = '#';
  for (let iterator = 0; iterator < 6; iterator++) {
    hexColor += letters[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

const randomizeColors = (number) => {
  const colorsNumber = [1, 2, 3, 4, 5];

  colorsNumber.forEach(number => {
    $(`.color${number}`).hasClass('color') ?
      $(`#color${number}`).css("background-color", randomColorGeneration()) :
      $(`#color${number}`).css("background-color");
  });
};

const toggleLock = event => {
  const { id } = event.target;

  id.includes('color') ?
    $(`#${id}`).attr('id', `lock${id.substr(id.length - 1)}`) :
    $(`#${id}`).attr('id', `color${id.substr(id.length - 1)}`);
};

$(window).load(() => randomizeColors());
$(".random-palette-button").click(randomizeColors);
$(".color").click(event => toggleLock(event));
