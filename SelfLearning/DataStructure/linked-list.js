class Node {
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    add(element){
        const node = new Node(element);
        let current;
        if (this.head == null){
            this.head = node;
        } else {
            current = this.head;
            //scan linkedlist
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    insertAt(element, index){
        if(index < 0 || index > this.size){
            return console.log("Please enter a valid index");
        } else {
            //create a new node
            const node = new Node(element);
            let current, previous;
            current = this.head;
            
            if(index == 0){
                node.next = current.next;
                this.head = node;
            } else {
                let it = 0;
                while(it < index){
                    it++;
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
        }
        this.size++;
    }

    removeFrom(index){
        if(index < 0 || index >= this.size){
            return console.log("Please enter a valid index");
        } else {
            let current, previous, it = 0;
            current = this.head;
            previous = current;
            if(index === 0){
                this.head = current.next;
            } else {
                while(it < index){
                    it++;
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.size--;
            return current.element;
        }
    }

    removeElement(element){
        let current = this.head;
        let previous = null;

        //iterate over the list
        while(current != null){
            if(current.element === element){
                if(previous == null){
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current.element;
            }
            previous = current;
            current = current.next;
        }
        return -1;
    }

    indexOf(element){
        let count = 0;
        let current = this.head;

        while(current != null){
            if(current.element === element){
                return count;
            }
            count++;
            current = current.next;
        }

        return -1;
    }

    isEmpty(){
        return this.size === 0;
    }

    size_of_list() {
        console.log(this.size);
    }

    printList(){
        let current = this.head;
        let result = "";
        while(current){
            result += current.element + " ";
            current = current.next;
        }
        console.log(result);
    }

}

// creating an object for the
// Linkedlist class
var ll = new LinkedList();

// testing isEmpty on an empty list
// returns true
console.log(ll.isEmpty());

// adding element to the list
ll.add(10);

// prints 10
ll.printList();

// returns 1
console.log(ll.size_of_list());

// adding more elements to the list
ll.add(20);
ll.add(30);
ll.add(40);
ll.add(50);

// returns 10 20 30 40 50
ll.printList();

// prints 50 from the list
console.log("is element removed ?" + ll.removeElement(50));

// prints 10 20 30 40
ll.printList();

// returns 3
console.log("Index of 40 " + ll.indexOf(40));

// insert 60 at second position
// ll contains 10 20 60 30 40
ll.insertAt(60, 2);

ll.printList();

// returns false
console.log("is List Empty ? " + ll.isEmpty());

// remove 3rd element from the list
console.log(ll.removeFrom(3));

// prints 10 20 60 40
ll.printList();
