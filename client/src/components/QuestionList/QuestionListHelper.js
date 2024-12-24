function removeBox(index) {
    const boxes = document.querySelectorAll('.box');
    if (boxes[index]) {
        const boxToRemove = boxes[index];
        boxToRemove.style.transform = 'scale(0)'; // Shrink margin
    }
}

const QuestionListHelper = {
    removeBox,
}

export default QuestionListHelper;

