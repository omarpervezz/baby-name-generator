window.addEventListener('DOMContentLoaded', function () {

  // Helper function to map element IDs to their respective DOM elements
  function selectId(ids) {
    const setId = new Map();

    ids.forEach(id => {
      setId.set(id, document.getElementById(id));
    });

    return setId;
  }

  // Array of element IDs for boxes
  const idElement = ['box-1', 'box-2', 'box-3'];

  // Map containing the selected DOM elements
  const elementS = selectId(idElement);

  // Function to handle box click events
  function handleBoxClick(clickedBoxId) {
    idElement.forEach(id => {
      const currentElement = elementS.get(id);

      if (id !== clickedBoxId && currentElement.classList.contains('active')) {
        // Deactivate other boxes
        currentElement.classList.remove('active');
        currentElement.querySelector('.selected_value').classList.remove('show');
      }
    });

    // Activate the clicked box
    const clickedBox = elementS.get(clickedBoxId);
    clickedBox.classList.add('active');
    clickedBox.querySelector('input').click();
    clickedBox.querySelector('.selected_value').classList.add('show');
  }

  // Event listeners for box clicks
  elementS.get('box-1').addEventListener('click', () => handleBoxClick('box-1'));
  elementS.get('box-2').addEventListener('click', () => handleBoxClick('box-2'));
  elementS.get('box-3').addEventListener('click', () => handleBoxClick('box-3'));

  // Define a named function for the event handler
  function handleClick() {
    const inserElement = document.getElementById('generated-list');
    const loader = document.getElementById('loader');
    const netrual = document.getElementById('netrual');
    const babyBoy = document.getElementById('baby-boy');
    const babyGirl = document.getElementById('baby-girl');

    // Determine the selected gender
    let selectedGender = null;

    if (netrual.checked) selectedGender = netrual.value;
    else if (babyBoy.checked) selectedGender = babyBoy.value;
    else if (babyGirl.checked) selectedGender = babyGirl.value;

    // Update data based on the selected gender
    if (selectedGender) {
      upDateData(selectedGender, inserElement, loader);
    } else {
      alert('Select Gender type');
    }
  }

  // DOM elements for generating names
  const generateButton = document.getElementById('generator');

  // Add the event listener
  generateButton.addEventListener('click', handleClick);

  // Function to update data based on gender
  function upDateData(gender, element, loader) {
    element.innerHTML = '';
    loader.classList.add('show');
    getData(`https://api.api-ninjas.com/v1/babynames?gender=${gender}`).then((data) => {
      if (data) {
        element.innerHTML += `<span style="cursor:pointer;" id="textToCopy" onclick="copyToClipboard()" title="click to copy the name">${data[0]}</span><br>`;
        loader.classList.remove('show');
      }
    });
  }

  // Function to fetch data from the API
  async function getData(url = "") {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': '563NlM9jQUXbIXHF+WTHwA==3eYSTrgXXc5Jfx5g'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }

  // Function to reset radio button states
  function resetRadioButtons() {
    const netrual = document.getElementById('netrual');
    const babyBoy = document.getElementById('baby-boy');
    const babyGirl = document.getElementById('baby-girl');

    // Set the 'checked' property to false for each radio button
    netrual.checked = false;
    babyBoy.checked = false;
    babyGirl.checked = false;
  }

  // Call the function to reset radio button states when the page loads
  resetRadioButtons();

});

function copyToClipboard() {
  // Select the text to be copied
  var textToCopy = document.getElementById('textToCopy');

  // Create a range object
  var range = document.createRange();
  range.selectNode(textToCopy);

  // Clear any existing selection and select the text
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  // Execute the copy command
  document.execCommand('copy');

  // Clear the selection
  window.getSelection().removeAllRanges();

  // Optional: Notify the user that the text has been copied
  alert('Text copied to clipboard: ' + textToCopy.textContent);
}
