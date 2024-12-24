function removeBox(index) {
    const boxes = document.querySelectorAll('.box');
    if (boxes[index]) {
        const boxToRemove = boxes[index];
        boxToRemove.style.transform = 'scale(0)'; // Shrink margin
        
        boxToRemove.addEventListener('transitionend', () => {
            boxToRemove.style.transform = 'scale(1)'; // Shrink margin
        }, { once: true });
    }
}

function insertBox() {
    const index = 0;
    const boxes = document.querySelectorAll('.box');
    if (boxes[index]) {
        const boxToInsert = boxes[index];
        boxToInsert.style.transform = 'scale(0)'; // Shrink margin
        boxToInsert.addEventListener('transitionend', () => {
            boxToInsert.style.transform = 'scale(1)'; // Shrink margin
        }, { once: true });
    }
}

const QuestionListHelper = {
    removeBox,
    insertBox
}

export default QuestionListHelper;

