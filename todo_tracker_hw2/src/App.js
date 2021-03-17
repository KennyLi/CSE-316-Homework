// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction';
import EditItem_Transaction from './transactions/EditItem_Transaction';
import SwapUp_Transaction from './transactions/SwapUp_Transaction';
import SwapDown_Transaction from './transactions/SwapDown_Transaction';
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction';

{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();
    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("recentLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    this.tps.clearAllTransactions();
    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];
    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);

  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  deleteList = () => {
    let newToDoLists = this.state.toDoLists.filter(toDoList => 
      toDoList.id !== this.state.currentList.id);
    this.tps.clearAllTransactions();      
    this.setState({
      toDoLists: newToDoLists,
      currentList: {items: []}
    }, this.afterToDoListsChangeComplete);
  }

  closeList = () => {
    this.tps.clearAllTransactions();    
    this.setState({
      currentList: {items: []}
    })
  }

  addNewListItem = () => {
    let oldValue = [this.state.toDoLists, this.state.currentList, this.state.nextListItemId]      
    let newToDoListItemsList = {...this.state.currentList, items: [...this.state.currentList.items, this.makeNewToDoListItem()]};
    let newToDoLists = this.state.toDoLists.map(toDoList => 
      toDoList.id === newToDoListItemsList.id ? newToDoListItemsList : toDoList);
    this.setState({
      toDoLists: newToDoLists,
      currentList: newToDoListItemsList,
      nextListItemId: this.state.nextListItemId+1
    }, this.afterToDoListsChangeComplete);
    return oldValue
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  undoAddItemRender = (list) => {
    this.setState({
      toDoLists: list[0],
      currentList: list[1],
      nextListItemId: list[2]
    })
  }

  addListItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this.addNewListItem, this.undoAddItemRender)
    this.tps.addTransaction(transaction);
  }

  undoRender = (list) => {
    this.setState({
      toDoLists: list[0],
      currentList: list[1]
    })
  }

  editItem = (newItem) => { 
    let oldValue = [this.state.toDoLists, this.state.currentList];
    let newCurrentList = {...this.state.currentList, items:this.state.currentList.items.map(oldItem =>
      oldItem.id === newItem.id ? newItem : oldItem)};
    let newToDoList = this.state.toDoLists.map(toDoList =>
      toDoList.id === newCurrentList.id ? newCurrentList : toDoList);
    this.setState({
      toDoLists: newToDoList,
      currentList: newCurrentList
    })
    return oldValue;
  }

  editItemTransaction = (newItem) => {
    let transaction = new EditItem_Transaction(this.editItem, newItem, this.undoRender);
    this.tps.addTransaction(transaction);
  }

  swapUp = (item) => {
    let oldValue = [this.state.toDoLists, this.state.currentList]; 
    let index = this.state.currentList.items.indexOf(item) - 1;
    let curr = this.state.currentList.items.filter(toDoItem => 
      toDoItem.id !== item.id);
    curr.splice(index, 0, item)
    let newCurrentList = {...this.state.currentList, items: curr};
    let newToDoList = this.state.toDoLists.map(toDoList =>
      toDoList.id === newCurrentList.id ? newCurrentList : toDoList);
    this.setState({
      toDoLists: newToDoList,
      currentList: newCurrentList
    })
    return oldValue;
  }

  swapUpTransaction = (item) => {
    let transaction = new SwapUp_Transaction(this.swapUp, item, this.undoRender);
    this.tps.addTransaction(transaction);
  }

  swapDown = (item) => {      
    let oldValue = [this.state.toDoLists, this.state.currentList]; 
    let index = this.state.currentList.items.indexOf(item) + 1;
    let curr = this.state.currentList.items.filter(toDoItem => 
      toDoItem.id !== item.id);
    curr.splice(index, 0, item)
    let newCurrentList = {...this.state.currentList, items: curr};
    let newToDoList = this.state.toDoLists.map(toDoList =>
      toDoList.id === newCurrentList.id ? newCurrentList : toDoList);
    this.setState({
      toDoLists: newToDoList,
      currentList: newCurrentList
    })
    return oldValue;
  }

  swapDownTransaction = (item) => {
    let transaction = new SwapDown_Transaction(this.swapDown, item, this.undoRender);
    this.tps.addTransaction(transaction);
  }

  deleteItem = (item) => {
    let oldValue = [this.state.toDoLists, this.state.currentList];
    let curr = this.state.currentList.items.filter(toDoItem => 
      toDoItem.id !== item.id);
    let newCurrentList = {...this.state.currentList, items: curr};
    let newToDoList = this.state.toDoLists.map(toDoList =>
      toDoList.id === newCurrentList.id ? newCurrentList : toDoList);
    this.setState({
      toDoLists: newToDoList,
      currentList: newCurrentList
    })
    return oldValue;
  }

  deleteItemTransaction = (item) => {
    let transaction = new DeleteItem_Transaction(this.deleteItem, item, this.undoRender);
    this.tps.addTransaction(transaction);
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }

  redo = () => {
    if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();  
    }
  }

  undo = () => {
    if (this.tps.hasTransactionToUndo()) {
        this.tps.undoTransaction();
    }
  }

  render() {
    let items = this.state.currentList.items;
    console.log(items[0])
    console.log(items[items.length - 1])
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          currentListId = {this.state.currentList.id}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
        />
        <Workspace
          undoable = {this.tps.hasTransactionToUndo()}
          redoable = {this.tps.hasTransactionToRedo()}
          currentListId = {this.state.currentList.id}
          toDoListItems = {items}
          firstItem = {items[0]}
          lastItem = {items[items.length - 1]}
          addNewListItemCallback = {this.addListItemTransaction}
          deleteListCallback = {this.deleteList}
          closeListCallback = {this.closeList}
          editItemCallback = {this.editItemTransaction}
          swapUpListCallback = {this.swapUpTransaction}
          swapDownListCallback = {this.swapDownTransaction}
          deleteItemCallback = {this.deleteItemTransaction}
          undoCallback = {this.undo}
          redoCallback = {this.redo}/>
      </div>
    );
  }
}

export default App;