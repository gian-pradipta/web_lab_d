function removeBox(index) {
    const boxes = document.querySelectorAll('.box');
    if (boxes[index]) {
        const boxToRemove = boxes[index];
        // boxToRemove.style.transform = 'scale(0)'; // Shrink margin
        const width = boxToRemove.offsetwidth;
        boxToRemove.style.margin = `-${width}px;` // Shrink margin
        
        boxToRemove.addEventListener('transitionend', () => {
            boxToRemove.remove();
        }, { once: true });
    }
}

const QuestionListHelper = {
    removeBox,
}

export default QuestionListHelper;

