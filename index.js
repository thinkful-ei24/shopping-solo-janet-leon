
'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  editState: false,
  filterSearch: " ",
  displayAll: true,

};
//===========================================================================
function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

//===========================================================================
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}

//===========================================================================
function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

//===========================================================================
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.unshift({name: itemName, checked: false});
}


//===========================================================================


function filterBySearch(){
  const newSearch = $('.js-shopping-list-search').val();
  // const newSearchList = {};
  console.log('filter by search ran');
  for(let i=0; i < STORE.items.length; i++){
    let eachListItem =STORE.items[i].name; 
    if (eachListItem === newSearch){
      STORE.filterSearch =newSearch;
      $('.js-shopping-list').find('li').hide();
      $('.js-shopping-list').find('li').find("span:contains('"+newSearch+'\')').closest('li').show();

    } else {
      $('.js-shopping-list').find('li').find("span:contains('"+newSearch+'\')').closest('li').show();
    }

  }  
}
//===========================================================================
function handleSearch() {
 
  $('#js-shopping-list-form').find('button:contains(\'Search\')').on('click',
    function(event) {
      const newSearch = $('.js-shopping-list-search').val();
      event.preventDefault();
      filterBySearch();
      //console.log(newSearch);
      console.log('`handleSEARCH` ran');
     
    }
  );
}
//===========================================================================
function handleNewItemSubmit() {
  $('button:first').click(
    function(event) {
      event.preventDefault();
      console.log('`handleNewItemSubmit` ran');
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      addItemToShoppingList(newItemName);
      renderShoppingList();
//When adding item that matches search word, don't re-render but keep search filter
      if (newItemName === STORE.filterSearch){
        filterBySearch();
      } 
    });
}
//===========================================================================
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
//===========================================================================
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}
//===========================================================================
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(this);
    console.log(itemIndex);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
   
  });
}
//===========================================================================
// function createEdit(){
//   const input = document.createElement('input';
//   input.type = 'text'
// )
// }
//===========================================================================
function handleEdit(){
  $('.js-shopping-list').on('click', '.js-item-edit', function(event) {
    console.log('`handleEdit` ran');
    const itemIndex = getItemIndexFromElement(this);
    console.log(itemIndex);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
 //===========================================================================
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', function(event) {
    console.log('`handleItemDelete` ran');
    const itemIndex = getItemIndexFromElement(this);
    console.log(itemIndex);
    STORE.items.splice(itemIndex,1);
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}

//===========================================================================
function stateOfDisplay(){
  console.log(`State of Display ran`);
  if(STORE.displayAll===false){
    //NEED TO FIND BETTER WAY OF WRITING THIS
    $('.shopping-list').find('li').find('.shopping-item__checked').closest('li').fadeOut('fast');
  } else {
   $('.js-shopping-list').find('li').show();
  }

}
//===========================================================================

function handleHideAllCheckBox (){
  $('#js-checkbox-div').on('click', '#js-checkbox', function(event){
    if($(this).prop('checked')){
      STORE.displayAll = true;
    } else {
      STORE.displayAll = false;
    }
    stateOfDisplay();
  });
}


//===========================================================================



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideAllCheckBox ();
  handleSearch();
  handleEdit();
  
}

//===========================================================================
// when the page loads, call `handleShoppingList`
$(handleShoppingList);



