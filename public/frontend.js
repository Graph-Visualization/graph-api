const inputForm = document.querySelector('#vertices');
const vertices = document.querySelector('#verval');
const addButton = document.querySelector('#add');
const submitButton = document.querySelector('#submit');
const selectOption = document.querySelector('#algorithm');

class GraphValues {
  constructor() {
    this.src = null;
    this.dest = null;
    this.weight = null;
  }
}

inputForm.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    console.log('Enter!');
  }
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();

  const numVer = vertices.value;
  console.log(numVer);

  var input_box = document.getElementById('input-param');
  input_box.className = input_box.className.split('invisible')[0];
  var submitContainer = document.querySelector('#submit');

  while (submitContainer.hasChildNodes()) {
    submitContainer.removeChild(submitContainer.lastChild);
  }

  var submit = document.createElement('button');
  submit.textContent = 'Submit';
  submit.className += 'btn btn-success btn-lg ml-2 mr-2 mb-3 disabled';
  // submit.addEventListener('click', ()=>{
  //     inputForm.submit()
  // })
  submitContainer.appendChild(submit);

  var container = document.getElementById('containerJ');
  var adjform = document.getElementById('#adjlist');

  // Clear previous contents of the container
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  const addEdge = document.createElement('button');
  addEdge.textContent = 'Add Edge';
  addEdge.name = 'edge_button';
  addEdge.id = 'add-element';
  addEdge.className = 'btn btn-warning btn-block mt-1 mb-3';
  container.appendChild(addEdge);
  counter = 0;
  addEdge.addEventListener('click', () => {
    const totalVer = (numVer * (numVer - 1)) / 2;
    if (counter < totalVer) {
      console.log('Clicked');
      var divInput = document.createElement('div');
      divInput.id = 'graph-value';
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Source Vertices';
      input.className = 'bubble form-control';
      var input3 = document.createElement('input');
      var input2 = document.createElement('input');

      input2.type = 'text';
      input2.placeholder = 'Destination Vertices';
      input2.className = 'bubble form-control';

      input3.type = 'text';
      input3.placeholder = 'Edge Weights';
      input3.className = 'bubble form-control';
      divInput.appendChild(input);
      divInput.appendChild(input2);
      divInput.appendChild(input3);
      divInput.className = 'd-flex justify-content-around flex-row';

      container.appendChild(divInput);
      // Append a line break
      container.appendChild(document.createElement('br'));
      counter += 1;
      window.scrollBy(0, 100);
    } else {
      submit.className = submit.className.split('disabled')[0];
    }
  });
});

const createJSON = (graphValues, algo) => {
  // Format of JSON
  // algo :
  // graph : [src:, dest:, weight:]

  let values = [];
  for (let i in graphValues) {
    let nodes = {
      src: graphValues[i].src,
      dest: graphValues[i].dest,
      weight: graphValues[i].weight,
    };
    values.push(nodes);
  }
  // console.log(values)
  let jsonObj = {
    algo,
    values,
  };

  console.log(JSON.stringify(jsonObj));

  return JSON.stringify(jsonObj);
};

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e);
  if (e.target.classList[4] !== 'disabled') {
    let result = [];

    let divValues = document.querySelectorAll('#graph-value');
    divValues.forEach((val, index) => {
      let gobj = new GraphValues();
      gobj.src = val.childNodes[0].value;
      gobj.dest = val.childNodes[1].value;
      gobj.weight = val.childNodes[2].value;

      result.push(gobj);
    });
    console.log(result[0].src);
    const algo = selectOption.options[selectOption.selectedIndex].value;
    console.log(algo);
    console.log(createJSON(result, algo));

    fetch(`https://graph-apiv1.herokuapp.com/api`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: createJSON(result, algo),
    }).then((data) => {
      console.log('SUCCESS!');
      data.json().then((dat) => {
        data = JSON.parse(dat);
        console.log(data);
        var showVal = document.getElementById('showval');
        showVal.className = showVal.className.split('visible')[0];
        var res = document.getElementById('plaintext');
        res.className += ' text-monospace';
        res.textContent = '[' + data.result + ']';

        // const visualise = document.createElement('button')

        // visualise.textContent = "Visualise!"
        // visualise.name = "visualise_button"
        // visualise.id = "visualise"
        // visualise.className = "btn btn-success btn-block p-2 mb-3"
        // const visual = document.getElementById('visual')
        // while (visual.hasChildNodes()) {
        //     visual.removeChild(visual.lastChild);
        // }
        // // visual.appendChild(visualise)

        // const getJSON = document.createElement('button')

        // getJSON.textContent = "getJSON!"
        // getJSON.name = "getJSON_button"
        // getJSON.id = "getJSON"
        // getJSON.className = "btn btn-success btn-block p-2 mb-3"

        // // visual.appendChild(getJSON)
        // visualise.addEventListener('click', (e)=>{
        //     window.location.href = '/visual'
        // })
      });
    });
  }
});

// Code for generating the animations for the graph
// Code for adding edges in a particular order

// Code for already generated graph and update its color
