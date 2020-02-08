describe('index-clase.js', function () {

  beforeEach(function () {
   /* const ul = document.createElement('ul');
    ul.id = 'list';
    const input = document.createElement('input');
    input.id = 'input';
    const addButton = document.createElement('button');
    addButton.id = 'addButton';

    document.append(ul)
    document.append(input)
    document.appendC(addButton)
    */
  })

  describe("pintar", function () {

    //TEST empty ul
    it("should remove all li before paint", function () {

      //Condicion inicial
      const dummyElement = document.createElement('ul');
      dummyElement.innerHTML = `
      <ul class="todo-list" id="list">
          <li>hola, un li de ejemplo</li>
      </ul>`;

      const tasks = [];
      pintar(dummyElement, tasks);

      //Condición final
      expect(dummyElement.innerHTML).toEqual('')
    });

    //TEST paint arr elems
    it("should paint all data in array", function () {

      //Condicion inicial
      const dummyElement = document.createElement('ul');
      const tasks = [{
        id: 0,
        text: 'Hola',
        end: new Date(),
        visible: true
      }];

      pintar(dummyElement, tasks);

      //Condición final
      expect(dummyElement.innerHTML).not.toEqual('');
      expect(dummyElement.innerHTML).not.toEqual(`<li class="task">Hola</li>`);
    });


  })

  describe('addToDo', function () {

    //TEST input is added
    it("should add an item", function () {

      //Condicion inicial
      const tasks = [];
      const inputElement = document.createElement('input');
      inputElement.value =  'Hola';
      const ulElement = document.createElement('ul');

      addToDo(tasks, inputElement, ulElement);

      //Condición final
      expect(tasks.length).toEqual(1);
    });

  })

})