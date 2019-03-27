"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sort(list, compareFunction) {
    recQuickSort(list.front(), list.back());
    function recQuickSort(left, right) {
        var [cur, tleft, tright] = partition(left, right);
        if (tleft) {
            recQuickSort(tleft, cur.prevNode);
        }
        if (tright) {
            recQuickSort(cur.nextNode, tright);
        }
    }
    function partition(left, right) {
        var pivot = right, tleft = left, tright = right, temp;
        var node = left;
        while (node !== pivot) {
            temp = node.nextNode;
            if (compareFunction(node.value, pivot.value) > 0) {
                node.deleteCurrent();
                tright.insertAfter(node);
                tright = node;
            }
            else {
                tleft = node;
                break;
            }
            tleft = temp;
            node = temp;
        }
        while (node !== pivot) {
            temp = node.nextNode;
            if (compareFunction(node.value, pivot.value) > 0) {
                node.deleteCurrent();
                tright.insertAfter(node);
                tright = node;
            }
            node = temp;
        }
        return [
            pivot,
            tleft !== pivot ? tleft : null,
            tright !== pivot ? tright : null
        ];
    }
}
exports.default = sort;
