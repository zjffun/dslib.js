import ListNode from "./listnode";
/**
 * Doubly linked list
 */
export default class List {
    private _head;
    private _rear;
    /**
     * Initialize list with the given elements.
     * ```
     * new List(element0, element1[, ...[, elementN]])
     * ```
     * @param args element0, element1, ..., elementN
     */
    constructor(...args: any[]);
    /**
     * Return Iterator object that contains the values for each node in the list.
     */
    [Symbol.iterator](): {
        next(): {
            done: boolean;
            value: any;
        };
    };
    /**
     * The rear node of the list
     */
    get rear(): ListNode;
    /**
     * The head node of the list
     */
    get head(): ListNode;
    /**
     * Create a new List instance from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapFn Map function to call on every element of the array.
     * @param thisArg Value to use as `this` when executing `mapFn`.
     */
    static from(arrayLike: any, mapFn?: Function, thisArg?: any): List;
    /**
     * Creates a new List instance from a variable number of arguments.
     * ```
     * List.of(element0, element1[, ...[, elementN]])
     * ```
     * @param args element0, element1, ..., elementN
     */
    static of(...args: any[]): List;
    /**
     * Determines whether the passed value is an list.
     * @param val The value to be checked.
     */
    static isList(val: any): boolean;
    /**
     * Add one element to the end of the list.
     * @param value element's value
     * @param key (Optinal) element's key
     */
    push(value: any, key?: any): void;
    /**
     * Remove the last element from the list and return that element.
     */
    pop(): ListNode;
    /**
     * Remove the first element from the list and return that element.
     */
    shift(): ListNode;
    /**
     * Add one element to the front of the List.
     * @param value element's value
     * @param key (Optinal) element's key
     */
    unshift(value: any, key?: any): void;
    /**
     * Execute a reducer function (that you provide) on each member of the list resulting in a single output value.
     * @param callback reducer functionFunction to execute on each element in the list, taking four arguments:
     *   accumulator
     *     The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param initialValue Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the array will be used. Calling reduce() on an empty array without an initial value is an error.
     */
    reduce(callback: any, initialValue?: any): any;
    /**
     * Execute a provided function once for each list element.
     * @param callback Function to execute on each element, taking three arguments:
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach(callback: any, thisArg?: any): void;
    /**
     * Merge two or more lists.
     * @param {...List} list
     */
    concat(): this;
    /**
     * Calling a provided function on every element in the calling list.
     * @param callback Function to execute on each element, taking three arguments:
     *   currentValue
     *     The current element's value being processed in the list.
     *   currntKey Optional
     *     The current element's key being processed in the list.
     *   currentNode(Optional)
     *     The current node being processed in the list.
     * @param thisArg Value to use as this when executing callback.
     */
    map(callback: any, thisArg: any): this;
    /**
     * Sort the elements of an list.
     * @param compareFunction Specifies a function that defines the sort order.
     *  firstEl
     *    The first element for comparison.
     *  secondEl
     *    The second element for comparison.
     */
    sort(compareFunction: any): this;
    /**
     * Returns the number of elements in the list.
     * like [list::size - C++ Reference](http://www.cplusplus.com/reference/list/list/size/)
     */
    size(): number;
    /**
     * Returns a reference to the first element in the list.
     * like [list::front - C++ Reference](http://www.cplusplus.com/reference/list/list/front/)
     */
    front(): ListNode;
    /**
     * Returns a reference to the last element in the list.
     * [list::back - C++ Reference](http://www.cplusplus.com/reference/list/list/back/)
     */
    back(): ListNode;
    /**
     * Returns the element at the specified position in this list.
     * like [List get(int) - (Java Platform SE 7 )](https://docs.oracle.com/javase/7/docs/api/java/util/List.html#get(int))
     * @param index index of the element to return
     */
    get(index: number): ListNode;
}
